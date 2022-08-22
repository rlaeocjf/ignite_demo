import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle, ImageBackground, Image } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { load, saveString } from "../../utils/storage"
import moment from "moment"
import BackgroundTimer from "react-native-background-timer"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { Recording } from "expo-av/build/Audio"
import { color } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const TIME_BOX: ViewStyle = {
  flex: 7,
  justifyContent: "flex-end",
  alignItems: "center",
}
const TIME_TEXT: TextStyle = {
  color: "#8793a5",
  fontSize: 70,
  marginBottom: 25,
}
const START_SESSION_BOX: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "center",
}
const START_SESSION_TEXT: TextStyle = {
  color: "#8793a5",
  fontSize: 16,
  fontWeight: "500",
  marginTop: 30,
}
const ALARM_BOX: ViewStyle = { flex: 2, justifyContent: "flex-start", alignItems: "center" }
const ALARM_TEXT: TextStyle = { color: "#8793a5", fontSize: 23, fontWeight: "500", marginTop: 13 }
const STOP_SESSION_BOX: ViewStyle = { flex: 3, alignItems: "center" }
const STOP_SESSION_TEXT: TextStyle = {
  color: "#8793a5",
  fontSize: 24,
  paddingTop: 10,
  marginLeft: -10,
}
const BG: ViewStyle = {
  width: "100%",
  height: "100%",
}
const ALARM_ICON = {
  marginTop: 5,
  marginBottom: 60,
}

export const SleepScreen: FC<StackScreenProps<NavigatorParamList, "sleep">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const [timer, setTimer] = useState<number>()
    const [alarm, setAlarm] = useState<string>()
    const [reachTime, setReachTime] = useState<boolean>(false)
    const [delay, setDelay] = useState<string>()
    const [recording, setRecording] = useState<Recording>()

    const startRecording = async () => {
      try {
        console.log("Requesting permissions..")
        const permission = await Audio.requestPermissionsAsync()
        console.log(permission)
        if (permission.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            // 백그라운드 모드에서 녹음 할때..
            staysActiveInBackground: true,
          })
          console.log("Starting recording..")
          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY,
          )
          setRecording(recording)
          console.log("Recording started")
        } else {
          console.log("please grant permission to app to access microphone")
        }
      } catch (err) {
        console.log(err)
      }
    }

    const stopRecording = async () => {
      console.log("Stopping recording..")
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      console.log("Recording stopped and stored at", uri)
      const { status } = await recording.createNewLoadedSoundAsync()
      if (status.isLoaded) {
        console.log(recording.getURI())
        saveString(`recording_${new Date().getTime()}`, recording.getURI())
      }
    }

    useEffect(() => {
      setTimeout(() => {
        startRecording()
      }, 1000)
      load("alarm").then((data) => {
        if (data && data.time) {
          setAlarm(data.time)
          const currTime = moment(new Date())
          const savedTime = moment(data.time)
          const diff = moment.duration(savedTime.diff(currTime)).asMilliseconds()
          if (diff > 0) {
            const timeout = BackgroundTimer.setTimeout(() => {
              setReachTime(true)
              playSound()
            }, diff)
            setTimer(timeout)
          } else {
            clearTime()
          }
        }
      })
    }, [])

    const clearTime = () => {
      BackgroundTimer.clearTimeout(timer)
    }

    const playSound = async () => {
      console.log("Loading Sound")
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      })
      const { sound, status } = await Audio.Sound.createAsync(
        require("../../../assets/ringtones/walk_in_the_forest.mp3"),
      )
      if (status.isLoaded) {
        console.log(status.durationMillis)
        console.log("load media..")
        sound.setIsLoopingAsync(true)
        await sound.playAsync()
      }
    }

    const onRenderLeftActions = () => {
      return <View style={{ width: "100%" }}></View>
    }
    return (
      <View testID="SleepScreen" style={FULL}>
        {reachTime ? (
          <View style={FULL}>
            <GradientBackground colors={["#81a1c9", "#426b9c"]} />
            <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
              <View style={{ flex: 5, justifyContent: "flex-end", alignItems: "center" }}>
                <Image
                  style={{ width: "70%", height: "80%", resizeMode: "contain" }}
                  source={require("../../../assets/images/sun-color-icon.png")}
                />
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <GestureHandlerRootView>
                  <Swipeable
                    renderLeftActions={onRenderLeftActions}
                    leftThreshold={10}
                    rightThreshold={15}
                    onEnded={() => {
                      navigation.goBack()
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <MaterialCommunityIcons name="menu-right" size={50} color="#b2c3d8" />
                      <Text style={STOP_SESSION_TEXT} text="옆으로 밀어 세션 중지" />
                    </View>
                  </Swipeable>
                </GestureHandlerRootView>
              </View>
            </Screen>
          </View>
        ) : (
          <ImageBackground source={require("../../../assets/images/bg_sleep.gif")} style={BG}>
            <View style={TIME_BOX}>
              <Text style={TIME_TEXT} text={moment(new Date()).format("HH:mm")} />
            </View>
            <View style={START_SESSION_BOX}>
              {delay && (
                <Text style={START_SESSION_TEXT} text={`코골이 감지가 ${delay} 후 시작됩니다`} />
              )}
            </View>
            <View style={ALARM_BOX}>
              {alarm && (
                <>
                  <Text style={ALARM_TEXT} text={moment(alarm).format("LT")} />
                  <Ionicons name="alarm-outline" size={40} color="#8793a5" style={ALARM_ICON} />
                </>
              )}
            </View>
            <View style={STOP_SESSION_BOX}>
              <GestureHandlerRootView>
                <Swipeable
                  renderLeftActions={onRenderLeftActions}
                  leftThreshold={10}
                  rightThreshold={15}
                  onEnded={() => {
                    stopRecording()
                    navigation.goBack()
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name="menu-right" size={50} color="#8793a5" />
                    <Text style={STOP_SESSION_TEXT} text="옆으로 밀어 세션 중지" />
                  </View>
                </Swipeable>
              </GestureHandlerRootView>
            </View>
          </ImageBackground>
        )}
      </View>
    )
  },
)
