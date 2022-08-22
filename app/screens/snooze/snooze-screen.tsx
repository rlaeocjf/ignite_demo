import React, { useEffect, FC, useState } from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
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
const START_SESSION_BOX: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "center",
}
const START_SESSION_TEXT: TextStyle = {
  color: "#8793a5",
  fontSize: 16,
  fontWeight: "500",
  marginTop: 30,
}
const ALARM_BOX: ViewStyle = { flex: 2, justifyContent: "flex-start", alignItems: "center" }
const ALARM_TEXT: TextStyle = { color: "#8793a5", fontSize: 23, fontWeight: "500", marginTop: 13 }
const STOP_SESSION_BOX: ViewStyle = { flex: 3, alignItems: "center" }
const STOP_SESSION_TEXT: TextStyle = {
  color: "#b2c3d8",
  fontSize: 24,
  paddingTop: 10,
  marginLeft: -10,
}
const BG: ViewStyle = {
  width: "100%",
  height: "100%",
}
const ALARM_ICON = {
  marginTop: 5,
  marginBottom: 60,
}

export const SnoozeScreen: FC<StackScreenProps<NavigatorParamList, "snooze">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
        
    
        
    const onRenderLeftActions = () => {
      return <View style={{ width: "100%" }}></View>
    }
    
    return (
      <View testID="SnoozeScreen" style={FULL}>
        <GradientBackground colors={["#81a1c9", "#426b9c"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
            <View style={{flex:5, justifyContent:"flex-end", alignItems:"center"}}>
                <Image style={{width:"70%",height:"80%",resizeMode:"contain" } } source={require("../../../assets/images/sun-color-icon.png")} />
                </View>
            <View style={{ flex:2, justifyContent:"center", alignItems:"center"}}>
               <GestureHandlerRootView>
              <Swipeable
                renderLeftActions={onRenderLeftActions}
                leftThreshold={10}
                rightThreshold={15}
                onEnded={() => {
                  navigation.goBack()
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons name="menu-right" size={50} color="#b2c3d8" />
                  <Text style={STOP_SESSION_TEXT} text="옆으로 밀어 세션 중지" />
                </View>
              </Swipeable>
            </GestureHandlerRootView>
            </View>
        </Screen>
        </View>
    )
  },
)
