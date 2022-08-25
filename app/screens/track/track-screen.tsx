import React, { FC } from "react"
import { View, ViewStyle, Platform } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { GradientBackground, Screen, Text } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color } from "../../theme"
import TrackPlayer from "react-native-track-player"
import { PlaybackService } from "./src/services"
import BackgroundTimer from "react-native-background-timer"
import Sound from "react-native-sound"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

export const TrackScreen: FC<StackScreenProps<NavigatorParamList, "track">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

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

    Sound.setCategory("Playback")
    const whoosh = new Sound(
      require("../../../assets/ringtones/walk_in_the_forest.mp3"),
      Platform.OS === "android" && Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("failed to load the sound", error)
          return
        }
        // loaded successfully
        console.log(
          "duration in seconds: " +
            whoosh.getDuration() +
            "number of channels: " +
            whoosh.getNumberOfChannels(),
        )

        // Play the sound with an onEnd callback
        whoosh.play((success) => {
          if (success) {
            console.log("successfully finished playing")
          } else {
            console.log("playback failed due to audio decoding errors")
          }
        })
      },
    )
    // Reduce the volume by half
    whoosh.setVolume(0.5)

    // Position the sound to the full right in a stereo field
    whoosh.setPan(1)

    // Loop indefinitely until stop() is called
    whoosh.setNumberOfLoops(-1)

    // Get properties of the player instance
    // console.log("volume: " + whoosh.getVolume())
    // console.log("pan: " + whoosh.getPan())
    // console.log("loops: " + whoosh.getNumberOfLoops())

    // // Seek to a specific point in seconds
    // whoosh.setCurrentTime(2.5)

    // // Get the current playback point in seconds
    // whoosh.getCurrentTime((seconds) => console.log("at " + seconds))

    // // Pause the sound
    // whoosh.pause()

    // // Stop the sound and rewind to the beginning
    // whoosh.stop(() => {
    //   // Note: If you want to play a sound after stopping and rewinding it,
    //   // it is important to call play() in a callback.
    //   whoosh.play()
    // })

    // const soundEnd = new Sound(
    //   require("../../../assets/ringtones/walk_in_the_forest.mp3"),
    //   Sound.MAIN_BUNDLE,
    // )

    BackgroundTimer.setTimeout(() => {
      // whoosh.release()
      whoosh.play()
    }, 3000)

    return (
      <View testID="SnoozeScreen" style={FULL}>
        <GradientBackground colors={["#81a1c9", "#426b9c"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text text="트랙22" />
          </View>
        </Screen>
      </View>
    )
  },
)
