import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RecordScreen } from "../screens/record/recod-screen"
import { Ionicons } from "@expo/vector-icons"
import { AlarmScreen } from "../screens/alarm/alarm-screen"
import { WelcomeScreen } from "../screens"

const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#3a3e46" },
        tabBarActiveTintColor: "#2bbae8",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={"ios-home"} color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="녹음"
        component={RecordScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name={"mic"} color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="알람"
        component={AlarmScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={"alarm"} color={color} size={30} />,
        }}
      />
    </Tab.Navigator>
  )
}
export default Tabs
