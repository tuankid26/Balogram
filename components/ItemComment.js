import formatDistance from "date-fns/formatDistance";
import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../components/core/theme";
const { width } = Dimensions.get("window");
import {ipServer} from "../handle_api/ipAddressServer";
import DefaultAvatar from '../images/avatar/default-avatar-480.png';
class ItemComment extends Component {
  render() {
    const { item } = this.props;
    const avatar = item.user.avatar;

    return (
      <View style={styles.container}>
        <View style={styles.bgAvatar}>
          { avatar?
              <Image source={{uri: `${ipServer}${avatar.fileName}`}} style={styles.avatar} />
            :
            <Image source={DefaultAvatar} style={styles.avatar} />

          }
          
        </View>
        <View style={styles.info}>
          <View style={styles.inner}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.name}>{item.user.username}</Text>
              <Text style={styles.containerHour}>
                {" "}
                {formatDistance(
                  new Date(item.updatedAt).getTime(),
                  new Date(),
                  { addSuffix: true }
                )}{" "}
              </Text>
            </View>
            <Text style={styles.comment}>{item.content}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerHour: {
    color: "#838383",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 4,
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inner: {
    // borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 5,
    paddingRight: 13,
    borderRadius: 20,
    backgroundColor: "#EEEEEE",
  },
  bgAvatar: {
    flex: 2,
    paddingTop: 10,
  },
  avatar: {
    width: (width * 12) / 100,
    height: (width * 12) / 100,
    borderRadius: (width * 10) / 100,
  },
  info: {
    flex: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#fff",
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 3,
    fontWeight: "bold",
  },
  comment: {
    color: "black",
    fontSize: 18,
    paddingBottom: 3,
  },
  bgSeen: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSeen: {
    width: (width * 5) / 100,
    height: (width * 5) / 100,
    borderRadius: (width * 2.5) / 100,
  },
});
export default ItemComment;
