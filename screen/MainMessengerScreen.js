import React, { Component, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";

import { data } from "../log_data/data.js";
import Item_Messenger from "../components/Item_Messenger";
import { LinePartition } from "../components";
import { theme } from "../components/core/theme";

import { chat } from "../handle_api";
export default function MainMessengerScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRydW5ndnVob2FuZyIsImlkIjoiNjE4ZTk3NTg3NDU1MGEyMmE0Y2IyYTkwIiwiaWF0IjoxNjM2NzM0ODA5fQ.NwBPkKkhl8IHr64k-4EwTPMhtzY2IM0J6TXqm8c-DNk";
  useEffect(() => {
    const initialize = async () => {
      const newChats = await fetchChats();
      setChats(
        newChats
          .map((msg) => ({
            id: msg[0]._id,
            name: msg[1].username,
            avatar: msg[1].avatar,
            text: msg[2].content,
          }))
          .reverse()
      );
    };
    initialize();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await chat.listChat(token);
      console.log(res.data.data);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatMessengerScreen", { item });
          }}
        >
          <Item_Messenger item={item} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>BaloGram</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="md-search-outline" style={styles.icon} />
        </View>
      </View>
      <LinePartition color={theme.colors.black} />
      <FlatList
        // ref={"flatList"}
        data={chats}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: theme.colors.logo,
    padding: 20,
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
  icon: {
    fontSize: 25,
    marginRight: 15,
  },
});
