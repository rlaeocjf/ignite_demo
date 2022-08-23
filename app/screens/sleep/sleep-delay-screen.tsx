import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle, ImageBackground, Image } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, GradientBackground, Header, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { load, save, saveString } from "../../utils/storage"
import moment from "moment"
import BackgroundTimer from "react-native-background-timer"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from "react-native-gesture-handler"
import { Recording, Sound } from "expo-av/build/Audio"
import { color } from "../../theme"
import DatePicker from "react-native-date-picker"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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

export const SleepDelayScreen: FC<StackScreenProps<NavigatorParamList, "sleepDelay">> = observer(
  ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const goBack = () => navigation.goBack()
    const saveAlarm = () => {
      if (date) {
        save("alarm", { time: date })
      }
      goBack()
    }
    return (
      <View testID="SleepDelayScreen" style={FULL}>
        <GradientBackground colors={["#1a1b20", "#314752"]} />
        <Header
          headerText="수면 시작 시간"
          leftText="취소"
          onLeftPress={goBack}
          rightText="저장"
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
          />
        </View>
      </View>
    )
  },
)
