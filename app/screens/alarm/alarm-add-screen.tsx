import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, GradientBackground } from "../../components"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import DatePicker from "react-native-date-picker"
import { remove, save } from "../../utils/storage"
const FULL: ViewStyle = {
  flex: 1,
}
const HEADER: TextStyle = {
  backgroundColor: "#1a1b20",
}
const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  letterSpacing: 1.5,
  textAlign: "center",
}
const TOUCH_REMOVE_ALARM: ViewStyle = {
  paddingVertical: 15,
  marginTop: 20,
  backgroundColor: "#7f888e",
  width: "100%",
}
const TOUCH_REMOVE_ALARM_TEXT: TextStyle = {
  textAlign: "center",
  color: "#a93039",
  fontWeight: "500",
  fontSize: 18,
}
export const AlarmAddScreen: FC<StackScreenProps<NavigatorParamList, "alarm">> = observer(
  ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const goBack = () => navigation.goBack()
    const saveAlarm = () => {
      if (date) {
        save("alarm", { time: date })
      }
      goBack()
    }
    const removeAlarm = () => {
      if (date) {
        remove("alarm")
      }
      goBack()
    }
    return (
      <View testID="AlarmAddScreen" style={FULL}>
        <GradientBackground colors={["#0f3352", "#3a444f"]} />
        <Header
          headerText="알림 추가"
          leftText="취소"
          onLeftPress={goBack}
          rightText="저장"
          onRightPress={saveAlarm}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={{ alignItems: "center" }}>
          <GradientBackground colors={["#191d23", "#1f252c"]} />
          <DatePicker
            date={date}
            mode="time"
            minuteInterval={1}
            onDateChange={setDate}
            textColor={"#d3dfeb"}
            androidVariant={"nativeAndroid"}
          />
          <TouchableOpacity style={TOUCH_REMOVE_ALARM} onPress={removeAlarm}>
            <Text text="알림 끄기" style={TOUCH_REMOVE_ALARM_TEXT}></Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
)
