import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Image, Button, TouchableOpacity  } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'
import anh1 from '../images/Store_local_image/anh1.jpg'
import anh2 from '../images/Store_local_image/anh2.jpg'
import anh3 from '../images/Store_local_image/anh3.jpg'
import anh4 from '../images/Store_local_image/anh4.jpg'
import anh5 from '../images/Store_local_image/anh5.jpg'
import anh6 from '../images/Store_local_image/anh6.png'
import CamImage from '../images/came.png'
import { Icon } from 'react-native-elements'

import {
  BackButton,
  TextInput
} from '../components'

import {post} from "../handle_api";
import {token} from "../handle_api/token"

export default function NewPostScreen({ navigation }) {
  const [status, setStatus] = useState("")

  const upLoad = () => {
    const data = {
      token: token,
      described: status,
      imagePath: imagePath_url
    }
    post.addPost(data)
    .then(res => {
      console.log(res.data);
  })
    .catch(error => {
      console.log("Failed");
      console.log(error.response.data);
  })

  
  

  navigation.navigate("MainScreen");
  }
  const addImage = () => {
    navigation.navigate("MediaPicker");
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <BackButton goBack={navigation.goBack} />
        </View>
        <View style={styles.headerRight}>
          {/* <Text style={styles.dang}>Đăng</Text> */}
          <Button title="Đăng" style={styles.upload}
          onPress={upLoad}
          />
        </View>
      </View>
      <Text style={styles.tus}>Bạn đang nghĩ gì?</Text>
      <TextInput style={styles.status}
        placeholder="Trạng thái của bạn"
        returnKeyType="next"
        // value={status}
        onChangeText={setStatus}
        multiline={true}
        numberOfLines={5}
      />
      <Icon name="image" type="MaterialIcons" size={40} color={theme.colors.button} onPress={addImage} />
    </View >
  )
}

const styles = StyleSheet.create({
  upload:{
   fontSize: 40,
   fontWeight: 'bold',
   marginLeft: 20
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
    // justifyContent: 'flex-end',
    // flexDirection: 'row',
    marginRight: 10
  },
})