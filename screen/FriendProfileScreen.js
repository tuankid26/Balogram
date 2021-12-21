import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    Pressable,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons, Octicons, Entypo, FontAwesome, MaterialIcons } from 'react-native-vector-icons';
import {
    Comment,
    Slider,
}
    from '../components'
const { width, height } = Dimensions.get("screen");
import { theme } from "../components/core/theme";
import { useSelector } from 'react-redux';
import { post, auth, search } from "../handle_api";
export default function FriendProfile({ route, navigation }) {
    const [datapost, setDatapost] = useState("");
    const [isFriend, setIsFriend] = useState()
    const phonenumber = route.params.item.phonenumber
    const [info, setInfo] = useState()
    const Friend_ID = route.params.item._id
    const username = useSelector(state => state.infoReducer.username);
    const token = useSelector(state => state.authReducer.token)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isProfileModalVisible, setProFileModalVisible] = useState(false);
    const toggleModal = (item) => {
        setModalVisible(!isModalVisible);
        setToggleItem(item);
    };
    const viewInfo = () => {
        setProFileModalVisible(true)
    }
    useEffect(() => {
        auth.getUser(token, Friend_ID)
            .then(res => {
                setInfo(res.data.data)
            })
            .catch(error => {
                console.log("Failed2")
            })
        search.search(token, phonenumber)
            .then(res => {
                const f = res.data.strange.filter(({ _id }) => _id == Friend_ID)
                f.length == 0 ? setIsFriend(true) : setIsFriend(false)
            })
            .catch(error => {
                console.log(error)
                console.log("Failed1")
            })

        post.getListPost_newfeed(token, Friend_ID)
            .then(res => {
                isFriend && isFriend == true ?
                    setDatapost(res.data.data.reverse()) : setDatapost([]);
            })
            .catch(error => {
                console.log("Failed")
            })
    }, [])
    const ProfileModal = () => {
        return (
            <Modal Modal
                isVisible={isProfileModalVisible}
                onBackdropPress={() => setProFileModalVisible(false)
                }
                style={styles.content}
            >
                <View style={{ height: '40%', backgroundColor: '#D0FFFF', marginTop: 100 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <FontAwesome name="user" size={25} color='#8FCCE5' />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}>Tên người dùng: </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{info && info.username}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <FontAwesome name="transgender" size={25} color='#FABEBE' />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}>Giới tính: </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{info && info.gender}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <FontAwesome name="birthday-cake" size={25} color='#DC5353' />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}>Ngày sinh: </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{info && info.birthday}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <MaterialIcons name="description" size={25} color='#E4D865' />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}>Mô tả: </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{info && info.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <MaterialCommunityIcons name="home-city" size={25} color='#72BB4F' />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}>Thành phố: </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{info && info.address}</Text>
                    </View>
                </View>
            </Modal >

        )
    }

    const Profile = () => {
        return (
            <View style={styles.container}>
                <View>
                    <View style={{ position: 'absolute', zIndex: 999, flexDirection: 'row' }}>
                        <View>
                            <TouchableOpacity onPress={navigation.goBack}>
                                <Ionicons name='arrow-back' size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} >
                            <TouchableOpacity >
                                <Entypo name='dots-three-horizontal' size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image
                        style={styles.background}
                        source={{
                            uri: "https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg",
                        }}
                    />
                    <View style={styles.avatar}>
                        <Avatar.Image
                            size={120}
                            source={{
                                uri: "https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg",
                            }}
                            style={{ position: "absolute" }}
                        />
                    </View>
                </View>
                {
                    info &&
                    <View style={styles.containerInfo}>
                        <Text style={{ fontSize: 28, textAlign: "center", fontWeight: "500" }}>
                            {info.username}
                        </Text>
                        <Text style={styles.intro}> {info.description} </Text>
                    </View>
                }
                {
                    isFriend && isFriend == true ?
                        <View>
                            <View style={styles.containerGallery}>
                                <View style={{ width: '50%', alignItems: 'center', left: 20 }}>
                                    <Text style={{ fontSize: 20, borderWidth: 1, borderColor: 'green', width: 80, textAlign: 'center', borderRadius: 10 }}>Bạn bè</Text>
                                </View>
                                <View style={{ alignItems: 'center', width: '50%', right: 20 }}>
                                    <Text style={{ fontSize: 20, borderWidth: 1, borderColor: '#9A4747', width: 80, textAlign: 'center', borderRadius: 10 }}>Nhắn tin</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }} onPress={viewInfo}>
                                <Entypo name="dots-three-horizontal" size={20} />
                                <Text style={{ marginLeft: 10, fontSize: 20 }}>Thông tin giới thiệu</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <View style={styles.containerGallery}>
                                <View>
                                    <Text style={{ fontSize: 20, borderWidth: 1, borderColor: 'green', width: 80, textAlign: 'center', borderRadius: 10 }}>Kết bạn</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'center', fontStyle: 'italic', color: '#9A4747' }}>Không thể xem nhật ký của người lạ</Text>
                            </View>
                        </View>
                }
                <View style={{ padding: 5, backgroundColor: 'white' }}>
                    <Text style={{ fontSize: 20, backgroundColor: '#BFE5F5', width: 85, borderRadius: 10, paddingLeft: 8 }}>Nhật ký</Text>
                </View>
            </View >
        )
    }

    const splitDateTime = (raw_date) => {
        // 2021-11-14T17:16:51.653Z
        const list_text = raw_date.split(":");
        const l_date_hour = list_text[0].split("T")
        const date = l_date_hour[0];
        const hour_minute = l_date_hour[1] + ":" + list_text[1];
        const new_text = date + " lúc " + hour_minute;
        return new_text;
    }
    const onLikePress = (userId, postId) => {
        setDatapost([...datapost].map(object => {
            const isLikeTmp = object.isLike;
            // Handle list like and status liked
            if (object._id === postId) {

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
    const onComment = (postId, userId) => {
        navigation.navigate('CommentScreen', { postId: postId, userId: userId });
    }
    const renderItem = (item) => {
        const date_time = splitDateTime(item.updatedAt.toString());

        const num_like = item.like.length;
        const text_like = num_like + " lượt thích";
        const itemIsLike = item.isLike;
        return (
            <View style={styles.containerPost}>
                <View style={styles.containerPostHeader}>
                    <View style={styles.containerUser}>
                        {/* <Avatar
              size={40}
              rounded
              source={'../images/Store_local_image/bmt.jpg'}
              containerStyle={{ marginLeft: 5, marginTop: 5 }}
            /> */}
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text style={styles.containerUserName}>{item.author.username}</Text>
                            <Text style={styles.containerHour}>
                                {date_time}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.optionDot}>
                        <MaterialCommunityIcons name="dots-vertical" style={styles.dotStyle}
                            onPress={() => toggleModal(item)}
                        />
                    </View>
                </View>
                <View style={styles.containerFeed}>
                    <Text style={styles.described}>
                        {item.described}
                    </Text>
                    <View style={styles.containerImage}>
                        <Slider
                            item={item.images}
                            index={0}
                        />
                    </View>

                    <View style={styles.containerReact}>
                        <Text style={styles.numberReact}>{text_like}</Text>
                        <View style={styles.reactIconBox}>
                            <Pressable
                                onPress={() => onLikePress(item.userCall, item._id)}
                            >
                                <MaterialCommunityIcons
                                    name={itemIsLike ? "heart" : "heart-outline"}
                                    style={styles.reactIcon}
                                    color={itemIsLike ? "red" : "black"}
                                />
                            </Pressable>
                            <Octicons name="comment" style={styles.reactIcon}
                                onPress={() => onComment(item._id, item.author._id)}
                            />
                        </View>
                        <Text style={styles.comment}
                            onPress={() => onComment(item._id)}
                        >
                            View Comments...
                        </Text>
                        <Comment postID={item._id} />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View
            style={{ flex: 1 }}
        >
            {/* <Modal
                visible={isModalVisible}
                animationIn='slideInUp'
                transparent={true}
            >
                <View style={styles.modal}>
                     <View >
                        <Pressable style={styles.button} onPress={toggleEditPost}>
                            <Text style={styles.text}>Chỉnh sửa bài đăng</Text>
                        </Pressable>
                        <LinePartition color={theme.colors.silver} />
                        <Pressable style={styles.button} onPress={toggleDeletePost}>
                            <Text style={styles.text}>Xóa bài đăng</Text>
                        </Pressable>
                        <LinePartition color={theme.colors.silver} />
                    </View> 
                </View>
            </Modal > */}
            <ProfileModal />
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={datapost}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item) => item._id.toString()}
                    ListHeaderComponent={Profile} />
            </SafeAreaView>
        </View >
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20,
        top: height * 0.08,
    },
    background: {
        height: 250,
        position: "relative",
    },
    title: {
        fontSize: 25,
        marginLeft: 10,
        color: theme.colors.logo,
    },
    icon: {
        fontSize: 25,
        marginRight: 15,
    },
    iconImage: {
        fontSize: 30,
        padding: 6,
        color: '#2FDD92',
        marginLeft: 15
    },
    avatar: {
        justifyContent: "center",
        alignItems: "center",
    },
    containerGallery: {
        flex: 1,
        marginTop: 50,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center'

    },
    containerStatus: {
        flexDirection: "row",
        backgroundColor: "white",
        height: 43,
        justifyContent: 'space-evenly',
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
    },
    headerBar: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.white,
    },

    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    status: {
        marginTop: 5,
        fontSize: 22,
        fontWeight: '400',
        color: '#787A91',
        flex: 4 / 5,
        borderRightWidth: 0.5,
        borderRightColor: '#787A91',
    },
    intro: {
        color: "#2F80ED",
        textAlign: "center",
        fontSize: 15,
        opacity: 0.8,
        marginTop: 5,
    },
    described: {
        marginLeft: 7,
        fontSize: 18,
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
        alignItems: 'center',
        flex: 1,
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
    },
    containerReact: {
        flex: 2,
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
    containerUser: {
        flex: 1,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
    },
    containerUserName: {
        color: theme.colors.black,
        fontSize: 16,
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
});


