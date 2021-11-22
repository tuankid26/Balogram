import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Button, TouchableOpacity  } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'
import { Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { mediaActions } from '../redux/actions';
import * as FileSystem from 'expo-file-system';


import {
  BackButton,
  TextInput
} from '../components'

import {post} from "../handle_api";
import {token} from "../handle_api/token"

export default function NewPostScreen({ navigation }) {
  const [status, setStatus] = useState("")

  const selectedAssets = useSelector(state => state.media.selectedAssets);
  const dispatch = useDispatch();

  const upLoad = async () => {

    const imageAssets = selectedAssets.filter(asset => asset.mediaType === 'photo');
    const videoAssets = selectedAssets.filter(asset => asset.mediaType === 'video');
    
    const convertedImageAssets = await convertToBase64(imageAssets);
    const convertedVideoAssets = await convertToBase64(videoAssets);
    
    const data = {
      token: token,
      described: status,
      images: convertedImageAssets,
      videos: convertedVideoAssets
    }

    post.addPost(data)
    .then(res => {
      console.log(res.data);
    })
      .catch(error => {
        console.log("Failed");
        console.log(error.response.data);
    })
  dispatch(mediaActions.resetState());

  navigation.navigate("MainScreen");

  }


  const convertToBase64 = async (assets) => {
    const mimeTypes = assets.map(asset => {
        const fileName = asset.filename;
        const mediaType = asset.mediaType === 'photo' ? 'image' : 'video';
        let extension = fileName.split('.')[1];
        if (extension === 'jpg') {
            extension = 'jpeg';
        }

        return `${mediaType}/${extension}`;
    });

    const assetPromises = assets.map(asset => FileSystem.readAsStringAsync(asset.uri, { encoding: FileSystem.EncodingType.Base64 }));
    const convertedAssets = await Promise.all(assetPromises);

    const base64Assets = convertedAssets.map((asset, idx) => formatIntoBase64String(asset, mimeTypes[idx]));
    return base64Assets;
}

const formatIntoBase64String = (data, mediaType) => {
    return `data:${mediaType};base64,${data}`;
}

  useEffect(() => {
    // console.log(selectedAssets.length);
    // console.log("Dataaaa");
    // // for (let item of selectedAssets) {
    // //   console.log(item.uri);
    // // }
    // console.log(selectedAssets[0].uri);

  });

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
      {/* Render Image from Gallery */}

      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={3}
          data={selectedAssets}
          renderItem={({ item }) => (
              <View>
              <TouchableOpacity>
              <Image style={styles.image} source={{uri: item.uri}} />
              </TouchableOpacity>
              </View>
          )
        }/>
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