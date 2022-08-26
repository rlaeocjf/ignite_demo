import moment from "moment"
import React from "react"
import { ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { Button, GradientBackground, Screen, Text } from "../../../components"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { color } from "../../../theme"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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
const CURR_TIME_IN_ALARM: TextStyle = {
  color: "#d1693d",
  fontSize: 50,
  paddingBottom: 110,
}
const STOP_SESSION_TEXT: TextStyle = {
  color: "#8793a5",
  fontSize: 24,
  paddingTop: 10,
  marginLeft: -10,
}
interface IAarm {
  alarm: string
  stopSound: () => Promise<void>
  onRenderLeftActions: () => JSX.Element
  stopRecording: () => Promise<void>
  goBack: () => void
}
const Alarm = (props: IAarm) => {
  const { alarm, stopSound, onRenderLeftActions, stopRecording, goBack } = props
  return (
    <View style={FULL}>
      <GradientBackground colors={["#81a1c9", "#426b9c"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <View style={IMAGE_CONTAINER}>
          <ImageBackground
            source={require("../../../../assets/images/sun-color-icon.png")}
            resizeMode="contain"
            style={IMAGE_SUNRISE}
          >
            <Text style={CURR_TIME_IN_ALARM} text={moment(alarm).format("HH:mm")} />
          </ImageBackground>
        </View>
        <View style={SNOOZE_CONTAINER}>
          <View style={BTN_SNOOZE_CONTAINER}>
            <Button text="스누즈" onPress={stopSound} textStyle={TEXT_SNOOZE} style={BTN_SNOOZE} />
          </View>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Swipeable
              renderLeftActions={onRenderLeftActions}
              leftThreshold={10}
              rightThreshold={15}
              onEnded={() => {
                stopSound()
                stopRecording()
                goBack()
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
  )
}
export default Alarm
