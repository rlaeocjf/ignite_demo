import { Platform } from 'react-native';
import Sound from "react-native-sound"

Sound.setCategory("Playback")
export const playback = new Sound(
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
            playback.getDuration() +
            "number of channels: " +
            playback.getNumberOfChannels(),
        )

        // Play the sound with an onEnd callback
        playback.play((success) => {
            if (success) {
                console.log("successfully finished playing")
            } else {
                console.log("playback failed due to audio decoding errors")
            }
        })
    },
)
// Reduce the volume by half
// playback.setVolume(0.5)

// Position the sound to the full right in a stereo field
// playback.setPan(1)

// Loop indefinitely until stop() is called
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

// playback.play()

// BackgroundTimer.setTimeout(() => {
//     // playback.release()
//     playback.play()
// }, 3000)