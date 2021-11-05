import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
// import { connect } from 'react-redux'

function Profile(props) {
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
  const onFollow = () => {};
  const onUnfollow = () => {};

  const onLogout = () => {};

  // if (user === null) {
  //     return <View />
  // }
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.background}
          source={{
            uri: "https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg",
          }}
        />
        <View style={styles.avatar}>
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
        <Text style={{ fontSize: 26, textAlign: "center" ,fontFamily:'montserrat-bold',fontWeight:680}}> Minh Tuấn </Text>
        <Text style={{ color: "#2F80ED", textAlign: "center" , fontFamily:'montserrat-bold',fontWeight:160,fontSize : 15,opacity: .8,marginTop:5}}>
          {" "}
          Giới thiệu về bản thân{" "}
        </Text>
        <View>
          <Avatar.Image
            size={40}
            source={{
              uri: "https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg",
            }}
          />
          <TextInput label="Bạn đang nghĩ gì ?" />
        </View>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={DATA}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
          )}
        />
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
    marginTop: "20%",
  },
  background: {
    height: 150,
    position: "relative",
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

export default Profile;
