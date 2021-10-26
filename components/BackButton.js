import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  const handleGoBack =() => {
    console.log("going back")
    goBack()
  }
  return (
    <TouchableOpacity onPress={() => handleGoBack()} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../images/icons/backarrow-blue.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})