/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { WelcomeScreen, DemoScreen, DemoListScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { RecordScreen } from "../screens/record/recod-screen"
import Tabs from "./tab-navigator"
import { DemoListScreen, DemoScreen, WelcomeScreen } from "../screens"
import { AlarmAddScreen } from "../screens/alarm/alarm-add-screen"
import { SleepScreen } from "../screens/sleep/sleep-screen"
import { Text } from "../components"
import { SwipeScreen } from "../screens/swipe/swipe-screen"
import { RecordListScreen } from "../screens/record/record-list-screen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  record: undefined
  tabs: undefined
  alarm: undefined
  alarmAdd: undefined
  sleep: undefined
  swipe: undefined
  recordList: undefined
  // 🔥 Your screens go here
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const CANCLE = { color: "#28ace5", fontSize: 17, fontWeight: 500 }

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName="welcome"
      initialRouteName="tabs"
    >
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} /> */}
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
      {/** 🔥 Your screens go here */}
      {/* <Stack.Screen name="alarm" component={AlarmAddScreen} /> */}
      <Stack.Screen name="tabs" component={Tabs} />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          // headerShown: true,
          // headerStyle: { backgroundColor: "#1a1b20" },
        }}
      >
        <Stack.Screen
          name="alarmAdd"
          component={AlarmAddScreen}
          // options={{
          //   headerTitle: "알람 추가",
          //   headerTitleStyle: { color: "#fff" },
          //   headerLeft: () => <Text text={"취소"} style={CANCLE}></Text>,
          // }}
        />
      </Stack.Group>
      <Stack.Screen name="sleep" component={SleepScreen} />
      <Stack.Screen name="recordList" component={RecordListScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  console.log(DarkTheme)
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
