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
import {
  BackButton,
  TextInput
} from '../components'

import {post} from "../handle_api";
import {token} from "../handle_api/token"

export default function NewPostScreen({ navigation }) {
  const [status, setStatus] = useState("")
  const imagePath_url = "data:image/jpeg;base64,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"
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
  
  // post.convertToBase64(data)
  // .then(res => {
  //   console.log(res);
  // })
  navigation.navigate("MainScreen");
  }

  const data = [
    {
      image: require('../images/came.png'),
      id : 1
    },
    {
      image: require('../images/Store_local_image/anh2.jpg'),
      id : 2
    },
    {
      image: require('../images/Store_local_image/anh3.jpg'),
      id : 3
    },
    {
      image: require('../images/Store_local_image/anh4.jpg'),
      id : 4
    },
    {
      image: require('../images/Store_local_image/anh5.jpg'),
      id : 5
    },
    {
      image: require('../images/Store_local_image/anh6.png'),
      id : 6
    },
    {
      image: require('../images/Store_local_image/anh2.jpg'),
      id : 7
    },
    {
      image: require('../images/Store_local_image/anh2.jpg'),
      id : 8
    },
    {
      image: require('../images/Store_local_image/anh2.jpg'),
      id : 9
    }
    
    
  ]
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
      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={3}
          data={data}
          renderItem={({ item }) => (
              <View>
              <TouchableOpacity>
              <Image style={styles.image} source={item.image} />
              </TouchableOpacity>
              </View>
          )
        }
          keyExtractor={(item) => item.id.toString()}

        />
      </View>
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