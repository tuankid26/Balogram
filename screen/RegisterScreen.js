import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../components/core/theme";
import axios from 'axios';
import {
  Background,
  Title,
  TextInput,
  Button,
  BackButton,
} from "../components";
import Toast from 'react-native-toast-message';
export default function RegisterScreen({ navigation }) {
  const [phonenumber, setPhonenumber] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onRegisterPressed = () => {
    const data = {
      phonenumber: phonenumber.value,
      username: username.value,
      password: password.value,
    };
    if (data.password.length < 6 ) {
      Toast.show({
        type: 'info',
        text1: 'Mật khẩu phải lớn hơn 6 kí tự'
      });
    }
    else {
    axios.post ('http://localhost:8000/api/v1/users/register',data , {headers:{"Content-Type" : "application/json"}})
      .then (res => {
        console.log(res);
        if (res.statusText == 'Created') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
          Toast.show({
            type: 'sucess',
            text1: 'Đăng ký thành công'
          });
        }
      })
    .catch (error => 
      Toast.show({
      type: 'info',
      text1: 'Số điện thoại đã được đăng ký'
    }))
    setUsername ({value:'',error : ''})
    setPhonenumber ({value:'',error : ''})
    setPassword ({value:'',error : ''})
  };}

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Title>BaloGram</Title>
      <TextInput
        label="Họ và tên"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
      />
      <TextInput
        label="Số điện thoại"
        returnKeyType="next"
        value={phonenumber.value}
        onChangeText={(text) => setPhonenumber({ value: text, error: "" })}
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
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onRegisterPressed} style={styles.button}>
        Đăng kí
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
