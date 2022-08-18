import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { load } from "../../utils/storage"
import moment from "moment"
import BackgroundTimer from "react-native-background-timer"

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
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const BULLET_TEXT: TextStyle = {
  flex: 1,
  color: "red",
  fontSize: 20,
  lineHeight: 22,
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

    return (
      <View testID="SleepScreen" style={FULL}>
        {/* <GradientBackground colors={["#422443", "#281b34"]} /> */}
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerText="알람변경"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View>
            <Text style={BULLET_TEXT}>편안히 주무세욘</Text>
          </View>
        </Screen>
      </View>
    )
  },
)
