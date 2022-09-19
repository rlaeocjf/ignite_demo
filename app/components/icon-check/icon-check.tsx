import React, { useState } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { FontAwesome5, AntDesign } from "@expo/vector-icons"
import { Text } from "../text/text"
import { ICheck } from "../../screens/therapy/therapy-screen"

interface IconCheckProps {
  id: string
  iconTitle?: string[]
  icon: string
  iconColor?: string
  onpress?: (props: ICheck) => void
}

const ICON_ITEM: ViewStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
}
const CIRCLE: ViewStyle = {
  backgroundColor: "#21546b",
  height: 85,
  width: 85,
  borderRadius: 45,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 40,
  marginBottom: 10,
}
const ICON_TITLE: TextStyle = {
  width: 100,
  textAlign: "center",
  fontSize: 17,
  fontWeight: "500",
  color: "#cacacb",
}
const ICON_CHECK: ViewStyle = {
  position: "absolute",
  bottom: 50,
  left: 70,
}
// to do memo 적용해서 클릭할때 마다 리렌더링 방지..
export function IconCheck(props: IconCheckProps) {
  const { id, icon, iconColor, iconTitle, onpress } = props
  console.log("child ::: " + id)
  const [check, setCheck] = useState<boolean>(false)
  const handlePress = () => {
    const current = !check
    setCheck(current)
    onpress && onpress({ id, check: current })
  }
  return (
    <View style={ICON_ITEM}>
      <TouchableOpacity style={CIRCLE} activeOpacity={1} onPress={handlePress}>
        <FontAwesome5 name={icon} size={35} color={iconColor || "#fff"} />
      </TouchableOpacity>
      {check && <AntDesign style={ICON_CHECK} name="checkcircle" size={25} color="#3abceb" />}
      {iconTitle.map((title, index) => {
        return <Text key={`ico_title_${index}`} style={ICON_TITLE} text={title} />
      })}
    </View>
  )
}
