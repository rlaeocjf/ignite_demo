import React, { FC } from "react"
import { View, ViewStyle, ImageBackground } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { Text } from "../../components"

const FULL: ViewStyle = {
  flex: 1,
  backgroundColor:"blue"
}

export const SwipeScreen: FC<StackScreenProps<NavigatorParamList, "swipe">> = observer(
  ({ navigation }) => {

    const renderRightActions = () => {
      return (
        <View style={{width:"100%"}}></View>
      );
  };
    return (
      <View testID="SwipeScreen" style={FULL}>
        <GestureHandlerRootView>
        <Swipeable
          leftThreshold={10}
          rightThreshold={41}
          renderRightActions={renderRightActions}
        >
          <View style={{ justifyContent: "center", alignItems: "center", }}>
            <Text>swipe</Text>
          </View>
        </Swipeable>
        </GestureHandlerRootView>
      </View>
    )
  },
)
