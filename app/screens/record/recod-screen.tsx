import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle, ImageStyle, Alert, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Screen, Text, Button } from "../../components"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { Recording } from "expo-av/build/Audio"
import { getAllItemFromAsync, setItemToAsync } from "../../storage"
import { load, remove } from "../../utils/storage"
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons"
import moment from "moment"
import { useIsFocused } from "@react-navigation/native"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  justifyContent: "flex-end",
  alignItems: "flex-end",
  flexDirection: "row",
  marginVertical: 10,
  paddingHorizontal: 15,
}
const BOX_CONTAINER: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  paddingHorizontal: 5,
  flex: 1,
}
const BOX: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#4a5a6c",
  width: "45%",
  height: 160,
  borderRadius: 10,
  marginVertical: 5,
}
const BOX_TEXT = {
  fontSize: 19,
  color: "#c8ccd2",
  marginTop: 13,
  marginBottom: 5,
}

const BOX_SUB_TEXT = {
  fontSize: 16,
  color: "#c8ccd2",
}

const BUTTON = {
  width: "93%",
  backgroundColor: "#2aa5db",
  paddingVertical: 17,
  borderRadius: 10,
  marginTop: 20,
}

const BUTTON_TEXT = {
  color: "#fff",
  fontSize: 30,
  fontWeight: "500",
}

const HEADER_TEXT = {
  fontSize: 18,
  color: "#fff",
  marginRight: 4,
  marginTop: 4,
}

const TOUCH_ADD_ALARM: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  flexDirection: "row",
}

const HEADER_IMG: ViewStyle = {
  alignItems: "center",
  marginVertical: 20,
}
export const RecordScreen: FC<StackScreenProps<NavigatorParamList, "record">> = observer(
  ({ navigation }) => {
    const [recording, setRecording] = useState<Recording>()
    const [savedRecordings, setSavedRecordings] = useState<{ key: string; val: string }[]>([])
    const [message, setMessage] = useState<string>("")
    const [isDeletedRecording, setIsdeletedRecording] = useState<boolean>(false)
    const [isSavedRecording, setIsSavedRecording] = useState<boolean>(false)
    const [alarmTime, setAlarmTime] = useState<string>()

    const isFocused = useIsFocused()

    const startRecording = async () => {
      try {
        console.log("Requesting permissions..")
        const permission = await Audio.requestPermissionsAsync()
        console.log(permission)
        if (permission.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            // 백그라운드 모드에서 녹음 할때..
            staysActiveInBackground: true,
          })
          console.log("Starting recording..")
          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY,
          )
          setRecording(recording)
          console.log("Recording started")
        } else {
          setMessage("please grant permission to app to access microphone")
        }
      } catch (err) {
        console.log(err)
      }
    }

    const stopRecording = async () => {
      console.log("Stopping recording..")
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      console.log("Recording stopped and stored at", uri)

      const { sound, status } = await recording.createNewLoadedSoundAsync()
      if (status.isLoaded) {
        console.log(recording.getURI())
        setItemToAsync(`recording_${new Date().getTime()}`, recording.getURI()).then(() => {
          setIsSavedRecording(true)
        })
        // updateRecordings.push({
        //   sound: sound,
        //   duration: getDurationFormatted(status.durationMillis),
        //   file: recording.getURI,
        // })
      }
      // setRecordings(updateRecordings)
    }

    const getDurationFormatted = (millis: number) => {
      const minutes = millis / 1000 / 60
      const minutesDisplay = Math.floor(minutes)
      const seconds = Math.round((minutes - minutesDisplay) * 60)
      const secondsDisplay = seconds < 10 ? `0{seconds}` : seconds
      return `${minutesDisplay}:${secondsDisplay}`
    }

    const loadSavedRecordings = async () => {
      getAllItemFromAsync("recording").then((data) => {
        setSavedRecordings(data)
      })
    }

    const playRecording = async (uri: string) => {
      const { sound, status } = await Audio.Sound.createAsync({
        uri,
      })
      if (status.isLoaded) {
        console.log(status.durationMillis)
      }
      sound.playAsync()
    }

    useEffect(() => {
      if (isSavedRecording) {
        loadSavedRecordings()
        setIsSavedRecording(false)
      }
      if (isDeletedRecording) {
        loadSavedRecordings()
        setIsdeletedRecording(false)
      }
    }, [isSavedRecording, isDeletedRecording])

    useEffect(() => {
      if (isFocused) {
        load("alarm").then((data) => {
          if (data && data.time) {
            // const t = moment(data.time).locale("ko").format("LT")
            const t = moment(data.time).format("LT")
            setAlarmTime(t)
          } else {
            setAlarmTime("")
          }
        })
      }
    }, [isFocused])

    useEffect(() => {
      loadSavedRecordings()
    }, [])

    const getRecordingFromLocalStorage = () => {
      return savedRecordings.map((savedRecording) => {
        return (
          <View key={savedRecording.key}>
            <Text>Recording {savedRecording.key}</Text>
            <Button
              onPress={() => {
                playRecording(savedRecording.val)
              }}
              title="Play"
            />
            <Button
              onPress={() => {
                remove(savedRecording.key).then(() => setIsdeletedRecording(true))
              }}
              title="delete"
            />
          </View>
        )
      })
    }

    return (
      <View testID="RecordScreen" style={FULL}>
        <GradientBackground colors={["#0f3352", "#3a444f"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <View style={HEADER}>
            <TouchableOpacity
              style={TOUCH_ADD_ALARM}
              onPress={() => navigation.navigate("alarmAdd")}
            >
              <Text style={HEADER_TEXT}>{alarmTime ? alarmTime : "끄기"}</Text>
              <MaterialCommunityIcons name="clock-plus-outline" size={30} color="#b483de" />
            </TouchableOpacity>
          </View>
          <View style={HEADER_IMG}>
            <Ionicons name="flask-outline" size={110} color="#d4d8de" />
          </View>
          <View style={BOX_CONTAINER}>
            <View style={BOX}>
              <Ionicons name="bed-outline" size={65} color="#c7cbd1" />
              <Text style={BOX_TEXT} text="수면 시작 시간"></Text>
              <Text style={BOX_SUB_TEXT} text="0분"></Text>
            </View>
            <View style={BOX}>
              <Feather name="play-circle" size={65} color="#c7cbd1" />
              <Text style={BOX_TEXT} text="결과"></Text>
              <Text style={BOX_SUB_TEXT} text="이번달 1회"></Text>
            </View>
            <View style={BOX}>
              <Ionicons name="ios-finger-print-outline" size={65} color="#c7cbd1" />
              <Text style={BOX_TEXT} text="요법"></Text>
              <Text style={BOX_SUB_TEXT} text="없음"></Text>
            </View>
            <View style={BOX}>
              <Ionicons name="wine-outline" size={65} color="#c7cbd1" />
              <Text style={BOX_TEXT} text="요인"></Text>
              <Text style={BOX_SUB_TEXT} text="없음"></Text>
            </View>
            <Button
              text="시작"
              style={BUTTON}
              textStyle={BUTTON_TEXT}
              onPress={() => navigation.navigate("sleep")}
            />
          </View>
          {/* <View style={{ backgroundColor: "#32cd32", flex: 1 }}>
            <Button
              title={recording ? "stop recording" : "start recording"}
              color="#841584"
              onPress={recording ? stopRecording : startRecording}
            />
            {getRecordingFromLocalStorage()}
          </View> */}
        </Screen>
      </View>
    )
  },
)
