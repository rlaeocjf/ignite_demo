import React, { useEffect, FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Audio } from "expo-av"
import { load, saveString } from "../../utils/storage"
import BackgroundTimer from "react-native-background-timer"
import { Recording, Sound } from "expo-av/build/Audio"
import { AlarmCheck } from "../../components/time/time.alarm.checker"
import Alarm from "./components/alarm"
import Sleep from "./components/sleep"

const FULL: ViewStyle = {
  flex: 1,
}

export const SleepScreen: FC<StackScreenProps<NavigatorParamList, "sleep">> = observer(
  ({ navigation }) => {
    console.log("sleep")
    const [alarm, setAlarm] = useState<string>()
    const [reachTime, setReachTime] = useState<boolean>(false)
    const [recording, setRecording] = useState<Recording>()
    const [playback, setPlayback] = useState<Sound>()

    const startRecording = async () => {
      try {
        console.log("Requesting permissions..")
        const permission = await Audio.requestPermissionsAsync()
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
          console.log("please grant permission to app to access microphone")
        }
      } catch (err) {
        console.log(err)
      }
    }

    const stopRecording = async () => {
      if (!recording) return
      // console.log("Stopping recording..")
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      console.log("Recording stopped and stored at", uri)
      const { status } = await recording.createNewLoadedSoundAsync()
      if (status.isLoaded) {
        console.log(recording.getURI())
        saveString(`recording_${new Date().getTime()}`, recording.getURI())
      }
    }

    useEffect(() => {
      // 녹음 시작
      startRecording()
      // 사용자 알람시간이 있으면 background timer를 이용하여 알람을 작동 시킨다
      let timeout: number
      load("alarm").then((data) => {
        if (data && data.time) {
          setAlarm(data.time)
          const diff = AlarmCheck(data.time)
          timeout = BackgroundTimer.setTimeout(() => {
            setReachTime(true)
            playSound()
          }, diff)
        }
      })
      return () => {
        // 알람시간 클리어
        clearTime(timeout)
      }
    }, [])

    const clearTime = (timer: number) => {
      BackgroundTimer.clearTimeout(timer)
    }

    const playSound = async () => {
      console.log("Loading Sound")
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      })
      const { sound, status } = await Audio.Sound.createAsync(
        require("../../../assets/ringtones/walk_in_the_forest.mp3"),
      )
      if (status.isLoaded) {
        setPlayback(sound)
        sound.setIsLoopingAsync(true)
        sound.setVolumeAsync(1.0)
        await sound.playAsync()
      }
    }

    const stopSound = async () => {
      if (playback && playback.stopAsync) {
        await playback.stopAsync()
      }
    }
    const onRenderLeftActions = () => {
      return <View style={{ width: "100%" }}></View>
    }

    const renderSleep = () => {
      return (
        <Sleep
          alarm={alarm}
          stopRecording={stopRecording}
          onRenderLeftActions={onRenderLeftActions}
          goBack={navigation.goBack}
        />
      )
    }

    const renderAlarm = () => {
      return (
        <Alarm
          alarm={alarm}
          stopRecording={stopRecording}
          stopSound={stopSound}
          onRenderLeftActions={onRenderLeftActions}
          goBack={navigation.goBack}
        />
      )
    }
    return (
      <View testID="SleepScreen" style={FULL}>
        {reachTime ? renderAlarm() : renderSleep()}
      </View>
    )
  },
)
