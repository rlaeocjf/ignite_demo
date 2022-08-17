import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RecordScreen } from "../screens/record/recod-screen"
import { Ionicons } from "@expo/vector-icons"
import { AlarmScreen } from "../screens/alarm/alarm-screen"
import { WelcomeScreen } from "../screens"

const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name={"ios-home"} color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="녹음"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name={"mic"} color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="알람"
        component={AlarmScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name={"alarm"} color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}
export default Tabs
