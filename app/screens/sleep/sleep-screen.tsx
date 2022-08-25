import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle, ImageBackground, Image } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, GradientBackground, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { load, saveString } from "../../utils/storage"
import moment from "moment"
import BackgroundTimer from "react-native-background-timer"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { Recording, Sound } from "expo-av/build/Audio"
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
const CURR_TIME: TextStyle = { color: "#8793a5", fontSize: 23, fontWeight: "500", marginTop: 13 }
const CURR_TIME_IN_ALARM: TextStyle = {
  color: "#d1693d",
  fontSize: 50,
  paddingBottom: 110,
}
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
const IMAGE_CONTAINER = { flex: 5, justifyContent: "flex-end", alignItems: "center" }
const IMAGE_SUNRISE = {
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "70%",
}
const SNOOZE_CONTAINER = { flex: 2, justifyContent: "center", alignItems: "center" }
const BTN_SNOOZE = {
  backgroundColor: "#436e9d",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#becedf",
  borderRadius: 20,
  paddingVertical: 14,
}
const TEXT_SNOOZE = {
  fontSize: 17,
}
const BTN_SNOOZE_CONTAINER = {
  flex: 1,
  width: "40%",
  justifyContent: "center",
}

export const SleepScreen: FC<StackScreenProps<NavigatorParamList, "sleep">> = observer(
  ({ navigation }) => {
    console.log("sleep screen")
    const [timer, setTimer] = useState<number>()
    const [currTime, setCurrTime] = useState<Date>()
    const [alarm, setAlarm] = useState<string>()
    const [reachTime, setReachTime] = useState<boolean>(false)
    const [delay, setDelay] = useState<string>()
    const [recording, setRecording] = useState<Recording>()
    const [playback, setPlayback] = useState<Sound>()

    const startRecording = async () => {
      try {
        // console.log("Requesting permissions..")
        const permission = await Audio.requestPermissionsAsync()
        // console.log(permission)
        if (permission.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            // 백그라운드 모드에서 녹음 할때..
            staysActiveInBackground: true,
          })
          // console.log("Starting recording..")
          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY,
          )
          setRecording(recording)
          // console.log("Recording started")
        } else {
          // console.log("please grant permission to app to access microphone")
        }
      } catch (err) {
        console.log(err)
      }
    }

    const stopRecording = async () => {
      if (!recording) return
      // console.log("Stopping recording..")
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      console.log("Recording stopped and stored at", uri)
      const { status } = await recording.createNewLoadedSoundAsync()
      if (status.isLoaded) {
        // console.log(recording.getURI())
        saveString(`recording_${new Date().getTime()}`, recording.getURI())
      }
    }

    useEffect(() => {
      // startRecording()

      const liveTime = setInterval(() => {
        //setCurrTime(new Date())
      }, 1000)

      let delayRecord = 0
      load("delaysleep")
        .then((data) => {
          setDelay(data)
          delayRecord = BackgroundTimer.setTimeout(() => {
            startRecording()
          }, data * 60 * 1000)
        })
        .catch((err) => {
          console.log(err)
          startRecording()
        })
      let timeout: number
      load("alarm").then((data) => {
        if (data && data.time) {
          setAlarm(data.time)
          const currTime = moment(new Date())
          const savedTime = moment(data.time).startOf("minutes")
          let diff = moment.duration(savedTime.diff(currTime)).asMilliseconds()
          if (diff < 0) {
            savedTime.add(1, "days")
          }
          diff = moment.duration(savedTime.diff(currTime)).asMilliseconds()
          timeout = BackgroundTimer.setTimeout(() => {
            setReachTime(true)
            playSound()
          }, diff)
          setTimer(timeout)
        }
      })
      return () => {
        // 수면 지연 시간 클리어
        clearTime(delayRecord)
        // 알람시간 클리어
        clearTime(timeout)
        // 현재 시간 view 클리어
        clearIntervaTime(liveTime)
      }
    }, [])

    const clearTime = (timer: number) => {
      BackgroundTimer.clearTimeout(timer)
    }

    const clearIntervaTime = (interval: NodeJS.Timer) => {
      clearInterval(interval)
    }

    const playSound = async () => {
      console.log("Loading Sound")
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      })
      const { sound, status } = await Audio.Sound.createAsync(
        require("../../../assets/ringtones/walk_in_the_forest.mp3"),
      )
      if (status.isLoaded) {
        setPlayback(sound)
        sound.setIsLoopingAsync(true)
        sound.setVolumeAsync(1.0)
        await sound.playAsync()
      }
    }

    const stopSound = async () => {
      if (playback && playback.stopAsync) {
        await playback.stopAsync()
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
              <View style={IMAGE_CONTAINER}>
                <ImageBackground
                  source={require("../../../assets/images/sun-color-icon.png")}
                  resizeMode="contain"
                  style={IMAGE_SUNRISE}
                >
                  <Text style={CURR_TIME_IN_ALARM} text={moment(alarm).format("HH:mm")} />
                </ImageBackground>
              </View>
              <View style={SNOOZE_CONTAINER}>
                <View style={BTN_SNOOZE_CONTAINER}>
                  <Button
                    text="스누즈"
                    onPress={stopSound}
                    textStyle={TEXT_SNOOZE}
                    style={BTN_SNOOZE}
                  ></Button>
                </View>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <Swipeable
                    renderLeftActions={onRenderLeftActions}
                    leftThreshold={10}
                    rightThreshold={15}
                    onEnded={() => {
                      stopSound()
                      stopRecording()
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
              <Text style={TIME_TEXT} text={moment(currTime).format("HH:mm:ss")} />
            </View>
            <View style={START_SESSION_BOX}>
              {parseInt(delay) > 0 && (
                <Text style={START_SESSION_TEXT} text={`코골이 감지가 ${delay}분 후 시작됩니다`} />
              )}
            </View>
            <View style={ALARM_BOX}>
              {alarm && (
                <>
                  <Text style={CURR_TIME} text={moment(alarm).format("LT")} />
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
