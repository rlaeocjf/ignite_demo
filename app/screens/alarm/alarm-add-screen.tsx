import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Button } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import DatePicker from "react-native-date-picker"
import { remove, save } from "../../utils/storage"

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
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
export const AlarmAddScreen: FC<StackScreenProps<NavigatorParamList, "alarm">> = observer(
  ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const goBack = () => navigation.goBack()
    const saveAlarm = () => {
      if (date) {
        save("alarm", { time: date })
      }
    }
    const removeAlarm = () => {
      if (date) {
        remove("alarm")
      }
    }

    return (
      <View testID="AlarmAddScreen" style={FULL}>
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
            <DatePicker date={date} mode="time" onDateChange={setDate} />
            <Button style={DEMO} textStyle={DEMO_TEXT} text={"저장"} onPress={saveAlarm} />
            <Button style={DEMO} textStyle={DEMO_TEXT} text={"삭제"} onPress={removeAlarm} />
          </View>
        </Screen>
      </View>
    )
  },
)
