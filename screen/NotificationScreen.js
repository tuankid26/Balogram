import React, { PureComponent, useState } from 'react';
import {Text, View } from 'react-native';
import { SearchBar, Button,ListItem, Avatar, Icon } from 'react-native-elements';
import { StyleSheet, Image, FlatList, StatusBar } from 'react-native';
import { theme } from '../components/core/theme';




export default function NotificationScreen({navigation}){

  const data = [
    {
        id: 1,
        name: 'Nguyễn Hồng Hạnh',
        avatar: require('../images/avatar/Hanh.jpg'),
        action: "đã bình luận về bài viết của bạn",
        datetime: "12:35, 01/11/2021"
    },
    {
        id: 2,
        name: 'Nguyễn Hương Nhu',
        avatar: require('../images/avatar/HuongNhu.jpg'),
        action: "đã like ảnh của bạn",
        datetime: "01:05, 24/10/2021"
    },
    {
        id: 3,
        name: 'Nguyễn Hương Nhu',
        avatar: require('../images/avatar/HuongNhu.jpg'),
        action: "đã bình luận về bài viết của bạn",
        datetime: "06:32, 02/11/2021"
    }
  ];

  const onpress = ( ) =>{

  }
  
    return (
            <View style={styles.container}>
            <View style={styles.headerview}>
            <Text style={styles.header}> Notifications </Text>
            </View>
                {
                data.map((l, i) => (
                    <ListItem key={i} bottomDivider >
                    <Avatar source={l.avatar} size={60} rounded/>
                    <ListItem.Content>
                        <View style={styles.content_comment}>
                            <ListItem.Title 
                            style={styles.content_comment_name}>{l.name}
                            </ListItem.Title>
                            <ListItem.Title 
                            style = {styles.content_comment_action}>{l.action}
                            </ListItem.Title>
                        </View>
                        <ListItem.Subtitle>{l.datetime}</ListItem.Subtitle>
                    </ListItem.Content>
                    </ListItem>
                ))
                }

        </View>
    
    );
}

const styles = StyleSheet.create({
  content_comment: {
      // flexDirection: 'row'
  },
  content_comment_name: {
    fontWeight: 'bold'
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: theme.colors.button
  },
  headerview: {
      backgroundColor: "#fff",
      marginBottom: 4
  },
  content_comment_action: {
    fontWeight: 'normal'
  }
  ,
  container: {
    // flex: 1,
    width: '100%',
    backgroundColor: '#ecf0f1',
  }
  
});
