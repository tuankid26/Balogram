import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet,SafeAreaView } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { io } from "socket.io-client";
import { chat, message,friend } from "../handle_api";
import { useSelector, useDispatch } from 'react-redux';
import {ipServer} from "../handle_api/ipAddressServer";
import DefaultAvatar from '../images/avatar/default-avatar-480.png';

// const SOCKET_URL = "http://192.168.0.102:3000";
import {SOCKET_URL} from "../handle_api" 

export default function ChatMessengerScreen({ route, navigation }) {
  const socket = useRef();
  const { item } = route.params;
  const [show, setShow] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [messages, setMessages] = useState([]);
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  const chatId = item._id;
  let avatar = item.avatar;
  if (avatar) {
    avatar = item.avatar.fileName;
  }
  const token = useSelector(state => state.authReducer.token);
  const receiverId = item.receivedId
  const senderId =  useSelector(state => state.authReducer.userId);
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
            avatar: `${ipServer}${avatar}`
          },
        }))
          .reverse()
      );
      socket.current = io(SOCKET_URL);
    };
    initialize();
    fetchBlock();
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

  const fetchBlock = async () => {
    try {
      const dataBlock = await friend.getBlockChat(token);
      const f = dataBlock.data.blocked_diary.filter(({ _id }) => _id == chatId);
      f.length == 0 ? setIsBlock(false) : setIsBlock(true);
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
        const newMsg = sendResult.data.data;
        socket.current?.emit('sendMessage', {
          _id: newMsg._id,
          senderId: senderId,
          receivedId: receiverId,
          content: newMsgObj.text,
          createdAt: newMsg.createdAt
        });
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

  const UnBlockChat = () => {
    const dataBlock = {
        "user_id": chatId,
        "token": token,
    }
    friend.unBlockChat(dataBlock)
        .then(res => {
          console.log("Xoa block thanh cong");
        })
        .catch(error => {
            console.log("Failed");
            console.log(error.response.data);
        })

};


  return (
    // <View>
    
    <SafeAreaView style={{ flex: 1 }}>
        {isBlock && isBlock == true ? (
          <Pressable onPress={() => UnBlockChat()}>
          <Text style={styles.btext}>Hủy block</Text>
          </Pressable>
        ) : (
          <GiftedChat
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: senderId
      }}
      onLongPress={onLongPress}
    />
        )}
      </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
  },
  btext: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#e69138",
    width: 70,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#eae0c3",
  },
});
