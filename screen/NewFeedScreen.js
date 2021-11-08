import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, StatusBar } from 'react-native'
import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons, Octicons } from 'react-native-vector-icons';
import FeedImage from '../images/Store_local_image/anhduong.jpg';
import FeedImage1 from '../images/Store_local_image/anh2.jpg';
import FeedImage2 from '../images/Store_local_image/anh3.jpg';

import { theme } from '../components/core/theme'
import {Dimensions} from 'react-native';
const { width } = Dimensions.get('window')

import {
    LinePartition,
    Comment,
    Slider
}
    from '../components'
import { NavigationContainer } from '@react-navigation/native';

export default function NewFeedScreen({navigation}) {
    

    const DATA_demo_posts = [
        {
            id: 1,
            title: 'Post 1',
            user_name: "Hoang Huy Quan"
        },
        {
            id: 2,
            title: 'Chao em anh dung day tuy chieu',
            user_name: "Bui Manh Tuan"
        },
        {
            id: 3,
            title: 'Anh la Quan cuto',
            user_name: "Tung gay lo"
        }

    ];
    const images = [
        FeedImage,
        FeedImage1,
        FeedImage2
    ]

    const onSearchPress = () => {
        navigation.navigate("SearchScreen")
    }


    const onLikePress = (userId, postId) => {

    }
    const onDislikePress = (userId, postId) => {

    }
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalReportVisible, setModalReportVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleReportModal = () => {
        setModalReportVisible(!isModalReportVisible);
        setModalVisible(false)
    }


    const renderItem = (item) => {
        return (
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
                    >
                        View Comments...
                    </Text>
                </View>
            </View>
             );
    }

    return (
        <View style={styles.wrapper}>
            <StatusBar
                backgroundColor={theme.colors.onSurface}
                barStyle="dark-content"
            />
       
            <View style={styles.headerBar}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>BaloGram</Text>
                </View>
                <View style={styles.headerRight}>
                    <Ionicons name="md-search-outline" style={styles.icon} 
                    onPress = {onSearchPress}
                    />
                    <MaterialCommunityIcons name="plus-box-outline" style={styles.icon}
                    />
                </View>
            </View>
            
            <LinePartition color={theme.colors.background} />

                <FlatList
                    data={DATA_demo_posts}
                    renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.id.toString()
                }

                />
        </View>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
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
        paddingTop: 4
    },
    image: {
        flex: 1,
        width: width*150/100,
        height:  width*200/100,
        // resizeMode: 'contain'
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
