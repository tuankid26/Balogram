import React, { Component, useState, useEffect,useRef } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import Item_Messenger from "../components/Item_Messenger";
import { LinePartition } from "../components";
import { theme } from "../components/core/theme";
import { useSelector } from 'react-redux';
import { chat } from "../handle_api";
import { SOCKET_URL } from '../handle_api';
import {io} from 'socket.io-client';

export default function MainMessengerScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const socket = useRef();
  const token = useSelector(state => state.authReducer.token);
  useEffect(() => {
    const initialize = async () => {
      const newChats = await fetchChats();
      setChats(
        newChats
          .map((msg) => ({
            receivedId: msg[1]._id,
            sendId: msg[0].member.filter((item) => {
              return item !== msg[1]._id
            }),
            name: msg[1].username,
            avatar: msg[1].avatar,
            text: msg[2].content,
            _id: msg[0]._id
          }))
          .reverse()
      );
      socket.current = io(SOCKET_URL);
    };
    initialize();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await chat.listChat(token);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    socket.current?.on('refreshLatestMessage', (data) =>{
      // console.log(data)
      setChats(chats.map(chat => {
        if(chat.id !== data.chatId){
          return chat;
        }
        return{
          ...chat,
          text: data.content,
        }
      }))
    })
    
  }, [socket])

  const renderItem = (item) => {
    // console.log(item)
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
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  headerBar: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    height : 40,
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
