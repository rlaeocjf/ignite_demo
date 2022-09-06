import React, { FC, useContext, useState } from "react"
import { Alert, Image, ImageBackground, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../../components"
import { AuthContext, NavigatorParamList } from "../../navigators"
import auth from "@react-native-firebase/auth"
import styled from "styled-components/native"

const FULL: ViewStyle = {
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
      // auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then((userCredential) => {
      //     const user = userCredential.user
      //     user
      //       .getIdToken(false)
      //       .then((data) => {
      //         console.log(data)
      //         signIn({ refreshToken: data })
      //       })
      //       .catch((err) => console.log(err))
      //   })
      //   .catch((error) => {
      //     const alertMessage = errorMessages[error.code]
      //       ? errorMessages[error.code]
      //       : "알 수 없는 이유로 로그인에 실패했습니다."
      //     console.log(error.code)
      //     Alert.alert("로그인 실패", alertMessage)
      //   })
      signIn({ refreshToken: "temp" })
    }

    return (
      <View testID="LoginScreen" style={FULL}>
        <Container preset="fixed">
          <LogoImage source={require("../../../assets/logo/logo2.jpeg")} />
          <InputWrap>
            <WelcomeWrap>
              <WelcomeText text="Welcome back" size={30} color={"#000"} />
              <WelcomeText text="Welcome back! Please enter your details." marginTop={10} />
            </WelcomeWrap>
            <LabelText>Email</LabelText>
            <EmailInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <LabelText marginTop={20}>Password</LabelText>
            <PasswordInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <SigninBtn text="login" onPress={handleSignIn} />
            <SignupWrap>
              <SignupText text="Don't have an account?" marginRight={10} />
              <SignupText text="Sign up" color={"#2999fe"} onPress={() => console.log(123)} />
            </SignupWrap>
          </InputWrap>
        </Container>
      </View>
    )
  },
)

const Container = styled(Screen)`
  flex: 1;
  padding: 20px;
`
const InputWrap = styled.View`
  flex: 5;
`
const LogoImage = styled(Image)`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`
const EmailInput = styled.TextInput`
  border-radius: 7px;
  padding: 10px;
  border: 1px solid #e5e5e8;
`
const PasswordInput = styled.TextInput`
  border-radius: 7px;
  padding: 10px;
  border: 1px solid #e5e5e8;
`
const SignupWrap = styled.View`
  margin-top: 40px;
  justify-content: center;
  flex-direction: row;
`
const LabelText = styled.Text<{ marginTop?: number }>`
  font-weight: 500;
  text-align: left;
  margin-bottom: 5px;
  ${({ marginTop }) => marginTop && `margin-top:${marginTop}px`}
`
const SigninBtn = styled(Button)`
  margin-top: 20px;
  padding: 12px;
  border-radius: 7px;
  background-color: #2999fe;
`
const SignupText = styled(Text)<{ marginRight?: number; color?: string }>`
  font-size: 15px;
  ${({ marginRight }) => marginRight && `margin-right:${marginRight}px`}
  color: ${({ color }) => (color ? `${color}` : "#adb1b6")};
`
const WelcomeWrap = styled.View`
  margin: 10px 0px 30px 0;
  justify-content: center;
  align-items: center;
`
const WelcomeText = styled(Text)<{
  marginTop?: number
  color?: string
  size?: number
  weight?: number
}>`
  font-size: ${({ size }) => (size ? `${size}px` : "15px")};
  font-weight: ${({ weight }) => (weight ? `${weight}` : "400")};
  ${({ marginTop }) => marginTop && `margin-top:${marginTop}px`}
  color: ${({ color }) => (color ? `${color}` : "#adb1b6")};
`
