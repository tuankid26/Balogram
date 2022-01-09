import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { ipServer } from "../handle_api/ipAddressServer";
import { useSelector, useDispatch } from "react-redux";
import FriendProfile from "../screen/FriendProfileScreen";
const { width } = Dimensions.get("window");
export default function FriendActive({ item, onPressUser }) {

  const onPressFriend = () => {
    onPressUser(item)
  } 
  return (
    <TouchableOpacity 
    onPress={onPressFriend}
    >
      <View style={styles.container}>
        <View style={styles.bgAvatar}>
          <Avatar.Image
                onPress={onPressFriend}
              size={45}
              source={{
                uri: `${ipServer}${'../images/placeholder.png'}`,
              }}
            /> 
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.username}</Text>
        </View>
         <View >
          <MaterialCommunityIcons name="message-outline" style={styles.icon} />
        </View>
      </View>
      <Divider style={{ marginTop: 10, marginLeft: 65 }} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    marginRight: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 8,
    backgroundColor :'white'
  },
  bgAvatar: {
    flex: 2,
  },
  avatar: {
    width: (width * 15) / 100,
    height: (width * 15) / 100,
    borderRadius: (width * 10) / 100,
  },
  info: {
    flex: 8,
    flexDirection: "column",
    paddingLeft: 5,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
    paddingBottom: 3,
  },
});
