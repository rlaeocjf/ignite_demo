import React, { FC, useRef } from "react"
import { View, ViewStyle, Dimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { WebView } from "react-native-webview"
import { WEBVIEW_URL } from "../../utils/constants"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "stretch", // 이부분 중요 이거 안써주면 WebView 에 width 값을 지정해야함..
  justifyContent: "center",
}
interface IIint {
  deviceWidth: number
  deviceHeight: number
  bottomTabHeight?: number
}
interface INativeEvent {
  canGoback: boolean
  canGoForward: boolean
  data: string
  loading: boolean
  url: string
}
interface INativeEventData {
  type: string
  data: any
}
export const WebResultScreen: FC<StackScreenProps<NavigatorParamList, "webResult">> = observer(
  ({ navigation }) => {
    const ref = useRef<WebView>(null)
    // send data to webview
    const init = () => {
      if (ref.current && ref.current.postMessage) {
        try {
          const init: IIint = {
            deviceWidth: Dimensions.get("window").width,
            deviceHeight: Dimensions.get("window").height,
          }
          ref.current.postMessage(JSON.stringify(init))
        } catch (err: unknown) {
          console.log(err)
        }
      }
    }
    // data from webview
    // const handleOnMessage = ({ nativeEvent: { data } }) => {
    const handleOnMessage = (e: { nativeEvent: INativeEvent }) => {
      try {
        const data: INativeEventData = JSON.parse(e.nativeEvent.data)
        console.log(data)
        if (data.type === "MENU_CHANGE") {
          navigation.navigate(data.data)
        }
      } catch (err: unknown) {
        console.log(err)
      }
    }
    const handleError = ({ nativeEvent }) => console.warn("WebView error: ", nativeEvent)
    return (
      <View testID="WebScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed">
          {/* <GradientBackground colors={["#0f3352", "#3a444f"]} /> */}
          <WebView
            ref={ref}
            onLoad={init}
            automaticallyAdjustContentInsets={true}
            showsVerticalScrollIndicator={false}
            // scrollEnabled={false}
            source={{ uri: `${WEBVIEW_URL}/results` }}
            onError={handleError}
            onMessage={handleOnMessage}
          />
        </Screen>
      </View>
    )
  },
)
