import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { chat, message } from "../handle_api";
import { useSelector, useDispatch } from 'react-redux';
import {ipServer} from "../handle_api/ipAddressServer";
import DefaultAvatar from '../images/avatar/default-avatar-480.png';
import { TextInput } from "../components";


export default function NewChat({navigation}) {
//   const { item } = route.params;
  const [messages, setMessages] = useState([]);
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  const chatId = null;
//   let avatar = item.avatar;
//   if (avatar) {
//     avatar = item.avatar.fileName;
//   }
  const token = useSelector(state => state.authReducer.token);
//   const {receiverId} = route.params
  const senderId =  useSelector(state => state.authReducer.userId);

  const onBack = () => {
    navigation.goBack();
  };
  
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <View style={styles.headerLeft}>
//           <Icon name={"chevron-left"} size={40} onPress={onBack} />
//           <Avatar rounded source={item.avatar} />
//         </View>
//       ),
//       headerTitle: item.name,
//       headerRight: () => <View><Icon name={"menu"} size={40} onPress={() => navigation.navigate("ChatInformation", { item })} /></View>,
//     });
//   }, [navigation]);

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
    }
  }, []);


  return (
    <TextInput 
        value = {messages}
        onChangeText={(caption) => setMessages(caption)}
    />
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
  },
});
