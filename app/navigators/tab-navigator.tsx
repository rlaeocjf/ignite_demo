import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RecordScreen } from "../screens/record/recod-screen"
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="녹음"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name={"mic"} color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="알람"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name={"alarm"} color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}
export default Tabs
