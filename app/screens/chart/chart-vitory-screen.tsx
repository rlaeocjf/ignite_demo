import React, { FC, useEffect, useState } from "react"
import { Dimensions, ScrollView, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const data = [
  { quarter: "8.20 월", earnings: 13000 },
  { quarter: "8.21 화", earnings: 16500 },
  { quarter: "8.22 수", earnings: 14250 },
  { quarter: "8.23 목", earnings: 19000 },
  { quarter: "8.24 금", earnings: 19000 },
  { quarter: "8.25 토", earnings: 19000 },
  { quarter: "8.26 일", earnings: 19000 },
  { quarter: "8.27 월", earnings: 19000 },
  { quarter: "8.28 화", earnings: 19000 },
  { quarter: "1", earnings: 19000 },
  { quarter: "2", earnings: 19000 },
  { quarter: "3", earnings: 19000 },
]

export const ChartVictoryScreen: FC<StackScreenProps<NavigatorParamList, "chartVictory">> =
  observer(({ navigation }) => {
    return (
      <View testID="DemoScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <VictoryChart
              // horizontal={Boolean(true)}
              // width={Dimensions.get("window").width}
              theme={VictoryTheme.grayscale}
              width={600}
            >
              <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
          </ScrollView>
        </Screen>
      </View>
    )
  })
