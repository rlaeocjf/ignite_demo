import React, { useEffect, FC, useState } from "react"
import { TextStyle, View, ViewStyle, ImageStyle, Button, Alert } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { Recording } from "expo-av/build/Audio"
import { getAllItemFromAsync, setItemToAsync } from "../../storage"
import { remove } from "../../utils/storage"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
export const RecordScreen: FC<StackScreenProps<NavigatorParamList, "demoList">> = observer(
  ({ navigation }) => {
    console.log("comp!")
    const [recording, setRecording] = useState<Recording>()
    const [savedRecordings, setSavedRecordings] = useState<{ key: string; val: string }[]>([])
    const [message, setMessage] = useState<string>("")
    const [isDeletedRecording, setIsdeletedRecording] = useState<boolean>(false)
    const [isSavedRecording, setIsSavedRecording] = useState<boolean>(false)
    console.log(isDeletedRecording)

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
      console.log(status)
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
        {/* <GradientBackground colors={["#422443", "#281b34"]} /> */}
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <View>
            <Text>{message}</Text>
            <Button
              title={recording ? "stop recording" : "start recording"}
              color="#841584"
              onPress={recording ? stopRecording : startRecording}
            />
            {getRecordingFromLocalStorage()}
          </View>
        </Screen>
      </View>
    )
  },
)
