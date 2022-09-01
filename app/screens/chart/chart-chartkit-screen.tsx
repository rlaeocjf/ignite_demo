import React, { FC } from "react"
import { Dimensions, ScrollView, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import { BarChart, StackedBarChart } from "react-native-chart-kit"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

export const ChartChartKitScreen: FC<StackScreenProps<NavigatorParamList, "chartkit">> = observer(
  ({ navigation }) => {
    return (
      <View testID="DemoScreen" style={FULL}>
        <GradientBackground colors={["#1a1b20", "#1c2025"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <BarChart
              data={{
                labels: [
                  "월",
                  "화",
                  "수",
                  "목",
                  "금",
                  "토",
                  "일",
                  "월",
                  "화",
                  "수",
                  "목",
                  "금",
                  "토",
                  "일",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              withInnerLines={false}
              // width={Dimensions.get("window").width} // from react-native
              width={700}
              height={220}
              // yAxisLabel="$"
              yAxisSuffix="%"
              fromZero={true}
              verticalLabelRotation={0}
              chartConfig={{
                // backgroundColor: "#e26a00",
                backgroundGradientFrom: "#1a1b20",
                backgroundGradientTo: "#1c2025",
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <StackedBarChart
              data={{
                labels: [
                  "월",
                  "화",
                  "수",
                  "목",
                  "금",
                  "토",
                  "일",
                  "월",
                  "화",
                  "수",
                  "목",
                  "금",
                  "토",
                  "일",
                ],
                legend: ["L1", "L2", "L3"],
                data: [
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                  [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 100),
                  ],
                ],
                barColors: ["#0b3262", "#648fc3", "#a4b0be"],
              }}
              hideLegend={false}
              // width={Dimensions.get("window").width}
              width={1000}
              height={220}
              yAxisSuffix="%"
              fromZero={true}
              withHorizontalLabels={true}
              withVerticalLabels={true}
              yLabelsOffset={25}
              formatYLabel={(value) => Math.floor(value / 3)}
              chartConfig={{
                // backgroundColor: "#1cc910",
                // backgroundGradientFrom: "#eff3ff",
                // backgroundGradientTo: "#efefef",
                backgroundGradientFrom: "#1a1b20",
                backgroundGradientTo: "#1c2025",
                decimalPlaces: 2,
                // color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                color: (opacity = 1) => `white`,
              }}
              style={{
                marginVertical: 8,
                // borderRadius: 16,
              }}
            />
          </ScrollView>
        </Screen>
      </View>
    )
  },
)
