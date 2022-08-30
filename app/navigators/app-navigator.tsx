/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { createContext, useMemo, useReducer } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { WelcomeScreen, DemoScreen, DemoListScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import Tabs from "./tab-navigator"
import { WelcomeScreen } from "../screens"
import { AlarmAddScreen } from "../screens/alarm/alarm-add-screen"
import { SleepScreen } from "../screens/sleep/sleep-screen"
import { RecordListScreen } from "../screens/record/record-list-screen"
import { SleepDelayScreen } from "../screens/sleep/sleep-delay-screen"
import { LoginScreen } from "../screens/auth/login-screen"

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
  // 🔥 Your screens go here
  demoList: undefined
  record: undefined
  tabs: undefined
  alarm: undefined
  alarmAdd: undefined
  sleep: undefined
  swipe: undefined
  recordList: undefined
  snooze: undefined
  sleepDelay: undefined
  login: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const SplashStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  )
}

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="tabs"
    >
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen key="demo" name="demo" component={DemoScreen} />
      <Stack.Screen key="demoList" name="demoList" component={DemoListScreen} /> */}
      {/* add stacks.. */}
      <Stack.Screen name="tabs" component={Tabs} />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <Stack.Screen name="alarmAdd" component={AlarmAddScreen} />
      </Stack.Group>
      <Stack.Screen name="sleep" component={SleepScreen} />
      <Stack.Screen name="sleepDelay" component={SleepDelayScreen} />
      <Stack.Screen name="recordList" component={RecordListScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

interface IState {
  isLoading: boolean
  isSignout: boolean
  refreshToken: string | null
  name: string | null
  email: string | null
}
interface IPayload {
  refreshToken: string
  name?: string
  email?: string
}
interface IAction {
  type: string
  payload?: {
    refreshToken: string
    name?: string
    email?: string
  }
}

// state의 초기 값을 설정한다
const initialState: IState = {
  isLoading: false,
  isSignout: false,
  refreshToken: null,
  name: null,
  email: null,
}

// reducer는 action에서 받은 type에 따라서 state를 변경한다.
const reducer = (prevState: IState, action: IAction) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        refreshToken: action.payload.refreshToken,
        isLoading: false,
      }
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        refreshToken: action.payload.refreshToken,
        name: action.payload.name || null,
        email: action.payload.email || null,
      }
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        refreshToken: null,
      }
    default:
      throw new Error()
  }
}
interface IContext {
  signIn: (data: any) => void | null
  signOut: (data: any) => void | null
  signUp: (data: any) => void | null
}
export const AuthContext = createContext<IContext>({
  signIn: null,
  signOut: null,
  signUp: null,
})

export const AppNavigator = (props: NavigationProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const authContext = useMemo(
    () => ({
      signIn: async (data: IPayload) => {
        console.log(data)
        dispatch({ type: "SIGN_IN", payload: data })
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data: IPayload) => {
        dispatch({ type: "SIGN_IN", payload: data })
      },
    }),
    [],
  )

  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  console.log("app-navi state = ")
  console.log(state)
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        {...props}
      >
        {state.isLoading ? (
          <SplashStack />
        ) : state.refreshToken == null ? (
          <LoginStack />
        ) : (
          <AppStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
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
