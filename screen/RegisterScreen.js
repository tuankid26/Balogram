import React, { useState } from "react";
<<<<<<< HEAD
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../components/core/theme";
import axios from 'axios';
=======
import { StyleSheet, View } from "react-native";
import { theme } from "../components/core/theme";
>>>>>>> develop
import {
  Background,
  Title,
  TextInput,
  Button,
  BackButton,
} from "../components";
import Toast from 'react-native-toast-message';
<<<<<<< HEAD
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
=======
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
>>>>>>> develop
        text1: 'Mật khẩu phải lớn hơn 6 kí tự'
      });
    }
    else {
<<<<<<< HEAD
    axios.post ('http://localhost:8000/api/v1/users/register',data , {headers:{"Content-Type" : "application/json"}})
      .then (res => {
        console.log(res);
        if (res.statusText == 'Created') {
=======
      auth.register(data)
        .then(res => {
          console.log(res);
          Toast.show({
            type: 'success',
            text1: 'Đăng ký thành công'
          });
>>>>>>> develop
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
<<<<<<< HEAD
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
=======
        })
        .catch(error => {
          console.log(error.response.data)
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
>>>>>>> develop
      <Title>BaloGram</Title>
      <TextInput
        label="Họ và tên"
        returnKeyType="next"
<<<<<<< HEAD
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
=======
        value={username}
        onChangeText={(text) => setUsername(text)}
>>>>>>> develop
      />
      <TextInput
        label="Số điện thoại"
        returnKeyType="next"
<<<<<<< HEAD
        value={phonenumber.value}
        onChangeText={(text) => setPhonenumber({ value: text, error: "" })}
        // error={!!email.error}
        // errorText={email.error}
        // autoCapitalize="none"
        // autoCompleteType="email"
        // textContentType="emailAddress"
        // keyboardType="email-address"
=======
        value={phonenumber}
        onChangeText={(text) => setPhonenumber(text)}
      // error={!!email.error}
      // errorText={email.error}
      // autoCapitalize="none"
      // autoCompleteType="email"
      // textContentType="emailAddress"
      // keyboardType="email-address"
>>>>>>> develop
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
<<<<<<< HEAD
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
=======
        value={password}
        onChangeText={(text) => setPassword(text)}
        // error={!!password}
        // errorText={password}
>>>>>>> develop
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
<<<<<<< HEAD
});
=======
});
>>>>>>> develop
