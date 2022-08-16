import React, { useEffect, FC, useState } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle, Alert, Button } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, AutoImage as Image, GradientBackground } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { Recording } from "expo-av/build/Audio"

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
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const AlarmScreen: FC<StackScreenProps<NavigatorParamList, "alarm">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const [recording, setRecording] = useState<Recording>()

    // const startRecording = async () => {
    //   try {

    //     } else {
    //     }
    //   } catch (err) {
    //   }
    // }

    return (
      <View testID="RecordScreen" style={FULL}>
        {/* <GradientBackground colors={["#422443", "#281b34"]} /> */}
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <View>
            <Text>알람화면</Text>
            <Button
              title="알람추가"
              color="#841584"
              onPress={() => navigation.navigate("alarmAdd")}
            />
          </View>
        </Screen>
      </View>
    )
  },
)
