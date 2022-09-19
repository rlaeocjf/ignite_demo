import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, Screen, Text } from "../../components"
import { color } from "../../theme"
import { IconCheck } from "../../components/icon-check/icon-check"

const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: "#252930",
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: ViewStyle = {
  backgroundColor: "#252930",
  //   backgroundColor: "red",
}
const NOTICE: ViewStyle = {
  backgroundColor: "#252930",
  //   backgroundColor: "blue",
  paddingBottom: 25,
  paddingHorizontal: 35,
}
const NOTICE_TITLE: TextStyle = {
  fontSize: 19,
  fontWeight: "bold",
  textAlign: "center",
}
const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  letterSpacing: 1.5,
  textAlign: "center",
}
const ICON_CONTAINER: ViewStyle = {
  // backgroundColor: "blue",
  backgroundColor: "#1a1b20",
  paddingHorizontal: 15,
}
const ICON_ROW: ViewStyle = {
  // backgroundColor: "#1a1b20",
  // backgroundColor: "blue",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  // flex: 1,
  justifyContent: "space-between",
}
const BUTTON_CONTAINER: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  height: 120,
}
const BUTTON = {
  width: "45%",
  height: 50,
  borderRadius: 10,
  marginTop: 20,
}
const BUTTON_TEXT = {
  color: "#fff",
  fontSize: 21,
  lineHeight: 38,
}
export interface ICheck {
  id: string
  check: boolean
}
export const TherapyScreen: FC<StackScreenProps<NavigatorParamList, "therapy">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const save = () => {
      console.log("save")
    }
    const [checkList, setCheckList] = useState<string[]>([])
    const [checkCount, setCheckCount] = useState(0)
    const handlePress = ({ id, check }: ICheck) => {
      if (check) {
        setCheckList([...checkList, id])
      } else {
        setCheckList(checkList.filter((check) => check !== id))
      }
    }
    useEffect(() => {
      console.log(checkList)
      setCheckCount(checkList.length)
    }, [checkList])
    return (
      <View testID="SwipeScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerText="수면 시작 시간"
            leftText="취소"
            onLeftPress={goBack}
            rightText="편집"
            onRightPress={save}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={NOTICE}>
            <Text
              style={NOTICE_TITLE}
              text="이 세션의 코골이 요법을 선택하세요. 아이콘을 길게 누르면 추가 정보가 표시됩니다."
            />
          </View>
          <ScrollView style={ICON_CONTAINER}>
            <View style={ICON_ROW}>
              <IconCheck
                id="1"
                icon="head-side-mask"
                iconTitle={["지속성", "양성 기압법"]}
                onpress={handlePress}
              />
              <IconCheck
                id="2"
                icon="spray-can"
                iconTitle={["혀 리테이너"]}
                onpress={handlePress}
              />
              <IconCheck
                id="3"
                icon="prescription-bottle-alt"
                iconTitle={["마우스 테이프"]}
                onpress={handlePress}
              />
            </View>
            <View style={ICON_ROW}>
              <IconCheck
                id="4"
                icon="head-side-mask"
                iconTitle={["지속성", "양성 기압법"]}
                onpress={handlePress}
              />
              <IconCheck
                id="5"
                icon="spray-can"
                iconTitle={["혀 리테이너"]}
                onpress={handlePress}
              />
              <IconCheck
                id="6"
                icon="head-side-mask"
                iconTitle={["마우스 테이프"]}
                onpress={handlePress}
              />
            </View>
            <View style={ICON_ROW}>
              <IconCheck
                id="7"
                icon="prescription-bottle-alt"
                iconTitle={["지속성", "양성 기압법"]}
                onpress={handlePress}
              />
              <IconCheck
                id="8"
                icon="spray-can"
                iconTitle={["혀 리테이너"]}
                onpress={handlePress}
              />
              <IconCheck
                id="9"
                icon="head-side-mask"
                iconTitle={["마우스 테이프"]}
                onpress={handlePress}
              />
            </View>
            <View style={ICON_ROW}>
              <IconCheck
                id="10"
                icon="spray-can"
                iconTitle={["지속성", "양성 기압법"]}
                onpress={handlePress}
              />
              <IconCheck
                id="11"
                icon="head-side-mask"
                iconTitle={["혀 리테이너"]}
                onpress={handlePress}
              />
              <IconCheck
                id="12"
                icon="prescription-bottle-alt"
                iconTitle={["마우스 테이프"]}
                onpress={handlePress}
              />
            </View>
          </ScrollView>
          <View style={BUTTON_CONTAINER}>
            <Button
              text="새로 만들기"
              // eslint-disable-next-line react-native/no-inline-styles
              style={[BUTTON, { backgroundColor: color.buttonNew, marginRight: 13 }]}
              textStyle={BUTTON_TEXT}
              // onPress={() => {}}
            />
            <Button
              // text={`${checkList.filter((check) => check.check).length || 0} 확인`}
              text={`${checkCount} 확인`}
              style={[BUTTON, { backgroundColor: color.buttonOk }]}
              textStyle={BUTTON_TEXT}
              // onPress={() => {}}
            />
          </View>
        </Screen>
      </View>
    )
  },
)
