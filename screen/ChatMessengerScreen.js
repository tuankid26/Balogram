import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import Modal from "react-native-modal";
import { LinePartition } from "../components";
import { io } from "socket.io-client";
import { message } from "../handle_api";
import { theme } from "../components/core/theme";
const { width } = Dimensions.get("window");

export default function ChatMessengerScreen({ route, navigation }) {
  const socket = useRef();
  const { item } = route.params;
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const chatId = item.id;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1YW5raWQyNiIsImlkIjoiNjE4N2FlNDY3YjJiYzUzMDMwNWQ4MGNlIiwiaWF0IjoxNjM2ODU1MDQ0fQ.jL4Ss_ONfRgOXmR4MrePGJ0S1cumjOewMxIlSHt9opI";
  const receiverId = "618e992874550a22a4cb2a98";
  const senderId = "618e975874550a22a4cb2a90";

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalReportVisible, setModalReportVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleReportModal = () => {
    setModalReportVisible(!isModalReportVisible);
    setModalVisible(false);
  };

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
      headerRight: () => <Icon name={"menu"} size={40} onPress={toggleModal} />,
      modal : () => (
        <View>
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          style={styles.modal}
        >
          <View>
            <Pressable style={styles.button} onPress={toggleModal}>
              <Text style={styles.text}>Chỉnh sửa biệt danh</Text>
            </Pressable>
            <LinePartition color={theme.colors.silver} />
            <Pressable style={styles.button} onPress={toggleModal}>
              <Text style={styles.text}>Xóa đoạn chat </Text>
            </Pressable>
            <LinePartition color={theme.colors.silver} />
            <Pressable style={styles.button} onPress={toggleModal}>
              <Text style={styles.text}>Chặn</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
      )
    });
  }, [navigation]);

  useEffect(() => {
    const initialize = async () => {
      const newMessages = await fetchMessages();
      setMessages(
        newMessages
          .map((msg) => ({
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
    };
    initialize();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await message.getMessages(chatId, token);
      console.log(res.data.data);
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

  return (
    <View>
      <GiftedChat
        showAvatarForEveryMessage={true}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: senderId,
        }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: theme.colors.black,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  button: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    width: width,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
