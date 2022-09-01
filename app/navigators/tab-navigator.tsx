import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RecordScreen } from "../screens/record/recod-screen"
import { Ionicons } from "@expo/vector-icons"
import { RecordListScreen } from "../screens/record/record-list-screen"
import { ChartChartKitScreen, ChartScreen } from "../screens/chart/chart-chartkit-screen"
import { ChartVictoryScreen } from "../screens/chart/chart-vitory-screen"
import { ChartSvgScreen } from "../screens/chart/chart-svgchart-screen"

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
      {/* <Tab.Screen
        name="home"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={"ios-home"} color={color} size={30} />,
        }}
      /> */}
      <Tab.Screen
        name="녹음"
        component={RecordScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name={"mic"} color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="녹음목록"
        component={RecordListScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name={"list-outline"} color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="chart-kit"
        component={ChartChartKitScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"bar-chart-outline"} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="chart-victory"
        component={ChartVictoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"bar-chart-outline"} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="chart-svg"
        component={ChartSvgScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"bar-chart-outline"} color={color} size={30} />
          ),
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
