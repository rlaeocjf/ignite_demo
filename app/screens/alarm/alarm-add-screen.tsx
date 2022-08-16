import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, Button, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import DatePicker from "react-native-date-picker"
import AsyncStorage from "@react-native-community/async-storage"

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

export const AlarmAddScreen: FC<StackScreenProps<NavigatorParamList, "alarm">> = observer(
  ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const goBack = () => navigation.goBack()
    const save = () => {
      if (date) {
        AsyncStorage.setItem("alarm", JSON.stringify({ time: date }), () => {
          console.log("saved alarm")
        })
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
            rightIcon="bullet"
            onRightPress={save}
          />
          <View>
            <DatePicker date={date} mode="time" onDateChange={setDate} />
          </View>
        </Screen>
      </View>
    )
  },
)
