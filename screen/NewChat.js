import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BackButton } from "../components";
import { theme } from "../components/core/theme";
import { Avatar, Icon, Divider } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome } from "react-native-vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { message,chat } from "../handle_api";
const { width } = Dimensions.get("window");

export default function NewChat({ route, navigation }) {
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState("");
  const [chatId, setChatId] = useState(null);
  const receiverId = route.params.item;
  const username = route.params.name;
  const token = useSelector(state => state.authReducer.token);
  const senderId =  useSelector(state => state.authReducer.userId);
  useEffect(() => {
    initialize();
  }, []);

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
    const findChat = chats.filter((item) => item.receivedId == receiverId )
    if (findChat != null) setChatId(findChat[0]._id)
  };
  const fetchChats = async () => {
    try {
      const res = await chat.listChat(token);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };


  const onSend = async  () => {
      try {
        const sendResult = await message.sendMessage(
          chatId,
          senderId,
          receiverId,
          messages,
          token
        );
        const result = sendResult.data.data;
        if (chatId == null) setChatId(result.chat._id)
        const item = {
            _id : chatId ,
            name : username,
            receivedId : receiverId,
            avatar : result.user.avatar
        }

        navigation.navigate("ChatMessengerScreen",{item})
      } catch (err) {
        console.log(err);
      }
    //   console.log(chatId)
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />

        {/* <Avatar rounded  source={require('../images/Store_local_image/anh2.jpg')} /> */}
        <Text style={styles.title}>{username}</Text>

        <Icon
          name={"send"}
          size={40}
          // onPress={() => navigation.navigate("ChatInformation", { item })}
          onPress={(messages) => onSend(messages)}
        />
      </View>

      <TextInput
        style={styles.status}
        placeholder="Nhập thứ bạn muốn nhắn "
        returnKeyType="next"
        // value={text}
        onChangeText={setMessages}
        multiline={true}
        numberOfLines={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    justifyContent: "space-between",
  },
  status: {
    margin: 7,
    paddingTop: 7,
    fontSize: 20,
    borderRadius: 6,
    height: 250,
    backgroundColor: "white",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    padding: 15,
    // alignContent: "center",
  },
});
