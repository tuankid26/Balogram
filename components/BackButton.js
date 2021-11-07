import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { FontAwesome } from 'react-native-vector-icons';
export default function BackButton({ goBack }) {

  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <FontAwesome name='arrow-left' style={styles.icon}></FontAwesome>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    left: 8,
  },
  icon: {
    fontSize: 25
  },
})