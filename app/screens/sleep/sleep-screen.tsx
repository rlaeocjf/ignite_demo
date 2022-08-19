import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle, ImageBackground } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Text } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { load } from "../../utils/storage"
import moment from "moment"
import BackgroundTimer from "react-native-background-timer"
import { Ionicons } from "@expo/vector-icons"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 15,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 18,
  textAlign: "center",
  color: "black",
}
const BULLET_TEXT: TextStyle = {
  color: "white",
  fontSize: 22,
  fontWeight: "600",
}
const SLEEP_BOX: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
export const SleepScreen: FC<StackScreenProps<NavigatorParamList, "sleep">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const [timer, setTimer] = useState<number>()

    useEffect(() => {
      load("alarm").then((data) => {
        if (data && data.time) {
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
      // <View testID="SleepScreen" style={FULL}>
      //   <GradientBackground colors={["#422443", "#281b34"]} />
      //   <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
      //     <View style={SLEEP_BOX}>
      //       <Text style={BULLET_TEXT}>편안히 주무세요</Text>
      //     </View>
      //   </Screen>
      // </View>
      <View testID="SleepScreen" style={FULL}>
        <ImageBackground
          source={require("../../../assets/images/bg_sleep.gif")}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              flex: 10,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#8793a5", fontSize: 70, marginBottom: 50 }}
              text={moment(new Date()).format("HH:mm")}
              onPress={() => {
                console.log("click")
              }}
            />
          </View>
          <View
            style={{
              flex: 9,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#8793a5", fontSize: 16, fontWeight: "500", marginVertical: 40 }}
              text="코골이 감지가 5분 후 시작됩니다"
            />
            <Text style={{ color: "#8793a5", fontSize: 23, fontWeight: "500" }} text="오후 3:50" />
            <Ionicons
              name="alarm-outline"
              size={40}
              color="#8793a5"
              style={{ marginTop: 5, marginBottom: 60 }}
            />
            <GestureHandlerRootView>
              <Swipeable
                renderLeftActions={onRenderLeftActions}
                leftThreshold={10}
                rightThreshold={15}
              >
                <Text style={{ color: "#8793a5", fontSize: 24 }} text="옆으로 밀어 세션 중지" />
              </Swipeable>
            </GestureHandlerRootView>
          </View>
        </ImageBackground>
      </View>
    )
  },
)
