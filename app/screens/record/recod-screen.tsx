import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Screen, Text, Button } from "../../components"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { load } from "../../utils/storage"
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons"
import moment from "moment"
import { useIsFocused } from "@react-navigation/native"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  justifyContent: "flex-end",
  alignItems: "flex-end",
  flexDirection: "row",
  marginVertical: 10,
  paddingHorizontal: 15,
}
const BOX_CONTAINER: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  paddingHorizontal: 5,
  flex: 1,
}
const BOX: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#4a5a6c",
  width: "45%",
  height: 160,
  borderRadius: 10,
  marginVertical: 5,
}
const BOX_TEXT = {
  fontSize: 19,
  color: "#c8ccd2",
  marginTop: 13,
  marginBottom: 5,
}

const BOX_SUB_TEXT = {
  fontSize: 16,
  color: "#c8ccd2",
}

const BUTTON = {
  width: "93%",
  backgroundColor: "#2aa5db",
  // paddingVertical: 17,
  height: 55,
  borderRadius: 10,
  marginTop: 20,
}

const BUTTON_TEXT = {
  color: "#fff",
  fontSize: 30,
  lineHeight: 43,
  fontWeight: "500",
}

const HEADER_TEXT = {
  fontSize: 18,
  color: "#fff",
  marginRight: 4,
  marginTop: 4,
}

const TOUCH_ADD_ALARM: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  flexDirection: "row",
}

const HEADER_IMG: ViewStyle = {
  alignItems: "center",
  marginVertical: 20,
}
export const RecordScreen: FC<StackScreenProps<NavigatorParamList, "record">> = observer(
  ({ navigation }) => {
    const [alarmTime, setAlarmTime] = useState<string>()
    const [delayTime, setDelayTime] = useState<string>()
    const isFocused = useIsFocused()

    useEffect(() => {
      if (isFocused) {
        load("alarm").then((data) => {
          if (data && data.time) {
            // const t = moment(data.time).locale("ko").format("LT")
            const t = moment(data.time).format("LT")
            setAlarmTime(t)
          } else {
            setAlarmTime("")
          }
        })
        load("delaysleep").then((data) => {
          console.log(data)
          setDelayTime(data)
        })
      }
    }, [isFocused])

    return (
      <View testID="RecordScreen" style={FULL}>
        <GradientBackground colors={["#0f3352", "#3a444f"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <View style={HEADER}>
            <TouchableOpacity
              style={TOUCH_ADD_ALARM}
              onPress={() => navigation.navigate("alarmAdd")}
            >
              <Text style={HEADER_TEXT}>{alarmTime ? alarmTime : "끄기"}</Text>
              <MaterialCommunityIcons name="clock-plus-outline" size={30} color="#b483de" />
            </TouchableOpacity>
          </View>
          <View style={HEADER_IMG}>
            <Ionicons name="flask-outline" size={110} color="#d4d8de" />
          </View>
          <View style={BOX_CONTAINER}>
            <TouchableOpacity style={BOX} onPress={() => navigation.navigate("sleepDelay")}>
              <Ionicons name="bed-outline" size={65} color="#c7cbd1" />
              <Text style={BOX_TEXT} text="수면 시작 시간"></Text>
              <Text style={BOX_SUB_TEXT} text={`${delayTime ? delayTime : 0}분`}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={BOX}>
              <Feather name="play-circle" size={65} color="#c7cbd1" />
              <Text style={BOX_TEXT} text="결과"></Text>
              <Text style={BOX_SUB_TEXT} text="이번달 1회"></Text>
            </TouchableOpacity>
            <TouchableOpacity style={BOX}>
              <Ionicons name="ios-finger-print-outline" size={65} color="#c7cbd1" />
              <Text style={BOX_TEXT} text="요법"></Text>
              <Text style={BOX_SUB_TEXT} text="없음"></Text>
            </TouchableOpacity>
            <TouchableOpacity style={BOX}>
              <Ionicons name="wine-outline" size={65} color="#c7cbd1" />
              <Text style={BOX_TEXT} text="요인"></Text>
              <Text style={BOX_SUB_TEXT} text="없음"></Text>
            </TouchableOpacity>
            <Button
              text="시작"
              style={BUTTON}
              textStyle={BUTTON_TEXT}
              onPress={() => navigation.navigate("sleep")}
            />
          </View>
        </Screen>
      </View>
    )
  },
)
