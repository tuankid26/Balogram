import React, { PureComponent, useState } from 'react';
import { Text, View } from 'react-native';
import { SearchBar, Button, ListItem, Avatar, Icon } from 'react-native-elements';
import { StyleSheet, Image, FlatList, StatusBar } from 'react-native';
import { theme } from '../components/core/theme';




export default function NotificationScreen({ navigation }) {

    const data = [
        
        {
            id: 1,
            name: 'Bùi Mạnh Tuấn',
            avatar: require('../images/Store_local_image/anhtuan.jpg'),
            action: "đã bình luận về bài viết của bạn",
            datetime: "25 phút trước"
        },
        {
            id: 2,
            name: 'Hoàng Huy Quân',
            avatar: require('../images/Store_local_image/anhquan.jpg'),
            action: "đã thích bài viết của bạn",
            datetime: "47 phút trước"
        },
        {
            id: 3,
            name: 'Vũ Tuấn Trường',
            avatar: require('../images/Store_local_image/AnhTruong.jpg'),
            action: "đã thêm một bài viết mới",
            datetime: "12h35 14/01/2022"
        },
        {
            id: 4,
            name: 'Vũ Hoàng Trung',
            avatar: require('../images/Store_local_image/anhtrung.jpg'),
            action: "đã bình luận về bài viết của bạn",
            datetime: "8h20 11/01/2022"
        },
        {
            id: 5,
            name: 'Hoàng Huy Quân',
            avatar: require('../images/Store_local_image/anhquan.jpg'),
            action: "đã bình luận về bài viết của bạn",
            datetime: "4h14 11/01/2022"
        },
        {
            id: 6,
            name: 'Vũ Minh Thanh',
            avatar: require('../images/Store_local_image/anhthanh.jpg'),
            action: "đã thêm một video mới",
            datetime: "19h46 10/01/2022"
        },
        {
            id: 7,
            name: 'Nguyễn Bá Đức',
            avatar: require('../images/Store_local_image/anhduc.png'),
            action: "đã thêm 3 ảnh mới",
            datetime: "17h20 10/01/2022"
        },
    ];

    const onpress = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.headerview}>
                <Text style={styles.header}> Thông báo </Text>
            </View>
            {
                data.map((l, i) => (
                    <ListItem key={i} bottomDivider >
                        <Avatar source={l.avatar} size={60} rounded />
                        <ListItem.Content>
                            <View style={styles.content_comment}>
                                <ListItem.Title
                                    style={styles.content_comment_name}>{l.name}
                                </ListItem.Title>
                                <ListItem.Title
                                    style={styles.content_comment_action}>{l.action}
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
        // fontWeight: 'bold',
        fontSize: 30,
        color: theme.colors.logo
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