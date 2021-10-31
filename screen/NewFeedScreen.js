import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, StatusBar } from 'react-native'
import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons, Octicons } from 'react-native-vector-icons';
import FeedImage from '../images/Store_local_image/anhquan.jpg';
import { theme } from '../components/core/theme'

import {
    LinePartition,
    Comment
}
    from '../components'

export default function NewFeedScreen(props) {
    const DATA_demo_posts = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Post 1',
            user_name: "Hoang Huy Quan"
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Chao em anh dung day tuy chieu',
            user_name: "Bui Manh Tuan"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Anh la Quan cuto',
            user_name: "Tung gay lo"
        },
    ];


    const onLikePress = (userId, postId) => {

    }
    const onDislikePress = (userId, postId) => {

    }
    return (
        <View style={styles.containerbackground}>
            <StatusBar
                backgroundColor={theme.colors.onSurface}
                barStyle="light-content"
            />
            <View style={styles.headerBar}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>BaloGram</Text>
                </View>
                <View style={styles.headerRight}>
                    <Ionicons name="md-search-outline" style={styles.icon} />
                    <MaterialCommunityIcons name="plus-box-outline" style={styles.icon} />
                </View>
            </View>
            <LinePartition color={theme.colors.background} />
            <View>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={DATA_demo_posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerPost}>
                            <View style={styles.containerUser}>
                                <Avatar
                                    size={40}
                                    rounded
                                    source={FeedImage}
                                    containerStyle={{ marginLeft: 5, marginTop: 5 }}
                                />
                                <Text style={styles.containerUserName}>{item.user_name}</Text>
                            </View>
                            <View
                                style={styles.containerFeed}>
                                <Image
                                    style={styles.image}
                                    source={FeedImage}
                                />
                                <View style={styles.reactIconBox}>
                                    <MaterialCommunityIcons name="heart-outline" style={styles.reactIcon} />
                                    <Octicons name="comment" style={styles.reactIcon} />
                                </View>
                                <Comment />
                                <Text style={styles.comment}
                                // onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}
                                >
                                    View Comments...
                                </Text>
                            </View>
                        </View>

                    )}

                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    headerBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
    },
    containerPost: {
        borderWidth: 1,
        borderColor: theme.colors.background,
        borderRadius: 7,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerUser: {
        flex: 1,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
    },
    containerUserName: {
        fontStyle: 'normal',
        color: theme.colors.black,
        fontSize: 18,
        marginLeft: 5,
        marginTop: 12,
    },

    containerFeed: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.white,
    },
    image: {
        flex: 1,
        width: 400,
        height: 550,
        resizeMode: 'contain'
    },
    avatarImage: {
        flex: 1,
        width: 40,
        height: 55,
        resizeMode: 'contain',
    },
    comment: {
        color: theme.colors.secondary,
        fontSize: 15,
        marginLeft: 10
    },
    title: {
        fontSize: 25,
        marginLeft: 10,
        color: theme.colors.logo
    },
    icon: {
        fontSize: 25,
        marginRight: 15
    },
    reactIconBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'red'
    },
    reactIcon: {
        fontSize: 30,
        margin: 10
    }
})