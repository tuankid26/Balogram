import React, { useState, useEffect, version, useCallback } from 'react'
import {
    StyleSheet, View, Text, Image,
    FlatList, StatusBar, Dimensions,
    Button, Pressable, RefreshControl,
    TouchableWithoutFeedback
} from 'react-native'

import FeedImage from '../images/Store_local_image/anhquan.jpg';

import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons, Octicons } from 'react-native-vector-icons';
import { theme } from '../components/core/theme'
import Modal from "react-native-modal";
import { post } from "../handle_api";
import { useSelector, useDispatch } from 'react-redux';
import { uploadActions } from '../redux/actions';
import {PostsHelper} from '../helpers';
const { width } = Dimensions.get('window')

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

import {
    LinePartition,
    Comment,
    Slider
}
    from '../components'
import { NavigationContainer } from '@react-navigation/native';



export default function NewFeedScreen({ navigation }) {
    const [datapost, setDatapost] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [toggleItem, setToggleItem] = useState("");
    const [doubleTouch, setDoubleTouch] = useState(0);
    const token = useSelector(state => state.authReducer.token);
    const uploadStatus = useSelector((state) => {
        return state.upload;
    });
    const dispatch = useDispatch();

    const onLikePress = (userId,postId) => {
        // const convertDatapost = PostsHelper.SetLike(userId, postId, datapost);
        // setDatapost(convertDatapost);
        setDatapost([...datapost].map(object => {
            const isLikeTmp = object.isLike;
            // Handle list like and status liked
            if(object._id === postId) {

                let arrLike = object.like;
                let arrLikeNotContainCurrentUser = arrLike.filter((item) => {
                    return item != userId
                });
                if (arrLikeNotContainCurrentUser.length === arrLike.length) {
                    arrLike.push(userId);
                } else {
                    arrLike = arrLikeNotContainCurrentUser;
                }

              return {
                
                ...object,
                "isLike": !isLikeTmp,
                "like": arrLike
              }
            }
            else return object;
        }));

        const data = {
            "postId": postId,
            "token": token
        }
        post.actionLikePost(data)
            .then(res => {
            })
            .catch(error => {
                console.log("Failed");
                console.log(error.response.data);
            })  
    }


    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalReportVisible, setModalReportVisible] = useState(false);
    const toggleModal = (item) => {
        setModalVisible(!isModalVisible);
        setToggleItem(item);

    };

    const toggleEditPost = () => {
        setModalVisible(!isModalVisible);
        navigation.navigate("EditPostScreen", { toggleItem });

    }

    const toggleDeletePost = async () => {
        setModalVisible(!isModalVisible);
        const data = {
            "postId": toggleItem._id,
            "token": token
        }
        try{

        const res = await post.deletePost(data);
        fetchPosts();

        } catch (err){
            console.log(err);
        }

    }


    const toggleReportModal = () => {
        setModalReportVisible(!isModalReportVisible);
        setModalVisible(false)
    }
    const onSearchPress = () => {
        navigation.navigate("SearchScreen")
    }

    const fetchPosts = async () => {
        try {
          const dataFeed = await post.getListPost_newfeed(token);
          setDatapost(dataFeed.data.data.reverse());
          console.log("refrssssh");
        } catch (err) {
          console.log(err);
        }
    };

    



    const onRefresh = useCallback(() => {

        setRefreshing(true);
        fetchPosts();
        wait(1000).then(() => setRefreshing(false)

        );
    }, []);


    useEffect(() => {
        fetchPosts();
        

    }, []);

    useEffect(() => {
        if (uploadStatus.data) {
            fetchPosts();
          dispatch(uploadActions.resetState());
        } else if (uploadStatus.err) {
        }
        }, [uploadStatus]);

    

    const splitDateTime = (raw_date) => {
        // 2021-11-14T17:16:51.653Z
        const list_text = raw_date.split(":");
        const l_date_hour = list_text[0].split("T")
        const date = l_date_hour[0];
        const hour_minute = l_date_hour[1] + ":" + list_text[1];
        const new_text = date + " lúc " + hour_minute;
        return new_text;
    }

    const onAddPost = () => {
        navigation.navigate('NewPostScreen');
    }
    const onComment = (postId, userId) => {
        navigation.navigate('CommentScreen', { postId: postId, userId: userId });
    }
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (doubleTouch && (now - doubleTouch) < DOUBLE_PRESS_DELAY) {
          console.log("Hey");
        } else {
            setDoubleTouch(now);
        }
      }


    const renderItem = (item) => {
        const date_time = splitDateTime(item.updatedAt);
        const num_like = item.like.length;
        const text_like = num_like + " lượt thích";
        const itemIsLike = item.isLike;
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
                            <Text style={styles.containerUserName}>{item.author.username}</Text>
                            <Text style={styles.containerHour}>{date_time}</Text>
                        </View>
                    </View>
                    <View style={styles.optionDot}>
                        <MaterialCommunityIcons name="dots-vertical" style={styles.dotStyle} onPress={() => toggleModal(item)} />
                    </View>
                </View>
                {/* <TouchableWithoutFeedback onPress={handleDoubleTap}> */}
                <View style={styles.containerFeed}>
                    <Text style={styles.described}>
                        {item.described}
                    </Text>
                    
                    
                    <View style={styles.containerImage}>
                        <Slider item={item.images} index={0} />
                        <Text></Text>
                    </View>
                    

                    <View style={styles.containerReact}>
                        <Text style={styles.numberReact}>{text_like}</Text>
                        <View style={styles.reactIconBox}>
                                <Pressable onPress={() => onLikePress(item.userCall, item._id)}>
                                <MaterialCommunityIcons
                                    name={itemIsLike ? "heart" : "heart-outline"}
                                    style={styles.reactIcon}
                                    color={itemIsLike ? "red" : "black"}
                                />
                                </Pressable>
                            
                            <Octicons name="comment" style={styles.reactIcon} onPress={() => onComment(item._id, item.author._id)} />
                        </View>
                        <Text style={styles.comment}
                            onPress={() => onComment(item._id)}
                        >
                            View Comments...
                        </Text>
                        {/* <Comment postID={item._id} /> */}
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
                    <MaterialCommunityIcons name="plus-box-outline" style={styles.icon} color='#59B7EC' onPress={onAddPost} />
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
                        <Pressable style={styles.button} onPress={toggleEditPost}>
                            <Text style={styles.text}>Chỉnh sửa bài đăng</Text>
                        </Pressable>
                        <LinePartition color={theme.colors.silver} />
                        <Pressable style={styles.button} onPress={toggleDeletePost}>
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

                <FlatList
                    // numColumns={1}
                    // horizontal={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    initialNumToRender={7}
                    data={datapost}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item) => item._id.toString()}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    described:{
        marginLeft: 7,
        fontSize: 18,
        // fontFamily: 'San Francisco',
        // fontWeight: 'bold',
    },  
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    numberReact: {
        marginLeft: 7,
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
        fontSize: 24,
        color: theme.colors.logo,
        padding: 20,
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