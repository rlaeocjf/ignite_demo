import React, { FC, useEffect, useRef, useState } from "react"
import { Dimensions, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import { StackedBarChart } from "react-native-svg-charts"
import Svg, { G, Line, Text, Rect, Path, Circle } from "react-native-svg"
import { select } from "d3"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const H1: TextStyle = {
  fontSize: 24,
}

export const ChartSvgScreen: FC<StackScreenProps<NavigatorParamList, "chartSvg">> = observer(
  ({ navigation }) => {
    const svgRef = useRef(null)
    const [data2, setData2] = useState([24, 30, 45, 70, 26])

    useEffect(() => {
      const svg = select(svgRef.current) // selection 객체
      svg.selectAll(Circle)
      // svg
      //   .selectAll("circle")
      //   .data(data)
      //   .join(
      //     (enter) => enter.append("circle"),
      //     (update) => update.attr("class", "updated"),
      //     (exit) => exit.remove(),
      //   )
      //   .attr("r", (value) => value)
      //   .attr("cx", (value) => value * 2)
      //   .attr("cy", (value) => value * 2)
      //   .attr("stroke", "red")
    }, [data2])

    const ydata = ["월", "화", "수"]
    const data = [
      {
        month: new Date(2015, 0, 1),
        apples: 3840,
        bananas: 1920,
        cherries: 960,
        dates: 400,
        oranges: 400,
      },
      {
        month: new Date(2015, 1, 1),
        apples: 1600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Date(2015, 2, 1),
        apples: 640,
        bananas: 960,
        cherries: 3640,
        dates: 400,
      },
      {
        month: new Date(2015, 3, 1),
        apples: 3320,
        bananas: 480,
        cherries: 640,
        dates: 400,
      },
    ]

    const colors = ["#7b4173", "#a55194", "#ce6dbd", "#de9ed6"]
    const keys = ["apples", "bananas", "cherries", "dates"]

    return (
      <View testID="DemoScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <View>
            <StackedBarChart
              style={{ height: 200 }}
              keys={keys}
              colors={colors}
              data={data}
              showGrid={true}
              contentInset={{ top: 30, bottom: 30 }}
            />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Svg width="960" height="500">
              <G transform="translate(40,20)">
                <G transform="translate(0,450)">
                  <G class="tick" transform="translate(25.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0"></Text>
                  </G>
                  <G class="tick" transform="translate(59.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      B
                    </Text>
                  </G>
                  <G class="tick" transform="translate(93.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      C
                    </Text>
                  </G>
                  <G class="tick" transform="translate(127.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      D
                    </Text>
                  </G>
                  <G class="tick" transform="translate(161.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      E
                    </Text>
                  </G>
                  <G class="tick" transform="translate(195.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      F
                    </Text>
                  </G>
                  <G class="tick" transform="translate(229.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      G
                    </Text>
                  </G>
                  <G class="tick" transform="translate(263.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      H
                    </Text>
                  </G>
                  <G class="tick" transform="translate(297.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      I
                    </Text>
                  </G>
                  <G class="tick" transform="translate(331.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      J
                    </Text>
                  </G>
                  <G class="tick" transform="translate(365.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      K
                    </Text>
                  </G>
                  <G class="tick" transform="translate(399.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      L
                    </Text>
                  </G>
                  <G class="tick" transform="translate(433.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      M
                    </Text>
                  </G>
                  <G class="tick" transform="translate(467.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      N
                    </Text>
                  </G>
                  <G class="tick" transform="translate(501.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      O
                    </Text>
                  </G>
                  <G class="tick" transform="translate(535.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      P
                    </Text>
                  </G>
                  <G class="tick" transform="translate(569.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      Q
                    </Text>
                  </G>
                  <G class="tick" transform="translate(603.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      R
                    </Text>
                  </G>
                  <G class="tick" transform="translate(637.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      S
                    </Text>
                  </G>
                  <G class="tick" transform="translate(671.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      T
                    </Text>
                  </G>
                  <G class="tick" transform="translate(705.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      U
                    </Text>
                  </G>
                  <G class="tick" transform="translate(739.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      V
                    </Text>
                  </G>
                  <G class="tick" transform="translate(773.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      W
                    </Text>
                  </G>
                  <G class="tick" transform="translate(807.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      X
                    </Text>
                  </G>
                  <G class="tick" transform="translate(841.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      Y
                    </Text>
                  </G>
                  <G class="tick" transform="translate(875.5,0)" style="opacity: 1;">
                    <Line y2="6" x2="0"></Line>
                    <Text dy=".71em" y="9" x="0">
                      Z
                    </Text>
                  </G>
                  <Path d="M0,6V0H900V6"></Path>
                </G>
                <G class="y axis">
                  <G class="tick" transform="translate(0,450)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      0%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,414.57250826641473)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      1%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,379.14501653282946)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      2%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,343.71752479924425)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      3%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,308.290033065659)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      4%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,272.86254133207365)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      5%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,237.43504959848843)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      6%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,202.0075578649031)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      7%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,166.5800661313179)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      8%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,131.15257439773262)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      9%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,95.72508266414734)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      10%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,60.297590930562116)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      11%
                    </Text>
                  </G>
                  <G class="tick" transform="translate(0,24.87009919697684)" style="opacity: 1;">
                    <Line x2="-6" y2="0"></Line>
                    <Text dy=".32em" x="-9" y="0">
                      12%
                    </Text>
                  </G>
                  <Path d="M-6,0H0V450H-6"></Path>
                  <Text transform="rotate(-90)" y="6" dy=".71em">
                    Frequency
                  </Text>
                </G>
                <Rect
                  fill="#d81c3f"
                  x="10"
                  width="31"
                  y="160.66367501180912"
                  height="289.3363249881909"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="44"
                  width="31"
                  y="397.1421823334908"
                  height="52.85781766650922"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="78"
                  width="31"
                  y="351.4407179971658"
                  height="98.55928200283421"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="112"
                  width="31"
                  y="299.3268776570619"
                  height="150.6731223429381"
                ></Rect>
                <Rect fill="#d81c3f" x="146" width="31" y="0" height="450"></Rect>
                <Rect
                  fill="#d81c3f"
                  x="180"
                  width="31"
                  y="368.94189891355694"
                  height="81.05810108644306"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="214"
                  width="31"
                  y="378.61360415682566"
                  height="71.38639584317434"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="248"
                  width="31"
                  y="234.10486537553143"
                  height="215.89513462446857"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="282"
                  width="31"
                  y="203.21209258384505"
                  height="246.78790741615495"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="316"
                  width="31"
                  y="444.57959376476146"
                  height="5.420406235238545"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="350"
                  width="31"
                  y="422.64997638167216"
                  height="27.35002361832784"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="384"
                  width="31"
                  y="307.4043457723193"
                  height="142.5956542276807"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="418"
                  width="31"
                  y="364.76145488899385"
                  height="85.23854511100615"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="452"
                  width="31"
                  y="210.89985829003308"
                  height="239.10014170996692"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="486"
                  width="31"
                  y="184.0458195559754"
                  height="265.9541804440246"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="520"
                  width="31"
                  y="381.660368445914"
                  height="68.339631554086"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="554"
                  width="31"
                  y="446.6343882853094"
                  height="3.3656117146906013"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="588"
                  width="31"
                  y="237.89560699102503"
                  height="212.10439300897497"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="622"
                  width="31"
                  y="225.850259801606"
                  height="224.149740198394"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="656"
                  width="31"
                  y="129.16863486065182"
                  height="320.8313651393482"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="690"
                  width="31"
                  y="352.29097779877185"
                  height="97.70902220122815"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="724"
                  width="31"
                  y="415.3519130845536"
                  height="34.64808691544641"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="758"
                  width="31"
                  y="366.39111950873877"
                  height="83.60888049126123"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="792"
                  width="31"
                  y="444.68587623996217"
                  height="5.31412376003783"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="826"
                  width="31"
                  y="380.06613131790266"
                  height="69.93386868209734"
                ></Rect>
                <Rect
                  fill="#d81c3f"
                  x="860"
                  width="31"
                  y="447.3783656117147"
                  height="2.6216343882853153"
                ></Rect>
              </G>
            </Svg>
          </ScrollView>
          <View>
            <Svg ref={svgRef}></Svg>
          </View>
        </Screen>
      </View>
    )
  },
)
