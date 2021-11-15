import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button, Dimensions } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons';
import { LinePartition } from "../components";
const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
import {
  theme
} from "../components/core/theme";

function Profile({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      image:
        "https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      image:
        "https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      image:
        "https://icdn.dantri.com.vn/thumb_w/640/2019/03/06/nhiepanhgia-2-1551849137024.jpg",
    },
  ];
  const onFollow = () => { };
  const onUnfollow = () => { };

  const onLogout = () => { };
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>BaloGram</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="md-search-outline" style={styles.icon} />
          <Ionicons name="settings-outline" style={styles.icon} onPress={() => navigation.navigate('SettingScreen')} />
        </View>
      </View>
      <LinePartition color={theme.colors.silver} />
      <View>
        <Image
          style={styles.background}
          source={{
            uri: "https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg",
          }}
        />
        
          <View style = {styles.avatar}>
          <Avatar.Image
            size={115}
            source={{
              uri: "https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg",
            }}
            style = {{position:'absolute' }}
          />
          </View>
        
      </View>

      <View style={styles.containerInfo}>
        <Text style={{ fontSize: 26, textAlign: "center" }}> Minh Tuấn </Text>
        <Text style={{ color: "#2F80ED", textAlign: "center" ,fontSize : 15,opacity: .8,marginTop:5}}>
          {" "}
          Giới thiệu về bản thân{" "}
        </Text>
        <View  style = {{flexDirection:'row'}}>
          <Avatar.Image
            size={40}
            source={{
              uri: "https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg",
            }}
          />
          <TextInput label="Bạn đang nghĩ gì ?"  />
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer:
  {
    position: 'absolute',
    width: width,
    zIndex: 5,
    paddingHorizontal: 20,
    top: height * 0.15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
    top: height * 0.08
  },
  background: {
    height: 150,
    position: "relative",
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    color: theme.colors.logo
  },
  icon: {
    fontSize: 25,
    marginRight: 15
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGallery: {
    flex: 1,
    marginTop : 50
  },
  containerImage: {
    flex: 1 / 3,
    margin: 2,
    borderRadius: 5,
    borderWidth: 1
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
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
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

export default Profile;