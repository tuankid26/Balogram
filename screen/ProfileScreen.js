import React, { useState, useEffect, useCallback, useRef } from "react";
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
import {
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
} from "react-native-vector-icons";
import { LinePartition, Comment, Slider } from "../components";
const { width, height } = Dimensions.get("screen");
import { theme } from "../components/core/theme";
import { useSelector } from "react-redux";
import { post, profile } from "../handle_api";
import { Video } from 'expo-av';
import VideoPlayer from '../components/VideoPlayer';
import { format, formatDistance, subDays } from "date-fns";
import { ipServer } from "../handle_api/ipAddressServer";
import DefaultAvatar from "../images/avatar/default-avatar-480.png";
import DefaultCoverImage from "../images/default-cover-6.jpg";
export default function Profile({ navigation }) {
  const [datapost, setDatapost] = useState("");
  const [infoUser, setInfoUser] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const username = useSelector((state) => state.infoReducer.username);
  const token = useSelector((state) => state.authReducer.token);
  const userId = useSelector((state) => state.infoReducer.userId);
  const description = useSelector((state) => state.infoReducer.description);
  const [isModalVisible, setModalVisible] = useState(false);
  const [toggleItem, setToggleItem] = useState("");
  const video = useRef(null);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setToggleItem(item);
  };
  const toggleDeletePost = () => {
    setModalVisible(!isModalVisible);
    const data = {
      postId: toggleItem._id,
      token: token,
    };
    post
      .deletePost(data)
      .then((res) => {})
      .catch((error) => {
        console.log("Failed");
        console.log(error.response.data);
      });
  };
  const toggleEditPost = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate("EditPostScreen", { toggleItem });
  };
  const Profile = () => {
    const info_coverimage = infoUser.cover_image;
    const info_avatar = infoUser.avatar;
    // console.log(info_avatar);
    // console.log(info);
    // console.log(`${ipServer}${infoUser.cover_image.fileName}`);
    return (
      <View style={styles.container}>
        <View>
          {info_coverimage ? (
            <Image
              style={styles.background}
              source={{
                uri: `${ipServer}${infoUser.cover_image.fileName}`,
              }}
            />
          ) : (
            <Image style={styles.background} source={DefaultCoverImage} />
          )}

          <View style={styles.avatar}>
            {info_avatar ? (
              <Avatar.Image
                size={120}
                source={{
                  uri: `${ipServer}${infoUser.avatar.fileName}`,
                }}
                style={{ position: "absolute" }}
              />
            ) : (
              <Avatar.Image
                size={120}
                source={require("../images/avatar/default-avatar-480.png")}
                style={{ position: "absolute" }}
              />
            )}
          </View>
        </View>
        <View style={{flexDirection : 'column',alignItems: "center",margin : 20,top:height*0.08,}}>
          <Text
            style={{ fontSize: 28, textAlign: "center", fontWeight: "500" }}
          >
            {" "}
            {username}{" "}
          </Text>
          <Text style={styles.intro}> {description} </Text>
        </View>
        <View style={styles.containerGallery}>
          <View style={styles.containerStatus}>
            <Text
              style={styles.status}
              onPress={() => navigation.navigate("NewPostScreen")}
            >
              Bạn đang nghĩ gì ?{" "}
            </Text>
            <Ionicons
              name="images"
              style={styles.iconImage}
              onPress={() => navigation.navigate("NewPostScreen")}
            />
          </View>
        </View>
        <LinePartition color={theme.colors.silver} />
        <View style={{ padding: 5, backgroundColor: "white" }}>
          <Text
            style={{
              fontSize: 20,
              backgroundColor: "#BFE5F5",
              width: 85,
              borderRadius: 10,
              paddingLeft: 8,
            }}
          >
            Nhật ký
          </Text>
        </View>
      </View>
    );
  };
  const fetchPosts = async () => {
    try {
      const dataFeed = await post.getListPost(token, userId);
      setDatapost(dataFeed.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserInfo = async () => {
    const data = {
      token: token,
    };

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
    const l_date_hour = list_text[0].split("T");
    const date = l_date_hour[0];
    const hour_minute = l_date_hour[1] + ":" + list_text[1];
    const new_text = date + " lúc " + hour_minute;
    const time = formatDistance(new Date(raw_date).getTime(), new Date(), {
      addSuffix: true,
    });
    return time;
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchPosts();
    fetchUserInfo();
    wait(500).then(() => setRefreshing(false));
  }, []);
  const onLikePress = (userId, postId) => {
    setDatapost(
      [...datapost].map((object) => {
        const isLikeTmp = object.isLike;
        // Handle list like and status liked
        if (object._id === postId) {
          let arrLike = object.like;
          let arrLikeNotContainCurrentUser = arrLike.filter((item) => {
            return item != userId;
          });
          if (arrLikeNotContainCurrentUser.length === arrLike.length) {
            arrLike.push(userId);
          } else {
            arrLike = arrLikeNotContainCurrentUser;
          }
          return {
            ...object,
            isLike: !isLikeTmp,
            like: arrLike,
          };
        } else return object;
      })
    );
    const data = {
      postId: postId,
      token: token,
    };
    post
      .actionLikePost(data)
      .then((res) => {})
      .catch((error) => {
        console.log("Failed");
        console.log(error.response.data);
      });
  };
  const onAddPost = () => {
    navigation.navigate("NewPostScreen");
  };
  const onComment = (postId, userId) => {
    navigation.navigate("CommentScreen", { postId: postId, userId: userId });
  };
  const renderItem = (item) => {
    const date_time = splitDateTime(item.updatedAt.toString());
    
    const num_like = item.like.length;
    const text_like = num_like + " lượt thích";
    const itemIsLike = item.isLike;
    let item_video = item.videos[0];
    return (
      <View style={styles.containerPost}>
        <View style={styles.containerPostHeader}>
          <View style={styles.containerUser}>
            <Avatar.Image
              size={40}
              rounded
              source={{ uri: `${ipServer}${infoUser.avatar.fileName}` }}
              containerStyle={{ marginLeft: 5, marginTop: 5 }}
            />
            <View style={styles.containerInfo}>
              <Text style={styles.containerUserName}>
                {item.author.username}
              </Text>
              <Text style={styles.containerHour}> {date_time} </Text>
            </View>
          </View>
          <View style={styles.optionDot}>
            <MaterialCommunityIcons
              name="dots-vertical"
              style={styles.dotStyle}
              onPress={() => toggleModal(item)}
            />
          </View>
        </View>

        <View style={styles.containerFeed}>
          {item.described == "" ? (
            <View />
          ) : (
            <Text style={styles.described}>{item.described}</Text>
          )}
          <View style={styles.containerImage}>
            {item_video 
              ?
                // <Video
                //   style={styles.video}
                //   ref={video}
                //   source={{
                //     uri: `${ipServer}${item_video.fileName}`,
                //   }}
                //   useNativeControls={true}
                //   resizeMode="cover"
                //   shouldPlay={false}
                  
                //   isLooping={true}
                //   // onPlaybackStatusUpdate={status => setStatus(() => status)}
                // />
                <VideoPlayer
                  videoUri={`${ipServer}${item_video.fileName}`}
                  item={item}
                  />
              :
                <Slider item={item.images} index={0} />
              }
          </View>

          <View style={styles.containerReact}>
            <View style={styles.reactIconBox}>
              <Pressable onPress={() => onLikePress(item.userCall, item._id)}>
                <MaterialCommunityIcons
                  name={itemIsLike ? "heart" : "heart-outline"}
                  style={styles.reactIcon}
                  color={itemIsLike ? "#DD4A48" : "black"}
                />
              </Pressable>

              <MaterialCommunityIcons
                name="comment-outline"
                style={styles.reactIcon}
                onPress={() => onComment(item._id, item.author._id)}
              />
            </View>
            <Text style={styles.numberReact}>
              {num_like == 0
                ? "Hãy là người đầu tiên thích bài viết này "
                : text_like}
            </Text>

            {/* <Text style={styles.comment} onPress={() => onComment(item._id)}>
              View All Comments
            </Text> */}
            <Comment postID={item._id} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={isModalVisible}
        animationIn="slideInUp"
        transparent={true}
      >
        <View style={styles.modal}>
          <View>
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
      </Modal>
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={datapost}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id.toString()}
          ListHeaderComponent={Profile}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  background: {
    height: 250,
    position: "relative",
  },
  iconImage: {
    fontSize: 30,
    padding: 6,
    color: "#2FDD92",
    marginLeft: 15,
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
    // width : width * 0.9,
    justifyContent: "space-evenly",
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },

  status: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "400",
    color: "#787A91",
    flex: 3 / 5,
    borderRightWidth: 0.5,
    borderRightColor: "#787A91",
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

  numberReact: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    width: width,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  dotSlideStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  containerPostHeader: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
  },
  optionDot: {
    backgroundColor: theme.colors.white,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  containerImage: {
    flex: 1,
  },
  containerReact: {
    flex: 2,
    paddingBottom: 15,
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
  containerPost: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 7,
    marginTop: 10,
    marginTop: 20,
  },
  containerUser: {
    flex: 1,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  containerUserName: {
    color: theme.colors.black,
    fontSize: 17,
    marginLeft: 10,
    marginTop: 5,
    fontWeight: "700",
  },
  containerHour: {
    color: "#838383",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  containerFeed: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  image: {
    flex: 1,
    width: (width * 150) / 100,
    height: (width * 200) / 100,
    resizeMode: "contain",
  },
  avatarImage: {
    flex: 1,
    width: 40,
    height: 55,
    resizeMode: "contain",
  },
  comment: {
    color: theme.colors.secondary,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    color: theme.colors.logo,
    padding: 20,
  },

  reactIconBox: {
    flexDirection: "row",
  },
  reactIcon: {
    fontSize: 30,
    margin: 10,
  },
  video: {
    alignSelf: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    marginLeft: 5,
    width: width - 10,
    height: 200,
    resizeMode: "contain",
  },
  headerBar: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    height: 40,
  },

  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    color: theme.colors.logo,
    padding: 20,
  },
  icon: {
    fontSize: 25,
    marginRight: 15,
  },
});
