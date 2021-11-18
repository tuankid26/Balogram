import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  Dimensions,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { LinePartition } from "../components";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
import { theme } from "../components/core/theme";

export default function Profile({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  const onFollow = () => {};
  const onUnfollow = () => {};

  const onLogout = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>BaloGram</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="md-search-outline" style={styles.icon} />
          <Ionicons
            name="settings-outline"
            style={styles.icon}
            onPress={() => navigation.navigate("SettingScreen")}
          />
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

        <View style={styles.avatar}>
          <Avatar.Image
            size={120}
            source={{
              uri: "https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg",
            }}
            style={{ position: "absolute" }}
          />
        </View>
      </View>

      <View style={styles.containerInfo}>
        <Text style={{ fontSize: 28, textAlign: "center", fontWeight: "500" }}>
          {" "}
          Minh Tuấn{" "}
        </Text>
        <Text style={styles.intro}> Giới thiệu về bản thân </Text>
      </View>
      <View style={styles.containerGallery}>
        <View style={styles.containerStatus} >
          <Text style = {styles.status} onPress={() => navigation.navigate('NewPostScreen')}>Bạn đang nghĩ gì ? </Text>
          <Ionicons name="images" style={styles.iconImage} onPress={() => navigation.navigate('NewPostScreen')}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
    top: height * 0.08,
  },
  background: {
    height: 150,
    position: "relative",
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    color: theme.colors.logo,
  },
  icon: {
    fontSize: 25,
    marginRight: 15,
  },
  iconImage: {
    fontSize: 30,
    padding : 6,
    color : '#2FDD92',
    marginLeft : 15
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerGallery: {
    flex: 1,
    marginTop: 50,
    
  },
  containerStatus: {
    flexDirection: "row",
    backgroundColor: "white",
    marginLeft: 20 , 
    marginRight : 8 ,
    height : 43 ,
    justifyContent :'space-evenly'
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  headerBar: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },

  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  status: {
    marginTop: 5,
    fontSize : 22,
    fontWeight : '400',
    color : '#787A91',
    flex : 4/5,
    borderRightWidth : 0.5 ,
    borderRightColor : '#787A91'
  },
  intro: {
    color: "#2F80ED",
    textAlign: "center",
    fontSize: 15,
    opacity: 0.8,
    marginTop: 5,
  },
});


