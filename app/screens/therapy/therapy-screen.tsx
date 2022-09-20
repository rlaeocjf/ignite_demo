import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, Screen, Text } from "../../components"
import { color } from "../../theme"
import IconCheck from "../../components/icon-check/icon-check"
import { load, save } from "../../utils/storage"
import DATA from "../../static/therapy/data.json"

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
const ICON_SCROLLVIEW: ViewStyle = {
  // backgroundColor: "blue",
  backgroundColor: "#1a1b20",
  paddingHorizontal: 15,
}
const ICON_CONTAINER: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
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
    /**
     * 요인을 localstorage에 저장하고 뒤로 돌아간다.
     */
    const handleSave = () => {
      save("therapyList", checkList)
        .then(() => console.log("saved"))
        .catch((err) => console.log(err))
      goBack()
    }
    const [checkList, setCheckList] = useState<string[]>([])
    const [checkCount, setCheckCount] = useState(0)
    /**
     * 각 각의 요인 아이콘을 press했을때 check여부를 관리한다.
     * @param param0
     */
    const handlePress = ({ id, check }: ICheck) => {
      if (check) {
        setCheckList([...checkList, id])
      } else {
        setCheckList(checkList.filter((check) => check !== id))
      }
    }
    /**
     * 해당 요인 아이콘이 이전에 체크되었는지 여부를 확인한다.
     * @param id
     * @returns
     */
    const isChecked = (id: string) => {
      return checkList.indexOf(id) > -1 ? Boolean(true) : Boolean(false)
    }

    /**
     * 체크된 요인의 리스트가 변경되면
     * count state를 변경 한다.
     */
    useEffect(() => {
      setCheckCount(checkList.length)
    }, [checkList])

    /**
     * 스크린(컴포넌트)가 마운트 되는 시점에
     * 로컬스토리지의 체크된 요인데이터를 가져와 세팅한다
     */
    useEffect(() => {
      load("therapyList").then((data: string[]) => {
        setCheckList(data)
      })
    }, [])

    return (
      <View testID="SwipeScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerText="수면 시작 시간"
            leftText="취소"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={NOTICE}>
            <Text
              style={NOTICE_TITLE}
              text="이 세션의 코골이 요법을 선택하세요. 아이콘을 길게 누르면 추가 정보가 표시됩니다."
            />
          </View>
          <ScrollView style={ICON_SCROLLVIEW}>
            <View style={ICON_CONTAINER}>
              {DATA.data.map((item, index) => {
                return (
                  <IconCheck
                    key={`therapy_icon_${index}`}
                    id={item.id}
                    icon={item.icon}
                    iconTitle={item.iconTitle}
                    onpress={handlePress}
                    checked={isChecked(item.id)}
                  />
                )
              })}
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
              text={`${checkCount} 확인`}
              style={[BUTTON, { backgroundColor: color.buttonOk }]}
              textStyle={BUTTON_TEXT}
              onPress={handleSave}
            />
          </View>
        </Screen>
      </View>
    )
  },
)
