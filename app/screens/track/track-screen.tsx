import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, Platform } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, GradientBackground, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import BackgroundTimer from "react-native-background-timer"
import Sound from "react-native-sound"
import { Audio } from "expo-av"
import { Recording } from "expo-av/build/Audio"
import { saveString } from "../../utils/storage"
import { playback } from "../../components/playback/playback"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

export const TrackScreen: FC<StackScreenProps<NavigatorParamList, "track">> = observer(
  ({ navigation }) => {
    console.log("track")
    const goBack = () => navigation.goBack()

    const [recording, setRecording] = useState<Recording>()

    // const start = async () => {
    //   // Set up the player
    //   await TrackPlayer.setupPlayer()
    //   TrackPlayer.registerPlaybackService(() => PlaybackService)
    //   await TrackPlayer.updateOptions({
    //     stoppingAppPausesPlayback: true,
    //   })

    //   // Add a track to the queue
    //   await TrackPlayer.add({
    //     id: "trackId",
    //     url: require("../../../assets/ringtones/walk_in_the_forest.mp3"),
    //     title: "Track Title",
    //     artist: "Track Artist",
    //     // artwork: require("track.png"),
    //   })

    //   // Start playing it
    //   await TrackPlayer.play()
    // }

    const startRecording = async () => {
      try {
        // console.log("Requesting permissions..")
        const permission = await Audio.requestPermissionsAsync()
        // console.log(permission)
        if (permission.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            // 백그라운드 모드에서 녹음 할때..
            staysActiveInBackground: true,
          })
          // console.log("Starting recording..")
          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY,
          )
          setRecording(recording)
          // console.log("Recording started")
        } else {
          // console.log("please grant permission to app to access microphone")
        }
      } catch (err) {
        console.log(err)
      }
    }

    const stopRecording = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        // 백그라운드 모드에서 녹음 할때..
        staysActiveInBackground: true,
      })
      if (!recording) return
      // console.log("Stopping recording..")
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      console.log("Recording stopped and stored at", uri)
      const { status } = await recording.createNewLoadedSoundAsync()
      if (status.isLoaded) {
        // console.log(recording.getURI())
        saveString(`recording_${new Date().getTime()}`, recording.getURI())
      }
    }
    const changeAudioMode = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })
    }

    // Sound.setCategory("Playback")
    // const playback = new Sound(
    //   require("../../../assets/ringtones/walk_in_the_forest.mp3"),
    //   Platform.OS === "android" && Sound.MAIN_BUNDLE,
    //   (error) => {
    //     if (error) {
    //       console.log("failed to load the sound", error)
    //       return
    //     }
    //     // loaded successfully
    //     console.log(
    //       "duration in seconds: " +
    //         playback.getDuration() +
    //         "number of channels: " +
    //         playback.getNumberOfChannels(),
    //     )

    //     // Play the sound with an onEnd callback
    //     playback.play((success) => {
    //       if (success) {
    //         console.log("successfully finished playing")
    //       } else {
    //         console.log("playback failed due to audio decoding errors")
    //       }
    //     })
    //   },
    // )
    // // Reduce the volume by half
    // playback.setVolume(0.5)

    // // Position the sound to the full right in a stereo field
    // playback.setPan(1)

    // // Loop indefinitely until stop() is called
    // playback.setNumberOfLoops(-1)

    // Get properties of the player instance
    // console.log("volume: " + playback.getVolume())
    // console.log("pan: " + playback.getPan())
    // console.log("loops: " + playback.getNumberOfLoops())

    // // Seek to a specific point in seconds
    // playback.setCurrentTime(2.5)

    // // Get the current playback point in seconds
    // playback.getCurrentTime((seconds) => console.log("at " + seconds))

    // // Pause the sound
    // playback.pause()

    // // Stop the sound and rewind to the beginning
    // playback.stop(() => {
    //   // Note: If you want to play a sound after stopping and rewinding it,
    //   // it is important to call play() in a callback.
    //   playback.play()
    // })

    // const soundEnd = new Sound(
    //   require("../../../assets/ringtones/walk_in_the_forest.mp3"),
    //   Sound.MAIN_BUNDLE,
    // )
    const player = playback
    // startRecording()
    BackgroundTimer.setTimeout(() => {
      changeAudioMode()
        .then(() => {
          console.log("then")
          if (player.isLoaded() && !player.isPlaying()) {
            player.play()
          }
        })
        .catch((err) => {
          console.log("catch")
          console.log(err)
        })
    }, 5000)

    return (
      <View testID="SnoozeScreen" style={FULL}>
        <GradientBackground colors={["#81a1c9", "#426b9c"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text text="테스트33" />
          </View>
          <Button
            text="stop"
            onPress={() => {
              console.log(player.isPlaying())
              stopRecording()
              player.stop()
            }}
          />
        </Screen>
      </View>
    )
  },
)
