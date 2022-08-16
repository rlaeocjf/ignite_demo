import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RecordScreen } from "../screens/record/recod-screen"

const Tab = createBottomTabNavigator()

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={RecordScreen} />
      <Tab.Screen name="Settings" component={RecordScreen} />
    </Tab.Navigator>
  )
}
export default Tabs
