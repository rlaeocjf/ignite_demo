import React, { FC, useRef } from "react"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { WebView } from "react-native-webview"
import { WEBVIEW_URL } from "../../utils/constants"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: "#1a1b20",
}

export const WebScreen: FC<StackScreenProps<NavigatorParamList, "web">> = observer(
  ({ navigation }) => {
    const ref = useRef<WebView>(null)
    const handleClick = () => {
      if (ref.current && ref.current.postMessage) {
        ref.current.postMessage("This Message from RN")
      }
    }
    const handleOnMessage = ({ nativeEvent: { data } }) => {
      console.log(data)
      navigation.navigate("record")
    }
    const handleError = ({ nativeEvent }) => console.warn("WebView error: ", nativeEvent)
    return (
      <View testID="WebScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed">
          {/* <Button text="메세지 전송" onPress={handleClick} /> */}
          <WebView
            ref={ref}
            showsVerticalScrollIndicator={false}
            source={{ uri: `${WEBVIEW_URL}/results` }}
            onError={handleError}
            onMessage={handleOnMessage}
            style={{ backgroundColor: "#1a1b20" }}
          />
        </Screen>
      </View>
    )
  },
)
