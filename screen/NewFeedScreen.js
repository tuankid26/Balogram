import React, { useState, useEffect, version } from 'react'
import { StyleSheet, View, Text, Image, FlatList, StatusBar, Dimensions, Button, Pressable } from 'react-native'
import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons, Octicons } from 'react-native-vector-icons';
import FeedImage from '../images/Store_local_image/anhquan.jpg';
import FeedImage1 from '../images/Store_local_image/anh2.jpg';
import FeedImage2 from '../images/Store_local_image/anh3.jpg';
// import video from '../images/1.mp4'
// import Video from 'react-native-video';
import { theme } from '../components/core/theme'
import Modal from "react-native-modal";
const { width } = Dimensions.get('window')

import {
    LinePartition,
    Comment,
    Slider
}
    from '../components'
import { NavigationContainer } from '@react-navigation/native';

export default function NewFeedScreen({ navigation }) {
    const DATA_demo_posts = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Post 1',
            user_name: "Hoang Huy Quan",
            content: "alo 1234 alo 1234"
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Chao em anh dung day tuy chieu',
            user_name: "Bui Manh Tuan",
            content: "alo 1234 alo 1234"
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Anh la Quan cuto',
            user_name: "Tung gay lo",
            content: "alo 1234 alo 1234"
        },
    ];
    const images = [
        FeedImage,
        FeedImage1,
        FeedImage2
    ]
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
    const onSearchPress = () => {
        navigation.navigate("SearchScreen")
    }


    const renderItem = (item) => {
        return (
            <View style={styles.containerPost}>
                <View style={styles.containerPostHeader}>
                    <View style={styles.containerUser}>
                        <Avatar
                            size={40}
                            rounded
                            source={FeedImage}
                            containerStyle={{ marginLeft: 5, marginTop: 5 }}
                        />
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text style={styles.containerUserName}>{item.user_name}</Text>
                            <Text style={styles.containerHour}>10 giờ trước</Text>
                        </View>
                    </View>
                    <View style={styles.optionDot}>
                        <MaterialCommunityIcons name="dots-vertical" style={styles.dotStyle} onPress={toggleModal} />
                    </View>
                </View>
                <View style={styles.containerFeed}>
                    <Text>
                        {item.content}
                    </Text>
                    <View style={styles.containerImage}>
                        <Slider item={images} index={0} />
                        <Text></Text>
                    </View>

                    <View style={styles.containerReact}>
                        <Text style={styles.numberReact}>10 lượt thích</Text>
                        <View style={styles.reactIconBox}>
                            <MaterialCommunityIcons name="heart-outline" style={styles.reactIcon} />
                            <Octicons name="comment" style={styles.reactIcon} onPress={() => navigation.navigate('CommentScreen')} />
                        </View>
                        <Text style={styles.comment}
                        // onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}
                        >
                            View Comments...
                        </Text>
                        <Comment />
                    </View>
                </View>

            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={theme.colors.white}
                barStyle="dark-content"
            />
            <View style={styles.headerBar}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>BaloGram</Text>
                </View>
                <View style={styles.headerRight}>
                    <Ionicons name="md-search-outline" style={styles.icon} onPress={onSearchPress} />
                    <MaterialCommunityIcons name="plus-box-outline" style={styles.icon} color='#59B7EC' onPress={() => navigation.navigate('NewPostScreen')} />
                </View>
            </View>
            {/* <LinePartition color={theme.colors.background} /> */}
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={isModalVisible}
                    animationIn='slideInUp'
                    style={styles.modal}
                >
                    <View>
                        <Pressable style={styles.button} onPress={toggleModal}>
                            <Text style={styles.text}>Chỉnh sửa bài đăng</Text>
                        </Pressable>
                        <LinePartition color={theme.colors.silver} />
                        <Pressable style={styles.button} onPress={toggleModal}>
                            <Text style={styles.text}>Xóa bài đăng</Text>
                        </Pressable>
                        <LinePartition color={theme.colors.silver} />
                        <Pressable style={styles.button} onPress={toggleReportModal}>
                            <Text style={styles.text}>Báo xấu</Text>
                        </Pressable>
                    </View>
                </Modal>
                <Modal
                    isVisible={isModalReportVisible}
                    animationIn='slideInUp'
                    style={styles.modal}
                >
                    <View>
                        <Text title="Lý do báo xấu"></Text>
                        <Pressable style={styles.button} onPress={toggleReportModal}>
                            <Text style={styles.text}>Nội dung nhạy cảm</Text>
                        </Pressable>
                        <LinePartition color={theme.colors.silver} />
                        <Pressable style={styles.button} onPress={toggleReportModal}>
                            <Text style={styles.text}>Làm phiền</Text>
                        </Pressable>
                        <LinePartition color={theme.colors.silver} />
                        <Pressable style={styles.button} onPress={toggleReportModal}>
                            <Text style={styles.text}>Lừa đảo</Text>
                        </Pressable>
                        <LinePartition color={theme.colors.silver} />
                        <Pressable style={styles.button} onPress={toggleReportModal}>
                            <Text style={styles.text}>Nhập lý do khác</Text>
                        </Pressable>
                    </View>
                </Modal>
                {/* <View>
                    <Video source={video}></Video>
                </View> */}
                {/* <Video source={{ uri: './/images/1.mp4' }}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo} /> */}
                <FlatList
                    // numColumns={1}
                    // horizontal={false}
                    data={DATA_demo_posts}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    numberReact: {
        fontSize: 18
    },
    button: {
        backgroundColor: theme.colors.white,
        color: theme.colors.black,
        width: width,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: theme.colors.black,
    },
    dotStyle: {
        fontSize: 25,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    dotSlideStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    containerPostHeader: {
        flexDirection: 'row',
    },
    optionDot: {
        backgroundColor: theme.colors.white,
        flex: 2 / 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerImage: {
        flex: 1,
        // borderColor: 'red',
        // borderWidth: 2,
    },
    containerReact: {
        flex: 2,
        // borderColor: 'red',
        // borderWidth: 2,
        paddingBottom: 15
    },
    headerBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
    },

    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    containerPost: {
        borderWidth: 1,
        borderColor: theme.colors.background,
        borderRadius: 7,
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
        color: theme.colors.black,
        fontSize: 16,
        marginLeft: 5,
        // borderColor: 'red',
        // borderWidth: 1,
        // marginTop: 12,
        // alignItems:'flex-start'
    },
    containerHour: {
        color: '#838383',
        fontSize: 14,
        marginLeft: 5,
    },
    containerFeed: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.white,
        flex: 1,
    },
    image: {
        flex: 1,
        width: width * 150 / 100,
        height: width * 200 / 100,
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
        marginLeft: 10,
        fontWeight: 'bold'
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
    },
    reactIcon: {
        fontSize: 30,
        margin: 10
    }
})
