import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Button, Text, Image, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { mediaActions } from '../redux/actions';
import { ImageHelper } from '../helpers';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'react-native';
const { width } = Dimensions.get('window')
import { useCallback } from 'react';
import * as FileSystem from 'expo-file-system';

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

      {
        props.selectedAssets.length > 0 ?
          <Button
            title='Next'
            containerStyle={{ marginRight: 20 }}
            style={{ marginRight: 20 }}
            onPress={props.handleSend}
          />
          :
          <Icon
            type='antdesign'
            name='camera'
            size={28}
            iconStyle={{ marginRight: 20 }}
            onPress={props.handleLaunchCamera}
          />
      }
    </View>
  );
};

const MediaItem = (props) => {
  const dispatch = useDispatch();
  const selectedAssets = useSelector((state) => state.media.selectedAssets);
  const { item, isSingleSelect } = props;

  const getFileSize = async (fileUri) => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.size;
  };

  const handleItemSelected = useCallback(
    async (item) => {
      const isAlreadySelected =
        selectedAssets.findIndex((asset) => asset.uri == item.uri) >= 0;

      if (isAlreadySelected) {
        dispatch(mediaActions.removeAsset(item));
        return;
      }
      if (item.mediaType == 'video' && fileSize > 10000000) {
        return;
      }
      const fileSize = await getFileSize(item.uri);
      if (isSingleSelect) {
        if (selectedAssets.length == 0 && item.mediaType == 'video') {
          return;
        } else if (selectedAssets.length == 1) {
          return;
        }
      } else if (
        selectedAssets.length == 1 &&
        selectedAssets[0].mediaType == 'video'
      ) {
        return;
      } else if (selectedAssets.length == 4) {
    
        return;
      }
      const result = await ImageHelper.resizeImage(item, 720);
      item.uri = result.uri;
      dispatch(mediaActions.addAsset(item));
    },
    [selectedAssets],
  );

  const getIndexInSelectedAssets = useCallback(() => {
    return selectedAssets.findIndex((asset) => asset.uri === item.uri);
  }, [selectedAssets]);

  return (
    <TouchableOpacity
      style={{ position: 'relative' }}
      onPress={() => handleItemSelected(item)}
    >
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.image}
      />

      <View
        style={[
          styles.selectedImage,
          {
            backgroundColor:
              getIndexInSelectedAssets() > -1
                ? 'rgba(255,255,255,0.40);'
                : 'transparent',
          },
        ]}
      />

      <View
        style={[
          styles.selected,
          {
            backgroundColor:
              getIndexInSelectedAssets() > -1 ? '#0275d8' : '#292b2c',
            borderColor: 'white',
            borderWidth: 2,
          },
        ]}
      >
        {isSingleSelect ? (
          getIndexInSelectedAssets() > -1 && (
            <Icon
              type="font-awesome"
              name="check"
              color="white"
              iconStyle={styles.check}
              size={16}
              style={styles.check}
              containerStyle={{ marginBottom: 2 }}
            />
          )
        ) : (
          <Text style={styles.text}>
            {getIndexInSelectedAssets() > -1
              ? getIndexInSelectedAssets() + 1
              : ''}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const Content = (props) => {
  return (
    <FlatList
      columnWrapperStyle={{
        flexWrap: 'wrap',
        width: '100%',
      }}
      data={props.albumAssets}
      renderItem={({ item }) => (
        <MediaItem
          item={item}
          selectedAssets={props.selectedAssets}
          // handleItemSelected={props.handleItemSelected}
          isSingleSelect={props.isSingleSelect}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

const MediaPicker = ({ navigation }) => {
  const albumNames = ['Camera', 'Screenshots', 'Instagram', 'Zalo', 'Facebook','Movies'];
  const dispatch = useDispatch();
  const [selectedAlbum, setSelectedAlbum] = useState(albumNames[0]);
  const [albumAssets, setAlbumAssets] = useState([]);

  const selectedAssets = useSelector(state => state.media.selectedAssets);

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
    // const listItem = useSelector();
    // console.log(listItem);
    dispatch(mediaActions.resetState());
    navigation.goBack();
  }

  const handleAlbumSelected = (album) => setSelectedAlbum(album);

  const handleSend = () => {
    navigation.goBack();
  }


  const handleLaunchCamera = async () => {
    const result = await ImageHelper.launchCamera();
    let item = {};
    if (!result.cancelled) {
      console.log(result.uri);
      
      item.uri = result.uri;
      item.mediaType = "photo";
      item.filename = "Shot_Image_1001.jpg";
      const resize_item = await ImageHelper.resizeImage(item, 720);
      item.uri = resize_item.uri;
      item.id = "sadasdasdas238128390812903"
      console.log(item);
      dispatch(mediaActions.addAsset(item));

      navigation.goBack();
    }
    
  }


  return (
    <View style={styles.container}>
      <Header
        albumNames={albumNames}
        selectedAssets={selectedAssets}
        selectedAlbum={selectedAlbum}
        handleBack={handleBack}
        handleSend={handleSend}
        handleAlbumSelected={handleAlbumSelected}
        handleLaunchCamera={handleLaunchCamera}
      />

      <Content
        albumAssets={albumAssets}
        selectedAssets={selectedAssets}
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


MediaPicker.propTypes = {

};


export default MediaPicker;