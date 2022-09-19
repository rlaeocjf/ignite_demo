import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { WebView } from "react-native-webview"
import { WEBVIEW_URL } from "../../utils/constants"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "stretch",
  justifyContent: "center",
}
export const WebTrendScreen: FC<StackScreenProps<NavigatorParamList, "webTrend">> = observer(
  ({ navigation }) => {
    const handleError = ({ nativeEvent }) => console.warn("WebView error: ", nativeEvent)
    return (
      <View testID="WebScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed">
          <WebView
            automaticallyAdjustContentInsets={true}
            showsVerticalScrollIndicator={false}
            source={{ uri: `${WEBVIEW_URL}/trend` }}
            onError={handleError}
          />
        </Screen>
      </View>
    )
  },
)
