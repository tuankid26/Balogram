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
  Button,
  Image
} from "react-native";

import DefaultAvatar from '../images/avatar/default-avatar-480.png';
import { format, formatDistance, subDays } from "date-fns";
import { Avatar } from "react-native-elements";
import { MaterialCommunityIcons,EvilIcons } from "react-native-vector-icons";
import { theme } from "../components/core/theme";
import { admin, post } from "../handle_api";
import { useSelector, useDispatch } from "react-redux";
import { uploadActions } from "../redux/actions";
import { PostsHelper } from "../helpers";
const { width } = Dimensions.get("window");
import Toast from 'react-native-toast-message';
import { BackButton } from "../components";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

import { LinePartition, Comment, Slider_local_image } from "../components";

export default function ShowPostScreen({ route, navigation }) {
  const { itemReport } = route.params;
  const postId = itemReport.post._id;
  const postIdReport = itemReport._id;
  const [item, setItem] = useState("");
  const token = useSelector((state) => state.authReducer.token);
  const userId = useSelector((state) => state.infoReducer.userId);
  const dispatch = useDispatch();
  const fetchPosts = async (postId) => {
    try {
        data = {
            token : token, 
            postId: postId
        }
      const dataPost = await post.showPost(data);
      setItem(dataPost.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts(postId);
  });

  const deletePost = async (postIdReport) => {
      
      try {
        data = {
            token: token,
            postId: postIdReport
        }
        const result = await admin.deleteReport(data);
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("AdminMainScreen");
  }


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
  let avatar = ""
  let date_time = "";
  // console.log(item)
  if (item.author){
    date_time = splitDateTime(item.updatedAt);
    avatar = item.author.avatar;
    return (
        <View>
        <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" />
        <BackButton goBack={navigation.goBack} />
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
                <Button title="Xoá" onPress={()=> deletePost(postIdReport)}/>
            </View>
            </View>
            </View>

            <View style={styles.containerFeed}>
                <Text style={styles.described}>{item.described}</Text>
            
            
            <View style={styles.containerImage}>
              <Slider_local_image item={item.images} index={0} />
            </View>
            
            </View>
            

        </View>
    );
    }
    else{
        return (
            <View></View>
        );
    }
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
        justifyContent: "flex-end",
      },
      optionDot: {
        backgroundColor: theme.colors.white,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
      },
      containerImage: {
        flex: 1,
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
        // flexDirection: "row",
        // alignItems: "center",
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