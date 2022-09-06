import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RecordScreen } from "../screens/record/recod-screen"
import { Ionicons } from "@expo/vector-icons"
import { RecordListScreen } from "../screens/record/record-list-screen"
import { WebScreen } from "../screens/web/web-screen"

const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="record"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#1a1b20" },
        tabBarActiveTintColor: "#2bbae8",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      {/* <Tab.Screen
        name="home"
        component={WelcomeScreen}
        options={{
          title: "home",
          tabBarIcon: ({ color }) => <Ionicons name={"ios-home"} color={color} size={30} />,
        }}
      /> */}
      <Tab.Screen
        name="record"
        component={RecordScreen}
        options={{
          title: "녹음",
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name={"mic"} color={color} size={30} />,
          tabBarStyle: { backgroundColor: "#3a3e46" },
        }}
      />
      <Tab.Screen
        name="recordList"
        component={RecordListScreen}
        options={{
          title: "녹음목록",
          tabBarIcon: ({ color }) => <Ionicons name={"list-outline"} color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="webview"
        component={WebScreen}
        options={{
          title: "웹뷰",
          tabBarIcon: ({ color }) => <Ionicons name={"list-outline"} color={color} size={30} />,
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="소리"
        component={TrackScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={"list-outline"} color={color} size={30} />,
        }}
      /> */}
      {/* <Tab.Screen
        name="알람"
        component={AlarmScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={"alarm"} color={color} size={30} />,
        }}
      /> */}
    </Tab.Navigator>
  )
}
export default Tabs
