import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { format, formatDistance, subDays } from "date-fns";
import { Avatar } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "react-native-vector-icons";
import { Comment, Slider } from "../components";
const { width, height } = Dimensions.get("screen");
import { theme } from "../components/core/theme";
import { useSelector } from "react-redux";
import { post, auth, search,friend } from "../handle_api";
import { ipServer } from "../handle_api/ipAddressServer";
import DefaultCoverImage from "../images/default-cover-6.jpg";
// import { NewChat } from './NewChat'

export default function FriendProfile({ route, navigation }) {
  const [datapost, setDatapost] = useState("");
  const [isFriend, setIsFriend] = useState();
  const [isBlock, setIsBlock] = useState(false);
  const phonenumber = route.params.item.phonenumber;
  const [info, setInfo] = useState({});
  const Friend_ID = route.params.item._id;

  const token = useSelector((state) => state.authReducer.token);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalVisible, setModalVisible2] = useState(false);
  const [isProfileModalVisible, setProFileModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setToggleItem(item);
  };
  const viewInfo = () => {
    setProFileModalVisible(true);
  };
  useEffect(() => {
    fetchUserInfo();
    fetchSearch();
    fetchPosts();
    fetchBlock();
  }, []);
 
  const fetchChats = async () => {
    try {
      const res = await chat.listChat(token);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSearch = async () => {
    try {
      const dataFeed = await search.search(token, phonenumber);
      const f = dataFeed.data.strange.filter(({ _id }) => _id == Friend_ID);
      f.length == 0 ? setIsFriend(false) : setIsFriend(true);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserInfo = async () => {
    try {
      const res = await auth.getUser(token, Friend_ID);
      setInfo(res.data.data);
      //   console.log(info)
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPosts = async () => {
    try {
      const dataFeed = await post.getListPost(token, Friend_ID);
      setDatapost(dataFeed.data.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlock = async () => {
    try {
      const dataBlock = await friend.getBlockDiary(token);
      const f = dataBlock.data.blocked_diary.filter(({ _id }) => _id == Friend_ID);
      f.length == 0 ? setIsBlock(false) : setIsBlock(true);
      console.log(dataBlock);
      console.log(f);
    } catch (err) {
      console.log(err);
    }
  };

  const setBlockDiary = () => {
    const dataBlock = {
        "user_id": Friend_ID,
        "token": token,
    }
    friend.blockDiary(dataBlock)
        .then(res => {
          console.log("Block thanh cong");
          setBlockModalVisible(false);
        })
        .catch(error => {
            console.log("Failed");
            console.log(error.response.data);
        })

};

const UnBlockDiary = () => {
  const dataBlock = {
      "user_id": Friend_ID,
      "token": token,
  }
  friend.unBlockDiary(dataBlock)
      .then(res => {
        console.log("Xoa Block thanh cong");
        setBlockModalVisible(false);
      })
      .catch(error => {
          console.log("Failed");
          console.log(error.response.data);
      })

};

  const setRemoveFriend = () => {
    const dataRemove = {
        "user_id": Friend_ID,
        "token": token,
    }
    friend.setRemoveFriend(dataRemove)
        .then(res => {
          console.log("Remove thanh cong");
          setIsFriend(false);
          setModalVisible2(false);
        })
        .catch(error => {
            console.log("Failed");
            console.log(error.response.data);
        })
        navigation.navigate('MainScreen');

};

  const FriendModal = () => {
    return (
      <Modal
        // animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible);
        }}
        onBackdropPress={() => setModalVisible2(false)}
        style={styles.Fmodal}
      >
        <View style={styles.centeredView}>
          <Pressable onPress={() => setRemoveFriend()}>
            <Text style={styles.modalText}>Hủy kết bạn</Text>
            </Pressable>
          </View>
      </Modal>
    );
  }

  const BlockModal = () => {
    if(!isBlock){
    return (
      <Modal
      animationType="fade"
        transparent={true}
        visible={blockModalVisible}
        onRequestClose={() => {
          setBlockModalVisible(!blockModalVisible);
        }}
        onBackdropPress={() => setBlockModalVisible(false)}
        style={styles.Bmodal}
      >
        <View style={styles.centeredView}>
          <Pressable onPress={() => setBlockDiary()}>
            <Text style={styles.BmodalText}>Block</Text>
            </Pressable>
          </View>
      </Modal>
    );}
    else{
      return (
        <Modal
      animationType="fade"
        transparent={true}
        visible={blockModalVisible}
        onRequestClose={() => {
          setBlockModalVisible(!blockModalVisible);
        }}
        onBackdropPress={() => setBlockModalVisible(false)}
        style={styles.Bmodal}
      >
        <View style={styles.centeredView}>
          <Pressable onPress={() => UnBlockDiary()}>
            <Text style={styles.BmodalText}>Hủy block</Text>
            </Pressable>
          </View>
      </Modal>
      );
    }
  }

  const ProfileModal = () => {
    return (
      <Modal
        Modal
        isVisible={isProfileModalVisible}
        onBackdropPress={() => setProFileModalVisible(false)}
        style={styles.content}
      >
        <View
          style={{ height: "40%", backgroundColor: "#D0FFFF", marginTop: 100 }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <FontAwesome name="user" size={25} color="#8FCCE5" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>
              Tên người dùng:{" "}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {info && info.username}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <FontAwesome name="transgender" size={25} color="#FABEBE" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Giới tính: </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {info && info.gender}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <FontAwesome name="birthday-cake" size={25} color="#DC5353" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Ngày sinh: </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {info && info.birthday}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <MaterialIcons name="description" size={25} color="#E4D865" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Mô tả: </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {info && info.description}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <MaterialCommunityIcons
              name="home-city"
              size={25}
              color="#72BB4F"
            />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Thành phố: </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {info && info.address}
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  const Profile = () => {
    const info_coverimage = info.cover_image;
    const info_avatar = info.avatar;
    // console.log(info_coverimage)
    return (
      <View style={styles.container}>
        <View>
          <View
            style={{ position: "absolute", zIndex: 999, flexDirection: "row" }}
          >
            <View style={styles.backbutton}>
              <TouchableOpacity onPress={navigation.goBack}>
                <Ionicons name="arrow-back" size={30} color="#F0ECE3" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            > 
            <BlockModal/>
              <TouchableOpacity onPress={() => setBlockModalVisible(!blockModalVisible)}>
                <Entypo name="dots-three-horizontal" size={25} color="#F0ECE3"/>
              </TouchableOpacity>
            </View>
          </View>
          {info_coverimage ? (
            <Image
              style={styles.background}
              source={{
                uri: `${ipServer}${info.cover_image.fileName}`,
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
                  uri: `${ipServer}${info.avatar.fileName}`,
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
        {info && (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              margin: 20,
              top: height * 0.08,
            }}
          >
            <Text
              style={{ fontSize: 28, textAlign: "center", fontWeight: "500" }}
            >
              {info.username}
            </Text>
            <Text style={styles.intro}> {info.description} </Text>
          </View>
        )}
        {isFriend && isFriend == true ? (
          <View>
            <View style={styles.containerGallery}>
              <View style={{ width: "50%", alignItems: "center", left: 20 }} >
              <Pressable
        onPress={() => setModalVisible2(!modalVisible)}
      >
                <Text
                  style={{
                    fontSize: 20,
                    borderWidth: 1,
                    borderColor: "green",
                    width: 80,
                    textAlign: "center",
                    borderRadius: 10,
                  }}
                >
                  Bạn bè
                </Text></Pressable>
              </View>
              <View style={{ alignItems: "center", width: "50%", right: 20 }}>
                <Text
                  style={{
                    fontSize: 20,
                    borderWidth: 1,
                    borderColor: "#9A4747",
                    width: 80,
                    textAlign: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => navigation.navigate('NewChat')}
                >
                  Nhắn tin
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
              onPress={viewInfo}
            >
              <Entypo name="dots-three-horizontal" size={20} />
              <Text style={{ marginLeft: 10, fontSize: 20 }}>
                Thông tin giới thiệu
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.containerGallery}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    borderWidth: 1,
                    borderColor: "green",
                    width: 80,
                    textAlign: "center",
                    borderRadius: 10,
                  }}
                >
                  Kết bạn
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "#9A4747",
                }}
              >
                Không thể xem nhật ký của người lạ
              </Text>
            </View>
          </View>
        )}
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
  const onComment = (postId, userId) => {
    navigation.navigate("CommentScreen", { postId: postId, userId: userId });
  };
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
              source={{ uri: `${ipServer}${info.avatar.fileName}` }}
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
      <ProfileModal />
      <FriendModal/>
      
      <SafeAreaView style={{ flex: 1 }}>
        {isFriend && isFriend == true ? (
          <FlatList
            data={datapost}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item._id.toString()}
            ListHeaderComponent={Profile}
          />
        ) : (
          <View/>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  backbutton:{
marginLeft: 5
  },
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
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  containerStatus: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 43,
    justifyContent: "space-evenly",
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
    fontWeight: "400",
    color: "#787A91",
    flex: 4 / 5,
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
  Fmodal: {
    width: "50%",
     alignItems: "center",
      // left: 5,
      bottom: 8
  },
  Bmodal: {
     alignItems: "flex-end",
     bottom: width-50,
     left:20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
  fontSize: 20,
  borderWidth: 1,
  borderColor: "red",
  width: 120,
  textAlign: "center",
  borderRadius: 10,
  },
  BmodalText: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#e69138",
    width: 70,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#eae0c3",
    },
});
