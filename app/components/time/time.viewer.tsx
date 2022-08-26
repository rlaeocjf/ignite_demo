/**
 * 현재 실시간 시간을 보여주는 컴포넌트
 */
import moment from "moment"
import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text/text"

const TIME_BOX: ViewStyle = {
  flex: 7,
  justifyContent: "flex-end",
  alignItems: "center",
}
const TIME_TEXT: TextStyle = {
  color: "#8793a5",
  fontSize: 70,
  marginBottom: 25,
}
const TimeViewer = () => {
  const [time, setTime] = useState<Date>()
  useEffect(() => {
    const currTime = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(currTime)
    }
  }, [])
  return (
    <View style={TIME_BOX}>
      <Text style={TIME_TEXT} text={moment(time).format("HH:mm:ss")} />
    </View>
  )
}

export default TimeViewer
