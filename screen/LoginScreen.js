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
import { auth } from '../handle_api';
export default function LoginScreen({ navigation }) {
  const [phonenumber, setPhonenumber] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const data = {
      phonenumber: '000123',
      password: '123123123'
    }
    console.log(data.phonenumber)
    auth.login(data.phonenumber, data.password)
      .then(res => {
        console.log(res);
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
        setPassword({ value: '', error: '' })
      })
  }

  return (
    <Background>
      <Toast />
      <Title>BaloGram</Title>
      <TextInput
        label="Số điện thoại"
        returnKeyType="next"
        value={phonenumber.value}
        onChangeText={(text) => setPhonenumber({ value: text, error: '' })}
        error={!!phonenumber.error}
        errorText={phonenumber.error}
        autoCapitalize="none"
        autoCompleteType="phonenumber"
        textContentType="phonenumber"
        keyboardType="phonenumber"
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
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