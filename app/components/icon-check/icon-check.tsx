import React, { useEffect, useState } from "react"
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
  checked?: boolean
}

const ICON_ITEM: ViewStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
}
const CIRCLE: ViewStyle = {
  backgroundColor: "#21546b",
  height: 75,
  width: 75,
  borderRadius: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 40,
  marginBottom: 10,
}
const ICON_TITLE: TextStyle = {
  width: 100,
  textAlign: "center",
  fontSize: 14,
  color: "#cacacb",
}
const ICON_CHECK: ViewStyle = {
  position: "absolute",
  bottom: 50,
  left: 65,
}
export default function IconCheck(props: IconCheckProps) {
  const { id, icon, iconColor, iconTitle, onpress, checked } = props
  const [check, setCheck] = useState<boolean>(false)

  useEffect(() => {
    if (checked) {
      setCheck(true)
    }
  }, [checked])

  const handlePress = () => {
    const current = !check
    setCheck(current)
    onpress && onpress({ id, check: current })
  }
  return (
    <View style={ICON_ITEM}>
      <TouchableOpacity style={CIRCLE} activeOpacity={1} onPress={handlePress}>
        <FontAwesome5 name={icon} size={30} color={iconColor || "#fff"} />
      </TouchableOpacity>
      {check && <AntDesign style={ICON_CHECK} name="checkcircle" size={25} color="#3abceb" />}
      {iconTitle.map((title, index) => {
        return <Text key={`ico_title_${index}`} style={ICON_TITLE} text={title} />
      })}
    </View>
  )
}
