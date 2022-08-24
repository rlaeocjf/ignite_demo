import React, { FC, useEffect, useState } from "react"
import { TextStyle, ViewStyle, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Header, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { load, saveString } from "../../utils/storage"
import { Picker } from "@react-native-picker/picker"

const FULL: ViewStyle = {
  flex: 1,
}
const HEADER: ViewStyle = {
  backgroundColor: "#1a1b20",
  paddingTop: 60,
}
const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  letterSpacing: 1.5,
  textAlign: "center",
}
const PICKER = {
  textAlign: "center",
  flex: 1,
  width: "100%",
  color: "#d3dfeb",
}

export const SleepDelayScreen: FC<StackScreenProps<NavigatorParamList, "sleepDelay">> = observer(
  ({ navigation }) => {
    // const delay: { label: string; value: number | string }[] = [
    //   { lable: "0분", value: "0" },
    //   { lable: "5분", value: "5" },
    //   { lable: "10분", value: "10" },
    //   { lable: "15분", value: "15" },
    //   { lable: "20분", value: "20" },
    //   { lable: "30분", value: "30" },
    //   { lable: "40분", value: "40" },
    //   { lable: "60분", value: "60" },
    //   { lable: "90분", value: "90" },
    // ]
    const [selectedDelay, setSelectedDelay] = useState<string>()
    const goBack = () => navigation.goBack()
    const saveAndGoBack = () => {
      let delay = "0"
      if (selectedDelay) {
        delay = selectedDelay
      }
      saveString("delaysleep", delay)
      goBack()
    }

    useEffect(() => {
      load("delaysleep").then((data) => {
        setSelectedDelay(data.toString())
      })
    }, [])

    return (
      <View testID="SleepDelayScreen" style={FULL}>
        <GradientBackground colors={["#1a1b20", "#314752"]} />
        <Header
          headerText="수면 시작 시간"
          leftText="취소"
          onLeftPress={saveAndGoBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={{ alignItems: "center" }}>
          <GradientBackground colors={["#191d23", "#1f252c"]} />
          <View>
            <Text style={{ fontSize: 17 }} text="잠들 때까지 얼마나 걸리나요?" />
          </View>
          <Picker
            dropdownIconColor={"white"}
            style={PICKER}
            selectedValue={selectedDelay}
            onValueChange={(itemValue, itemIndex) => setSelectedDelay(itemValue)}
          >
            <Picker.Item label="0분" value="0" color={"#d3dfeb"} />
            <Picker.Item label="5분" value="5" color={"#d3dfeb"} />
            <Picker.Item label="10분" value="10" color={"#d3dfeb"} />
            <Picker.Item label="15분" value="15" color={"#d3dfeb"} />
            <Picker.Item label="20분" value="20" color={"#d3dfeb"} />
            <Picker.Item label="30분" value="30" color={"#d3dfeb"} />
            <Picker.Item label="40분" value="40" color={"#d3dfeb"} />
            <Picker.Item label="60분" value="60" color={"#d3dfeb"} />
            <Picker.Item label="90분" value="90" color={"#d3dfeb"} />
          </Picker>
        </View>
      </View>
    )
  },
)
