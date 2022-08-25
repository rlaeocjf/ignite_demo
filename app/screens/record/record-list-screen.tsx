import React, { useEffect, FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { getAllItemFromAsync } from "../../storage"
import { remove } from "../../utils/storage"
import { View, ViewStyle, Text, Button } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import * as FileSystem from "expo-file-system"

const FULL: ViewStyle = {
  flex: 1,
}
export const RecordListScreen: FC<StackScreenProps<NavigatorParamList, "recordList">> = observer(
  ({ navigation }) => {
    console.log(FileSystem.cacheDirectory)
    const [savedRecordings, setSavedRecordings] = useState<{ key: string; val: string }[]>([])
    const isFocused = useIsFocused()

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
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })
      const { sound, status } = await Audio.Sound.createAsync({
        uri,
      })
      if (status.isLoaded) {
        console.log(status.durationMillis)
        await sound.playAsync()
      }
    }
    useEffect(() => {
      if (isFocused) {
        loadSavedRecordings()
      }
    }, [isFocused])

    const deletePhysical = async (filename: string) => {
      await FileSystem.deleteAsync(filename)
    }

    const getRecordingFromLocalStorage = () => {
      return savedRecordings.map((savedRecording) => {
        return (
          <View key={savedRecording.key}>
            <Text>Recording {savedRecording.val}</Text>
            <Button
              onPress={() => {
                playRecording(savedRecording.val)
              }}
              title="Play"
            />
            <Button
              onPress={() => {
                deletePhysical(savedRecording.val)
                remove(savedRecording.key).then(() => console.log("delete!"))
              }}
              title="delete"
            />
          </View>
        )
      })
    }

    return (
      <View testID="RecordScreen" style={FULL}>
        <View>{getRecordingFromLocalStorage()}</View>
      </View>
    )
  },
)
