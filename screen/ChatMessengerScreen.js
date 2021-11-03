import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import BackButton from '../components/BackButton'
import { View,StyleSheet,Button,  TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StylePropType } from 'react-native-gifted-chat/lib/utils';
import {Icon} from 'react-native-elements'
export default function ChatMessengerScreen({route, navigation}) {
  const [messages, setMessages] = useState([]);
  const {item} = route.params;
  const onback = () => {
    navigation.navigate("MainScreen");
  }
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
      <View style={styles.headerLeft}>
      <Icon name={'chevron-left'}
      size={40}
      onPress={onback}/>
      <Avatar
      rounded
      source={item.avatar}
      />
      </View>
      ),
      headerTitle: item.name
      ,
    //   headerRight: () => (
    //   <View style={{
    //     marginTop: 0,
    //     marginRight: 20
    //     }}
    //   >
    //   <BackButton goBack={onback} />
    //   </View>
    // )
    })
    }, [navigation])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: item.avatar,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )

}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row'
  }
}
)