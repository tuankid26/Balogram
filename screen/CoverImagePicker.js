import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Button, Text, Image, Icon } from 'react-native-elements';
import { ImageHelper } from '../helpers';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'react-native';
const { width } = Dimensions.get('window')
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from 'react-redux';
import {profile} from '../handle_api';
const Header = props => {

  const Item = Picker.Item;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <Icon
        name='close'
        type='antdesign'

        iconStyle={{
          marginLeft: 10,
        }}
        onPress={props.handleBack}
      />

      <View style={{ width: 200 }}>
        <Picker
          mode='dropdown'
          selectedValue={props.selectedAlbum}
          onValueChange={props.handleAlbumSelected}
          style={{ marginRight: 40 }}>
          {
            props.albumNames.map((album, idx) => {
              return (
                <Item key={idx} label={album} value={album} />
              );
            })
          }
        </Picker>
      </View>

      <Icon
            type='antdesign'
            name='camera'
            size={28}
            iconStyle={{ marginRight: 20 }}
            onPress={props.handleLaunchCamera}
          />
    </View>
  );
};


const MediaItem = props => {
  const item = props.item;

  return (

    <TouchableOpacity
      style={{ position: 'relative' }}
      onPress={() => props.handleItemSelected(item)}
    >
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.image}
      />
    </TouchableOpacity>

  )
};


const Content = props => {

  return (
    <FlatList
      columnWrapperStyle={{
        flexWrap: 'wrap',
        width: '100%',
      }}
      data={props.albumAssets}
      renderItem={({ item }) =>
        <MediaItem
          item={item}
          handleItemSelected={props.handleItemSelected}
        />
      }
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  )
};

const CoverImagePicker = ({ navigation }) => {
  const albumNames = ['Camera', 'Screenshots', 'Instagram', 'Zalo', 'Facebook'];
  const [selectedAlbum, setSelectedAlbum] = useState(albumNames[0]);
  const [albumAssets, setAlbumAssets] = useState([]);
  const token = useSelector(state => state.authReducer.token);
  useEffect(() => {
    const fetchAlbumAssets = async (albumName) => {
      const albumAssets = await fetchAllAssetsInAlbum(albumName);
      setAlbumAssets(albumAssets);
    }
    fetchAlbumAssets(selectedAlbum);
  }, [selectedAlbum]);

  const fetchAllAssetsInAlbum = async (albumName) => {

    let albumAssets = [];

    try {
      const album = await ImageHelper.getAlbum(albumName);
      albumAssets = await ImageHelper.getAssetsInAlbum(album);

    } catch (err) {
      console.log(err);
    }
    return albumAssets.assets;
  }


  const handleBack = () => {
    navigation.goBack();
  }

  const handleAlbumSelected = (album) => setSelectedAlbum(album);

  const handleItemSelected = async (item) => {
    const result = await ImageHelper.resizeImage(item, 720);
    item.uri = result.uri;
    item.mediaType = "photo";
    const items = [item];
    const convertAvatarAssets = await convertToBase64(items);
    const base64Avatar = convertAvatarAssets[0];
    const data = {
      token: token,
      coverImage: base64Avatar
    }

    try {
      const res = await profile.setCoverImageUser(data);
    } catch (err) {
      const errMsg = err.response ? err.response.message : "Error occured!";
    }
    navigation.navigate("MainScreen");
    
    
  };

  const handleSend = () => {
    navigation.goBack();
  }


  const handleLaunchCamera = async () => {
    const result = await ImageHelper.launchCamera();
    // console.log(result)

    // if (!result.cancelled) {
    //   console.log(result.uri);
    // }
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


  return (
    <View style={styles.container}>
      <Header
        albumNames={albumNames}
        selectedAlbum={selectedAlbum}
        handleBack={handleBack}
        handleSend={handleSend}
        handleAlbumSelected={handleAlbumSelected}
        handleLaunchCamera={handleLaunchCamera}
      />

      <Content
        albumAssets={albumAssets}
        handleItemSelected={handleItemSelected}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 10,
  },
  image: {
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
    // marginRight: 2,
  },
  selectedImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 13,
    color: '#FFFFFF'
  },
  selected: {
    position: 'absolute',
    top: 2,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


CoverImagePicker.propTypes = {

};

export default CoverImagePicker;