import moment from "moment"
import React from "react"
import { ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { Text } from "../../../components"
import TimeLive from "../../../components/time/time.viewer"

const BG: ViewStyle = {
  width: "100%",
  height: "100%",
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
const ALARM_BOX: ViewStyle = {
  flex: 2,
  justifyContent: "flex-start",
  alignItems: "center",
}
const CURR_TIME: TextStyle = {
  color: "#8793a5",
  fontSize: 23,
  fontWeight: "500",
  marginTop: 13,
}
const ALARM_ICON = {
  marginTop: 5,
  marginBottom: 60,
}
const STOP_SESSION_BOX: ViewStyle = {
  flex: 3,
  alignItems: "center",
}
const STOP_SESSION_TEXT: TextStyle = {
  color: "#8793a5",
  fontSize: 24,
  paddingTop: 10,
  marginLeft: -10,
}

interface ISleep {
  alarm: string
  onRenderLeftActions: () => JSX.Element
  stopRecording: () => Promise<void>
  goBack: () => void
}
const Sleep = (props: ISleep) => {
  const { alarm, onRenderLeftActions, stopRecording, goBack } = props
  return (
    <ImageBackground source={require("../../../assets/images/bg_sleep.gif")} style={BG}>
      <TimeLive />
      {/* <View style={START_SESSION_BOX}>
        {parseInt(delay) > 0 && (
          <Text style={START_SESSION_TEXT} text={`코골이 감지가 ${delay}분 후 시작됩니다`} />
        )}
      </View> */}
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
              goBack()
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
  )
}
export default Sleep
