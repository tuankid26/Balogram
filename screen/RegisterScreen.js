
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'

import {
  Background,
  Title,
  TextInput,
  Button,
  BackButton
}
  from '../components'

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onRegisterPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'NewPostScreen' }],
    })
  }

  return (
    <Background>

      <BackButton goBack={navigation.goBack} />
      <Title>BaloGram</Title>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
      />
      <TextInput
        label="Phone number"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
      // error={!!email.error}
      // errorText={email.error}
      // autoCapitalize="none"
      // autoCompleteType="email"
      // textContentType="emailAddress"
      // keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onRegisterPressed} style={styles.button}>
        Register
      </Button>
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