import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../components/core/theme";
import {
  Background,
  Title,
  TextInput,
  Button,
  BackButton,
} from "../components";
import Toast from 'react-native-toast-message';
import { auth } from '../handle_api';
export default function RegisterScreen({ navigation }) {
  const [phonenumber, setPhonenumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterPressed = () => {
    const data = {
      phonenumber: phonenumber,
      username: username,
      password: password,
    };
    // console.log(data)
    if (data.password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Mật khẩu phải lớn hơn 6 kí tự'
      });
    }
    else {
      auth.register(data)
        .then(res => {
          console.log(res);
          Toast.show({
            type: 'success',
            text1: 'Đăng ký thành công'
          });
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        })
        .catch(error => {
          console.log(error)
          Toast.show({
            type: 'error',
            text1: 'Số điện thoại đã được đăng ký'
          })
          // Toast.show({
          //   type: 'success',
          //   text1: 'Đăng ký thành công'
          // });
        })
    };
  }

  return (
    <Background>
      <Toast topOffset='80' />
      <View style={styles.buttonContainer}>
        <BackButton goBack={navigation.goBack} />
      </View>
      <Title>BaloGram</Title>
      <TextInput
        label="Họ và tên"
        returnKeyType="next"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        label="Số điện thoại"
        returnKeyType="next"
        value={phonenumber}
        onChangeText={(text) => setPhonenumber(text)}
      // error={!!email.error}
      // errorText={email.error}
      // autoCapitalize="none"
      // autoCompleteType="email"
      // textContentType="emailAddress"
      // keyboardType="email-address"
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        // error={!!password}
        // errorText={password}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onRegisterPressed}
        style={styles.button}
      >
        Register
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 70,
    marginTop: -40
    // justifyContent:'flex-start'
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.link,
  },
  button: {
    backgroundColor: theme.colors.button,
  },
});