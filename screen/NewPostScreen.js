import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Button, TouchableOpacity, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'
import { Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { mediaActions, uploadActions } from '../redux/actions';
import * as FileSystem from 'expo-file-system';
import {MaterialDesignIcons} from 'react-native-vector-icons'

import {
  BackButton,
  TextInput
} from '../components'

import { post } from "../handle_api";

export default function NewPostScreen({ navigation }) {
  const [status, setStatus] = useState("")

  const selectedAssets = useSelector(state => state.media.selectedAssets);
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const upLoad = async () => {
    dispatch(uploadActions.uploading());
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

    try {
      const res = await post.addPost(data);
      dispatch(uploadActions.uploadSuccess(res.data.data));
    } catch (err) {
      const errMsg = err.response ? err.response.message : "Error occured!";
      dispatch(uploadActions.uploadFailure(errMsg));
    }
    dispatch(mediaActions.resetState());

    navigation.navigate("MainScreen");

  }
  const goBack = () => {
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

  const addImage = () => {
    navigation.navigate("MediaPicker");
  }
  const handleRemoveAsset = (asset) => {
    dispatch(mediaActions.removeAsset(asset));
  }

  return (
    <View style={{ flex: 1,backgroundColor:'white' }}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <BackButton goBack={goBack} />
        </View>
        <View style={styles.headerRight}>
          {/* <Text style={styles.dang}>Đăng</Text> */}
          <Button title="Đăng" style={styles.upload}
            onPress={upLoad}
          />
        </View>
      </View>
      {/* <Text style={styles.tus}>Bạn đang nghĩ gì?</Text> */}
      <TextInput style={styles.status}
        placeholder="Bạn đang nghĩ gì ?"
        returnKeyType="next"
        // value={status}
        onChangeText={setStatus}
        multiline={true}
        numberOfLines={5}
      />
      <View style = {{flexDirection: 'row', marginLeft : 10, alignItems : 'center'}}>
        <Icon name="filter"   type="MaterialIcons" size={35} onPress={addImage} />
        <Text style = {{fontSize : 20, marginLeft :10,}}>Thêm ảnh </Text>
      </View>

      <View style = {{flexDirection: 'row', marginLeft : 10, alignItems : 'center', marginTop : 5}}>
        <Icon name="videocam"   type="MaterialIcons" size={35} color={'#406882'} onPress={addImage} />
        <Text style = {{fontSize : 20, marginLeft :10}}>Thêm Video </Text>
      </View>
      
      {/* Render Image from Gallery */}
     
      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={3}
          data={selectedAssets}
          renderItem={({ item }) => (
            <View>
              <ImageBackground
                source={{ uri: item.uri }}
                style={styles.image}
              >
                <Icon
                  name='close'
                  type='ant-design'
                  size={16}
                  iconStyle={styles.removeIcon}
                  onPress={() => handleRemoveAsset(item)}
                />
              </ImageBackground>
            </View>
          )
          } />
      </View>

    </View >
  )
}

const styles = StyleSheet.create({
  upload: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20
  },
  tus: {
    color: "black",
    fontSize: 25,
    paddingTop: 17,
    textAlign: "center",
    // backgroundColor:'white'
  },
  status: {
    // margin: 7,
    // paddingTop: 7,
    fontSize: 20,
    // borderRadius: 6,
    // height : 250,
    backgroundColor:'white'
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
  removeIcon: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'flex-end'
  },
})