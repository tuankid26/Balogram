import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { io } from "socket.io-client";
import { chat, message } from "../handle_api";
import { useSelector, useDispatch } from 'react-redux';
const SOCKET_URL = "http://192.168.0.102:3000";

export default function ChatMessengerScreen({ route, navigation }) {
  const socket = useRef();
  const { item } = route.params;
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const chatId = item._id;
  const token = useSelector(state => state.authReducer.token);
  const receiverId = item.receivedId
  const senderId = item.sendId[0]
  const onBack = () => {
    navigation.navigate("MainScreen");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Icon name={"chevron-left"} size={40} onPress={onBack} />
          <Avatar rounded source={item.avatar} />
        </View>
      ),
      headerTitle: item.name,
      headerRight: () => <View><Icon name={"menu"} size={40} onPress={() => navigation.navigate("ChatInformation", { item })} /></View>,
    });
  }, [navigation]);

  useEffect(() => {
    const initialize = async () => {
      const newMessages = await fetchMessages();
      setMessages(
        newMessages.map((msg) => ({
          _id: msg._id,
          text: msg.content,
          createdAt: msg.createdAt,
          user: {
            _id: msg.user._id,
            name: msg.user.username,
          },
        }))
          .reverse()
      );


      socket.current = io(SOCKET_URL);
    };
    initialize();
  }, []);

  useEffect(() => {
    socket.current?.on('getMessage', (data) => {
      if (senderId === data.receivedId) {
        const newMsg = {
          _id: data._id,
          text: data.content,
          createdAt: data.createdAt,
          user: {
            _id: data.senderId,
          },
        };

        setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMsg]));
      }
    });
  }, [socket])

  const fetchMessages = async () => {
    try {
      const res = await message.getMessages(chatId, token);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const onSend = useCallback(async (messages = []) => {
    if (messages.length > 0) {
      const newMsgObj = messages[0];
      try {
        const sendResult = await message.sendMessage(
          chatId,
          senderId,
          receiverId,
          newMsgObj.text,
          token
        );
      } catch (err) {
        console.log(err);
      }
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    }
  }, []);

  const onDelete = async (messageIdToDelete) => {
    try {
      const deleteMess = await message.deleteMessage(messageIdToDelete, token);
      setMessages(messages.filter(message => message._id !== messageIdToDelete))
    } catch (err) {
      console.log(err);
    }
    // setMessages(messages.filter(message => message._id !== messageIdToDelete) )
  }

  const onLongPress = (context, message) => {
    const options = ['Copy', 'Delete Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Clipboard.setString(message.text);
          break;
        case 1:
          onDelete(message._id) //pass the function here
          break;
      }
    });
  }

  return (
    <GiftedChat
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: senderId,
      }}
      onLongPress={onLongPress}
    />
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
  },
});
