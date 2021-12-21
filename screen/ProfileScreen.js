import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons, Octicons } from 'react-native-vector-icons';
import {
  LinePartition,
  Comment,
  Slider
}
  from '../components'
const { width, height } = Dimensions.get("screen");
import { theme } from "../components/core/theme";
import { useSelector } from 'react-redux';
import { post } from "../handle_api";
import {profile} from "../handle_api";
import {ipServer} from "../handle_api/ipAddressServer";
import DefaultAvatar from '../images/avatar/default-avatar-480.png';
import DefaultCoverImage from "../images/default-cover-6.jpg";
export default function Profile({ navigation }) {
  const [datapost, setDatapost] = useState("");
  const [infoUser, setInfoUser] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const username = useSelector(state => state.infoReducer.username);
  const token = useSelector(state => state.authReducer.token)
  const userId = useSelector(state => state.infoReducer.userId)
  const description = useSelector(state => state.infoReducer.description)
  const [isModalVisible, setModalVisible] = useState(false);
  const [toggleItem, setToggleItem] = useState("");
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setToggleItem(item);
  };
  const toggleDeletePost = () => {
    setModalVisible(!isModalVisible);
    const data = {
      "postId": toggleItem._id,
      "token": token
    }
    post.deletePost(data)
      .then(res => {
      })
      .catch(error => {
        console.log("Failed");
        console.log(error.response.data);
      })
  }
  const toggleEditPost = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate("EditPostScreen", { toggleItem });
  }
  const Profile = () => {
    const info = infoUser;
    // console.log(info);
    return (
      <View style={styles.container}>
        <View>
          {info?
            <Image
            style={styles.background}
            source={{
              uri: `${ipServer}${infoUser.cover_image.fileName}`,
            }}
            />
            :
            <Image
            style={styles.background}
            source={DefaultCoverImage}
            />

          }
          
          <View style={styles.avatar}>
            { info? <Avatar.Image
              size={120}
              source={{
                uri: `${ipServer}${infoUser.avatar.fileName}`,
              }}
              style={{ position: "absolute" }}
            />
            :
            <Avatar.Image
            size={120}
            source={DefaultAvatar}
            style={{ position: "absolute" }}
            />

            }
            
          </View>
        </View>
        <View style={styles.containerInfo}>
          <Text style={{ fontSize: 28, textAlign: "center", fontWeight: "500" }}>
            {" "}
            {username}{" "}
          </Text>
          <Text style={styles.intro}> {description} </Text>
        </View>
        <View style={styles.containerGallery}>
          <View style={styles.containerStatus} >
            <Text style={styles.status} onPress={() => navigation.navigate('NewPostScreen')}>Bạn đang nghĩ gì ? </Text>
            <Ionicons name="images" style={styles.iconImage} onPress={() => navigation.navigate('NewPostScreen')} />
          </View>
        </View>
        <LinePartition color={theme.colors.silver} />
        <View style={{ padding: 5, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 20, backgroundColor: '#BFE5F5', width: 85, borderRadius: 10, paddingLeft: 8 }}>Nhật ký</Text>
        </View>
      </View>
    )
  }
  const fetchPosts = async () => {
    try {
        const dataFeed = await post.getListPost_newfeed(token, userId);
        setDatapost(dataFeed.data.data.reverse());
    } catch (err) {
        console.log(err);
    }
  };

  const fetchUserInfo = async () => {
    const data = {
      token: token
    }

    try {
      
        const info = await profile.showInfoUser(data);
        setInfoUser(info.data.data);
        // console.log(info.data.data);
    } catch (err) {
        console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserInfo();
    
  }, []);



  const splitDateTime = (raw_date) => {
    // 2021-11-14T17:16:51.653Z
    const list_text = raw_date.split(":");
    const l_date_hour = list_text[0].split("T")
    const date = l_date_hour[0];
    const hour_minute = l_date_hour[1] + ":" + list_text[1];
    const new_text = date + " lúc " + hour_minute;
    return new_text;
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchPosts();
    fetchUserInfo();
    wait(500).then(() => setRefreshing(false)
    );
  }, []);
  const onLikePress = (userId, postId) => {
    setDatapost([...datapost].map(object => {
      const isLikeTmp = object.isLike;
      // Handle list like and status liked
      if (object._id === postId) {

        let arrLike = object.like;
        let arrLikeNotContainCurrentUser = arrLike.filter((item) => {
          return item != userId
        });
        if (arrLikeNotContainCurrentUser.length === arrLike.length) {
          arrLike.push(userId);
        } else {
          arrLike = arrLikeNotContainCurrentUser;
        }
        return {
          ...object,
          "isLike": !isLikeTmp,
          "like": arrLike
        }
      }
      else return object;
    }));
    const data = {
      "postId": postId,
      "token": token
    }
    post.actionLikePost(data)
      .then(res => {
      })
      .catch(error => {
        console.log("Failed");
        console.log(error.response.data);
      })
  }
  const onAddPost = () => {
    navigation.navigate('NewPostScreen');
  }
  const onComment = (postId, userId) => {
    navigation.navigate('CommentScreen', { postId: postId, userId: userId });
  }
  const renderItem = (item) => {
    const date_time = splitDateTime(item.updatedAt.toString());

    const num_like = item.like.length;
    const text_like = num_like + " lượt thích";
    const itemIsLike = item.isLike;
    return (
      <View style={styles.containerPost}>
        <View style={styles.containerPostHeader}>
          <View style={styles.containerUser}>
            <Avatar.Image
              size={40}
              rounded
              source={{uri: `${ipServer}${infoUser.avatar.fileName}`}}
              containerStyle={{ marginLeft: 5, marginTop: 5 }}
            />
            <View style={{
              flexDirection: 'column'
            }}>
              <Text style={styles.containerUserName}>{item.author.username}</Text>
              <Text style={styles.containerHour}>
                {date_time}
              </Text>
            </View>
          </View>
          <View style={styles.optionDot}>
            <MaterialCommunityIcons name="dots-vertical" style={styles.dotStyle}
              onPress={() => toggleModal(item)}
            />
          </View>
        </View>
        <View style={styles.containerFeed}>
          <Text style={styles.described}>
            {item.described}
          </Text>
          <View style={styles.containerImage}>
            <Slider
              item={item.images}
              index={0}
            />
          </View>

          <View style={styles.containerReact}>
            <Text style={styles.numberReact}>{text_like}</Text>
            <View style={styles.reactIconBox}>
              <Pressable
                onPress={() => onLikePress(item.userCall, item._id)}
              >
                <MaterialCommunityIcons
                  name={itemIsLike ? "heart" : "heart-outline"}
                  style={styles.reactIcon}
                  color={itemIsLike ? "red" : "black"}
                />
              </Pressable>
              <Octicons name="comment" style={styles.reactIcon}
                onPress={() => onComment(item._id, item.author._id)}
              />
            </View>
            <Text style={styles.comment}
              onPress={() => onComment(item._id)}
            >
              View Comments...
            </Text>
            <Comment postID={item._id} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1 }}
    >
      <Modal
        visible={isModalVisible}
        animationIn='slideInUp'
        transparent={true}
      >
        <View style={styles.modal}>
          <View >
            <Pressable style={styles.button} onPress={toggleEditPost}>
              <Text style={styles.text}>Chỉnh sửa bài đăng</Text>
            </Pressable>
            <LinePartition color={theme.colors.silver} />
            <Pressable style={styles.button} onPress={toggleDeletePost}>
              <Text style={styles.text}>Xóa bài đăng</Text>
            </Pressable>
            <LinePartition color={theme.colors.silver} />
          </View>
        </View>
      </Modal >
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
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={datapost}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id.toString()}
          ListHeaderComponent={Profile} />
      </SafeAreaView>
    </View >
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
    height: 250,
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
    padding: 6,
    color: '#2FDD92',
    marginLeft: 15
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
    height: 43,
    justifyContent: 'space-evenly',
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
    fontSize: 22,
    fontWeight: '400',
    color: '#787A91',
    flex: 4 / 5,
    borderRightWidth: 0.5,
    borderRightColor: '#787A91',
  },
  intro: {
    color: "#2F80ED",
    textAlign: "center",
    fontSize: 15,
    opacity: 0.8,
    marginTop: 5,
  },
  described: {
    marginLeft: 7,
    fontSize: 18,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  numberReact: {
    marginLeft: 7,
    fontSize: 18
  },
  button: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    width: width,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: theme.colors.black,
  },
  dotStyle: {
    fontSize: 25,
  },
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  dotSlideStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  containerPostHeader: {
    flexDirection: 'row',
  },
  optionDot: {
    backgroundColor: theme.colors.white,
    flex: 2 / 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerImage: {
    flex: 1,
  },
  containerReact: {
    flex: 2,
    paddingBottom: 15
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
  containerPost: {
    borderWidth: 1,
    borderColor: theme.colors.background,
    borderRadius: 7,
  },
  containerUser: {
    flex: 1,
    marginLeft: 5,
    // marginTop: 5,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
  },
  containerUserName: {
    color: theme.colors.black,
    fontSize: 16,
  },
  containerHour: {
    color: '#838383',
    fontSize: 14,
    marginLeft: 5,
  },
  containerFeed: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  image: {
    flex: 1,
    width: width * 150 / 100,
    height: width * 200 / 100,
    resizeMode: 'contain'
  },
  avatarImage: {
    flex: 1,
    width: 40,
    height: 55,
    resizeMode: 'contain',
  },
  comment: {
    color: theme.colors.secondary,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 24,
    color: theme.colors.logo,
    padding: 20,
  },
  icon: {
    fontSize: 25,
    marginRight: 15
  },
  reactIconBox: {
    flexDirection: 'row',
  },
  reactIcon: {
    fontSize: 30,
    margin: 10
  }
});


