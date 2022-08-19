import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle, ImageBackground } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { load } from "../../utils/storage"
import moment from "moment"
import BackgroundTimer from "react-native-background-timer"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"

const FULL: ViewStyle = {
  flex: 1,
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
    const [delay, setDelay] = useState<string>()

    useEffect(() => {
      load("alarm").then((data) => {
        if (data && data.time) {
          setAlarm(data.time)
          const currTime = moment(new Date())
          const savedTime = moment(data.time)
          const diff = moment.duration(savedTime.diff(currTime)).asMilliseconds()
          if (diff > 0) {
            const timeout = BackgroundTimer.setTimeout(() => {
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
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/ringtones/walk_in_the_forest.mp3"),
      )
      sound.setIsLoopingAsync(true)
      await sound.playAsync()
    }

    const onRenderLeftActions = () => {
      return <View style={{ width: "100%" }}></View>
    }
    return (
      <View testID="SleepScreen" style={FULL}>
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
                onEnded={() => navigation.goBack()}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons name="menu-right" size={50} color="#8793a5" />
                  <Text style={STOP_SESSION_TEXT} text="옆으로 밀어 세션 중지" />
                </View>
              </Swipeable>
            </GestureHandlerRootView>
          </View>
        </ImageBackground>
      </View>
    )
  },
)
