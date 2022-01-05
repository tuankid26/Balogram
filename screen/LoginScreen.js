import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'
import {
  Background,
  Title,
  TextInput,
  Button,
}
  from '../components'
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../handle_api';
export default function LoginScreen({ navigation }) {
  const [phonenumber, setPhonenumber] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const onLoginPressed = () => {
    const data = {
      // phonenumber: phonenumber,
      // password: password
      phonenumber: "000002",
      password: "123123123"
    }

    auth.login(data)
      .then(res => {
        const token = res.data.token;
        const id = res.data.data._id
        const info = {
          gender: res.data.data.gender,
          birthday: res.data.data.birthday,
          address: res.data.data.address,
          description: res.data.data.description,
          username: res.data.data.username,
          userId: res.data.data._id,
          avatar: res.data.data.avatar,
          coverimage: res.data.data.coverimage
        }
        // call dispatch to store token
        dispatch({ type: 'STORE_TOKEN', payload: token })
        dispatch({ type: 'STORE_ID', payload: id })
        dispatch({ type: 'STORE_INFO', payload: info })
        Toast.show({
          type: 'success',
          text1: 'Đăng nhập thành công'
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainScreen' }],
        })
      })
      .catch(error => {
        
        Toast.show({
          type: 'error',
          text1: 'Tài khoản hoặc mật khẩu không chính xác'
        });
        console.log(error)
        // setPassword({ value: '', error: '' })
      })
  }

  return (
    <Background>
      <Toast />
      <Title>BaloGram</Title>
      <TextInput
        label="Số điện thoại"
        returnKeyType="next"
        value={phonenumber}
        onChangeText={(text) => setPhonenumber(text)}
        // error={!!phonenumber.error}
        // errorText={phonenumber.error}
        autoCapitalize="none"
      // autoCompleteType="phonenumber"
      // textContentType="phonenumber"
      // keyboardType="phonenumber"
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        // error={!!password.error}
        // errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPasswordScreen')}
        >
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} style={styles.button}>
        Đăng nhập
      </Button>
      <View style={styles.row}>
        <Text>Người dùng mới? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Đăng kí ngay</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.link,
  },
  button: {
    backgroundColor: theme.colors.button
  }
})