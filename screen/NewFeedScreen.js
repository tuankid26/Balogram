import React, { useState, useEffect, version, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  StatusBar,
  Dimensions,
  Pressable,
  RefreshControl,
} from "react-native";

import DefaultAvatar from '../images/avatar/default-avatar-480.png';
import { format, formatDistance, subDays } from "date-fns";
import { Avatar } from "react-native-elements";
import { MaterialCommunityIcons,EvilIcons } from "react-native-vector-icons";
import { theme } from "../components/core/theme";
import { post } from "../handle_api";
import { useSelector, useDispatch } from "react-redux";
import { uploadActions } from "../redux/actions";
import { PostsHelper } from "../helpers";
const { width } = Dimensions.get("window");
import Toast from 'react-native-toast-message';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

import { LinePartition, Comment, Slider } from "../components";
import HeaderMain from "../components/header/HeaderMain";
import ModalFeed from "../components/modal/modalFeed";

export default function NewFeedScreen({ navigation }) {
  const [datapost, setDatapost] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [toggleItem, setToggleItem] = useState("");
  const [doubleTouch, setDoubleTouch] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [isFetchingNextPage, setFetchingNextPage] = useState(false);
  const token = useSelector((state) => state.authReducer.token);
  const userId = useSelector((state) => state.infoReducer.userId);
  const uploadStatus = useSelector((state) => {
    return state.upload;
  });

  const dispatch = useDispatch();
  const onLikePress = (userId, postId) => {
    // const convertDatapost = PostsHelper.SetLike(userId, postId, datapost);
    // setDatapost(convertDatapost);
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalReportVisible, setModalReportVisible] = useState(false);
  const [isOtherPostVisible, setOtherPostVisible] = useState(false);
  const toggleModal = (item) => {
    if (item.author._id === userId){
    setModalVisible(!isModalVisible);
    setToggleItem(item);
    }
    else{
      // setModalReportVisible(!isModalReportVisible);
      setOtherPostVisible(!isOtherPostVisible);
      setToggleItem(item);
    }
  };

  const toggleEditPost = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate("EditPostScreen", { toggleItem });
  };

  const toggleDeletePost = async () => {
    setModalVisible(!isModalVisible);
    const data = {
      postId: toggleItem._id,
      token: token,
    };
    try {
      const res = await post.deletePost(data);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };
  const toggleReportModal = async() => {
    const data = {
      postId: toggleItem._id,
      token: token,
    };
    try {
      const res = await post.reportPost(data);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
    setModalReportVisible(!isModalReportVisible);
    setModalVisible(false);
  };
  const toggleOtherPostModal = () => {
    setOtherPostVisible(!isOtherPostVisible);
    setModalReportVisible(!isModalReportVisible);
  }
  const toggleCancelModal = () => {
    setModalVisible(false);
    setModalReportVisible(false);
    setOtherPostVisible(false);
  }
  const onSearchPress = () => {
    navigation.navigate("SearchScreen");
  };

  const fetchPosts = async () => {
    try {
      const dataFeed = await post.getPagePost(token);
      console.log(dataFeed.data.data.length)
      setDatapost(dataFeed.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextPage = () => {
    post.getPagePost(token, null,curPage + 1)
      .then((nextPage) => {
        const newPosts = nextPage.data.data;
        if (newPosts.length > 0) {
          setDatapost(datapost.concat(newPosts));
          setCurPage(curPage + 1);
        }
        setFetchingNextPage(false);
      })
      .catch((err) => console.log(err));
  };


  const handleEndReached = () => {
    // setFetchingNextPage(true);
    fetchNextPage();
  };


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurPage(1);
    fetchPosts();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (uploadStatus.data) {
      fetchPosts();
      dispatch(uploadActions.resetState());
    } else if (uploadStatus.err) {
    }
  }, [uploadStatus]);

  // useEffect(() => {
  //   if (isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [isFetchingNextPage]);


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

  const onAddPost = () => {
    navigation.navigate("NewPostScreen");
  };
  const onComment = (postId, userId) => {
    navigation.navigate("CommentScreen", { postId: postId, userId: userId });
  };
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (doubleTouch && now - doubleTouch < DOUBLE_PRESS_DELAY) {
       mm,
      console.log("Hey");
    } else {
      setDoubleTouch(now);
    }
  };

  const renderItem = (item) => {
    const date_time = splitDateTime(item.updatedAt);
    const num_like = item.like.length;
    const text_like = num_like + " lượt thích";
    const itemIsLike = item.isLike;
    let avatar = item.author.avatar;
    return (
      <View style={styles.containerPost}>
        <View style={styles.containerPostHeader}>
          <View style={styles.containerUser}>
          { avatar
            ? <Avatar
                size={40}
                rounded
                source={{uri: `data:image/jpeg;base64,${avatar.base64}`}}
                containerStyle={{ marginLeft: 5, marginTop: 5 }}
                />
            : <Avatar
                size={40}
                rounded
                source={DefaultAvatar}
                containerStyle={{ marginLeft: 5, marginTop: 5 }}
                />
            }
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
            <Slider item={item.images} index={0} />
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
      <Toast position="bottom" />
      <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" />
      <HeaderMain onAddPost={onAddPost} onSearchPress={onSearchPress} />
      
      <View style={{ flex: 1 }}>
        <ModalFeed
          isModalVisible={isModalVisible}
          isModalReportVisible={isModalReportVisible}
          isOtherPostVisible={isOtherPostVisible}
          toggleEditPost={toggleEditPost}
          toggleDeletePost={toggleDeletePost}
          toggleReportModal={toggleReportModal}
          toggleCancelModal={toggleCancelModal}
          toggleOtherPostModal={toggleOtherPostModal}
        />
        <FlatList
          // numColumns={1}
          // horizontal={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          initialNumToRender={7}
          data={datapost}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={handleEndReached}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  described: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 7,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    margin: 0,
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
    // height : 468
    // borderColor: 'red',
    // borderWidth: 2,
  },
  containerReact: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
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
  container: {
    flex: 1,
  },
  containerInfo: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "300",
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
  reactIconBox: {
    flexDirection: "row",
  },
  reactIcon: {
    fontSize: 30,
    margin: 10,
  },
});