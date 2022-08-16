import React, { useEffect, FC, useState } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle, Alert, Button } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, AutoImage as Image, GradientBackground } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { Recording } from "expo-av/build/Audio"

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
    const goBack = () => navigation.goBack()
    const [recording, setRecording] = useState<Recording>()
    const [recordings, setRecordings] = useState([])
    const [message, setMessage] = useState<string>("")

    const { characterStore } = useStores()
    const { characters } = characterStore

    useEffect(() => {
      async function fetchData() {
        await characterStore.getCharacters()
      }
      fetchData()
    }, [])

    const startRecording = async () => {
      try {
        console.log("Requesting permissions..")
        const permission = await Audio.requestPermissionsAsync()
        console.log(permission)
        if (permission.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            //백그라운드 모드에서 녹음 할때..
            staysActiveInBackground: true,
          })
          console.log("Starting recording..")
          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
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

      const updateRecordings = [...recordings]
      const { sound, status } = await recording.createNewLoadedSoundAsync()

      if (status.isLoaded) {
        updateRecordings.push({
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI,
        })
      }
      setRecordings(updateRecordings)
    }

    const getDurationFormatted = (millis: number) => {
      const minutes = millis / 1000 / 60
      const minutesDisplay = Math.floor(minutes)
      const seconds = Math.round((minutes - minutesDisplay) * 60)
      const secondsDisplay = seconds < 10 ? `0{seconds}` : seconds
      return `${minutesDisplay}:${secondsDisplay}`
    }

    const getRecordingLines = () => {
      return recordings.map((recordingLine, index) => {
        return (
          <View key={index}>
            <Text>
              Recording {index + 1} - {recordingLine.duration}
            </Text>
            <Button onPress={() => recordingLine.sound.replayAsync()} title="Play" />
          </View>
        )
      })
    }

    return (
      <View testID="RecordScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <View>
            <Text>{message}</Text>
            <Button title="start recording" color="#841584" onPress={startRecording} />
            <Button title="stop recording" color="#841584" onPress={stopRecording} />
            {getRecordingLines()}
          </View>
        </Screen>
      </View>
    )
  },
)
