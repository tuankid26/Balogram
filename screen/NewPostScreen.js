import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'
import anh1 from '../images/Store_local_image/anh1.jpg'
import anh2 from '../images/Store_local_image/anh2.jpg'
import anh3 from '../images/Store_local_image/anh3.jpg'
import anh4 from '../images/Store_local_image/anh4.jpg'
import anh5 from '../images/Store_local_image/anh5.jpg'
import anh6 from '../images/Store_local_image/anh6.png'
import CamImage from '../images/came.png'
import {
  BackButton,
  TextInput
} from '../components'

export default function NewPostScreen({ navigation }) {
  const [status, setStatus] = useState("")

  const data = [
    CamImage, anh1, anh2, anh3, anh4, anh5, anh6, anh6, anh6, anh6, anh6, anh6, anh6, anh6, anh6
  ]
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <BackButton goBack={navigation.goBack} />
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.dang}>Đăng</Text>
        </View>
      </View>
      <Text style={styles.tus}>Bạn đang nghĩ gì?</Text>
      <TextInput style={styles.status}
        placeholder="Trạng thái của bạn"
        returnKeyType="next"
        value={status}
        // onChangeText={(text) => setEmail({ value: text, error: '' })}
        multiline={true}
        numberOfLines={5}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={3}
          data={data}
          renderItem={({ item }) => (
            <View>
              <Image style={styles.image} source={item} />
            </View>
          )
          }

        />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  dang: {
    color: "blue",
    fontSize: 25,
  },
  tus: {
    color: "black",
    fontSize: 25,
    paddingTop: 17,
    textAlign: "center",
  },
  status: {
    margin: 7,
    fontSize: 20,
    borderRadius: 6,
  },
  button: {
    backgroundColor: theme.colors.button
  },
  image: {
    width: 115,
    height: 115,
    // resizeMode: 'center',
    margin: 2,
    borderRadius: 7,
  },
  headerBar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },

  headerLeft: {
    flex: 1,
  },
  headerRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
})