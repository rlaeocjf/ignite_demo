import React, { FC, useContext, useState } from "react"
import { Alert, TextInput, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Screen } from "../../components"
import { color } from "../../theme"
import { AuthContext, NavigatorParamList } from "../../navigators"
import auth from "@react-native-firebase/auth"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
}
const errorMessages = {
  "auth/email-already-in-use": "이미 가입된 이메일입니다.",
  "auth/wrong-password": "잘못된 비밀번호입니다.",
  "auth/user-not-found": "존재하지 않는 계정입니다.",
  "auth/invalid-email": "유효하지 않은 이메일 주소입니다.",
}

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(
  ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signIn } = useContext(AuthContext)

    // 계정 생성
    const handelSignUp = () => {
      auth()
        .createUserWithEmailAndPassword("jane.doe@example.com", "SuperSecretPassword!")
        .then((userCredential) => {
          console.log("created!")
          console.log(userCredential)
          const user = userCredential.user

          console.log(user)
        })
        .catch((error) => {
          const alertMessage = errorMessages[error.code]
            ? errorMessages[error.code]
            : "알 수 없는 이유로 계정생성에 실패했습니다."
          console.log(error.code)
          Alert.alert("계정생성 실패", alertMessage)
        })
    }
    // 로그인
    const handleSignIn = () => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          signIn(userCredential)
          Alert.alert("로그인 성공", `${user.email}님 환영합니다.`)
        })
        .catch((error) => {
          const alertMessage = errorMessages[error.code]
            ? errorMessages[error.code]
            : "알 수 없는 이유로 로그인에 실패했습니다."
          console.log(error.code)
          Alert.alert("계정생성 실패", alertMessage)
        })
    }

    return (
      <View testID="LoginScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed">
          <View>
            <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <View>
            <Button text="Login" onPress={handleSignIn} />
          </View>
        </Screen>
      </View>
    )
  },
)
