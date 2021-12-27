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



// const MediaItem = props => {
//   const selectedAssets = props.selectedAssets;
//   const item = props.item;

//   const isInSelectedAssets = () => {
//     return selectedAssets.filter(asset => asset.uri === item.uri).length > 0;
//   }

//   const getIndexInSelectedAssets = () => {
//     return selectedAssets.findIndex(asset => asset.uri === item.uri);
//   }

//   return (

//     <TouchableOpacity
//       style={{ position: 'relative' }}
//       onPress={() => props.handleItemSelected(item)}
//     >
//       <Image
//         source={{
//           uri: item.uri,
//         }}
//         style={styles.image}
//       />

//       <View
//         style={[
//           styles.selectedImage,
//           {
//             backgroundColor: isInSelectedAssets()
//               ? 'rgba(255,255,255,0.40);'
//               : 'transparent',
//           },
//         ]}
//       />

//       <View
//         style={[
//           styles.selected,
//           {
//             backgroundColor:
//               isInSelectedAssets()
//                 ? '#0275d8'
//                 : '#292b2c',
//             borderColor: 'white',
//             borderWidth: 2,
//           },
//         ]}
//       >
//         <Text style={styles.text}>
//           {isInSelectedAssets()
//             ? getIndexInSelectedAssets() + 1
//             : ''}
//         </Text>
//       </View>

//     </TouchableOpacity>

//   )
// };



const areEqual = (prevProps, nextProps) => {
  const { item, selectedAssets } = nextProps;
  const { item: prevItem, selectedAssets: prevSelectedAssets } = prevProps;

  if (item !== prevItem) {
    return false;
  }

  const selectedIndex = selectedAssets.findIndex(
    (asset) => asset.uri === item.uri
  );
  const prevSelectedIndex = prevSelectedAssets.findIndex(
    (asset) => asset.uri === item.uri
  );

  return selectedIndex === prevSelectedIndex;
};

const MediaItem = React.memo((props) => {
  const selectedAssets = props.selectedAssets;
  const item = props.item;

  const isInSelectedAssets = () => {
    return selectedAssets.filter((asset) => asset.uri === item.uri).length > 0;
  };

  const getIndexInSelectedAssets = () => {
    return selectedAssets.findIndex((asset) => asset.uri === item.uri);
  };

  return (
    <TouchableOpacity
      style={{ position: "relative" }}
      onPress={() => props.handleItemSelected(item)}
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
            backgroundColor: isInSelectedAssets()
              ? "rgba(255,255,255,0.40);"
              : "transparent",
          },
        ]}
      />

      <View
        style={[
          styles.selected,
          {
            backgroundColor: isInSelectedAssets() ? "#0275d8" : "#292b2c",
            borderColor: "white",
            borderWidth: 2,
          },
        ]}
      >
        <Text style={styles.text}>
          {isInSelectedAssets() ? getIndexInSelectedAssets() + 1 : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}, areEqual);


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
          selectedAssets={props.selectedAssets}
          handleItemSelected={props.handleItemSelected}
        />
      }
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  )
};

const MediaPicker = ({ navigation }) => {
  const albumNames = ['Camera', 'Screenshots', 'Instagram', 'Zalo', 'Facebook'];
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

  const handleItemSelected = async (item) => {
    const result = await ImageHelper.resizeImage(item, 1080);
    item.uri = result.uri;
    // console.log(item);
    if (selectedAssets.indexOf(item) >= 0) {
      dispatch(mediaActions.removeAsset(item))
    } else {
      dispatch(mediaActions.addAsset(item));
    }
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


MediaPicker.propTypes = {

};

export default MediaPicker;