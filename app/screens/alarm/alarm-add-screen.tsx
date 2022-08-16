import React, { FC } from "react"
import { View, ViewStyle, Button, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

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
    const goBack = () => navigation.goBack()
    const save = () => {
      console.log("save!")
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
          <View></View>
        </Screen>
      </View>
    )
  },
)
