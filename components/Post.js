import React from "react";
import { View } from "react-native";
import { StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "./core/theme";
import FeedImage from "../images/Store_local_image/anhquan.jpg";
import { Avatar } from "react-native-elements";
import { MaterialCommunityIcons, Octicons } from "react-native-vector-icons";
import { Slider } from "./Slider";
import { Comment } from "./Comment";

export default function Post(params) {
  console.log(params)

  const item = params.item
  const splitDateTime = (raw_date) => {
    // 2021-11-14T17:16:51.653Z
    const list_text = raw_date.split(":");
    const l_date_hour = list_text[0].split("T");
    const date = l_date_hour[0];
    const hour_minute = l_date_hour[1] + ":" + list_text[1];
    const new_text = date + " lúc " + hour_minute;
    // const time = format (raw_date, "MMMM do, yyyy H:mma")
    return new_text;
  };
  const date_time =  splitDateTime(item.updatedAt);
  const num_like = item.like.length;
  const text_like = num_like + " lượt thích";
  const itemIsLike = item.isLike;

  const onLikePress = params.onLikePress
  const toggleModal = params.toggleModal
  return (
    <View style={styles.containerPost}>
      <View style={styles.containerPostHeader}>
        <View style={styles.containerUser}>
          <Avatar
            size={40}
            rounded
            source={FeedImage}
            containerStyle={{ marginLeft: 5, marginTop: 5 }}
          />
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={styles.containerUserName}>{item.author.username}</Text>
            <Text style={styles.containerHour}>{date_time}</Text>
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
        <Text style={styles.described}>{item.described}</Text>

        <View style={styles.containerImage}>
          <Slider item={item.images} index={0} />
        </View>

        <View style={styles.containerReact}>
          <Text style={styles.numberReact}>{text_like}</Text>
          <View style={styles.reactIconBox}>
            <Pressable onPress={() => onLikePress(item.userCall, item._id)}>
              <MaterialCommunityIcons
                name={itemIsLike ? "heart" : "heart-outline"}
                style={styles.reactIcon}
                color={itemIsLike ? "red" : "black"}
              />
            </Pressable>

            <Octicons
              name="comment"
              style={styles.reactIcon}
              onPress={() => onComment(item._id, item.author._id)}
            />
          </View>
          <Text style={styles.comment} onPress={() => onComment(item._id)}>
            View Comments...
          </Text>
          <Comment postID={item._id} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPostHeader: {
    flexDirection: "row",
  },
  containerPost: {
    borderWidth: 1,
    borderColor: theme.colors.background,
    borderRadius: 7,
  },
  containerUser: {
    flex: 1,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
  },
  containerUserName: {
    color: theme.colors.black,
    fontSize: 16,
    marginLeft: 5,
    // borderColor: 'red',
    // borderWidth: 1,
    // marginTop: 12,
    // alignItems:'flex-start'
  },
  containerHour: {
    color: "#838383",
    fontSize: 14,
    marginLeft: 5,
  },
  containerFeed: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  comment: {
    color: theme.colors.secondary,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "bold",
  },
  reactIcon: {
    fontSize: 30,
    margin: 10,
  },
  reactIconBox: {
    flexDirection: "row",
  },
  optionDot: {
    backgroundColor: theme.colors.white,
    flex: 2 / 3,
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
    flex: 2,
    // borderColor: 'red',
    // borderWidth: 2,
    paddingBottom: 15,
  },
  dotSlideStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotStyle: {
    fontSize: 25,
  },
  numberReact: {
    marginLeft: 7,
    fontSize: 18,
  },
  described: {
    marginLeft: 7,
    fontSize: 18,
    // fontFamily: 'San Francisco',
    // fontWeight: 'bold',
  },
});
