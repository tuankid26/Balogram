import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import { data }  from "../log_data/data.js" ;
import { theme } from "../components/core/theme";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Avatar, Button, Divider } from "react-native-paper";
import {
    AcceptFriend,
    BackButton
} from "../components";
const { width } = Dimensions.get("window");
import {friend} from "../handle_api";
import { post } from "../handle_api";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'



export default function AddFriendScreen({ navigation }) {
    
    const [datafriend, setDataFriend] = useState([]);
    // const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZhbmgxIiwiaWQiOiI2MWFjNjIxOTM1MDBlNTFjYjBhNjBhODAiLCJpYXQiOjE2Mzg2ODcyNTd9.QDeEosuZsf6BiZ-vpouXTAuWhiaTvbDHeI2-aXMKnTo";
    const token = useSelector(state => state.authReducer.token);
    useEffect(() => {
        console.log("datafriend.length1");
        console.log(datafriend.length);
        post.addPost(token)
            .then(res => {
                // console.log(datafriend.length);
                // console.log("datafriend.length");
                // console.log(datafriend);
                setDataFriend(res.data.data.friends);
                // setDataFriend(res.data.data.reverse());
                
            })
            .catch(error => {
                console.log("Failed")
            })

    }, []);

    const setAcceptFriend = (userID) => {
        // setModalVisible(!isModalVisible);
        const dataAccept = {
            "user_id": userID,
            "token": token,
            "is_accept": "1",
        }
        post.editPost(dataAccept)
            .then(res => {
                console.log(res.data);
                const updateData = datafriend.filter(item => item._id !== res.data.data.sender);
                setDataFriend(updateData);
                // console.log(data.images)
            })
            .catch(error => {
                console.log("Failed");
                console.log(error.response.data);
            })

    }

    const setRemoveFriend = (userID) => {
        // setModalVisible(!isModalVisible);
        const dataRemove = {
            "user_id": userID,
            "token": token,
        }
        post.deletePost(dataRemove)
            .then(res => {
                console.log(res.data);
                const updateData = datafriend.filter(item => item._id !== res.data.data.sender);
                setDataFriend(updateData);
                // console.log(data.images)
            })
            .catch(error => {
                console.log("Failed");
                console.log(error.response.data);
            })

    }

    const renderItem = (item) => {
        console.log("item.length");
        console.log(item.username);
        console.log(item);
        return (
        <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.bgAvatar}>
                        <Avatar.Image size={45} source={'../images/Store_local_image/anh2.jpg'} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.username}</Text>
                    </View>
                    <View style={styles.accept}>
                        <Button icon='check' style={styles.confirm} onPress={() => setAcceptFriend(item._id)}> Đồng ý </Button>
                        <Button icon='close' style={styles.reject} onPress={() => setRemoveFriend(item._id)}> Từ chối </Button>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 65 }} />
            </TouchableOpacity>
        );
    }



    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <View style={styles.backScreen}>
                    <BackButton goBack={navigation.goBack} />
                </View>
                <Text style={styles.title}>Yêu cầu kết bạn</Text>
            </View>
            
             <FlatList

                data={datafriend }
                
                // renderItem={({ item }) => <AcceptFriend item={item} />}
                renderItem={({ item }) => renderItem(item)}
                // keyExtractor={(item) => item.id.toString()}
                
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
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: theme.colors.header,
    },
    icon: {
        fontSize: 25,
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        padding: 20,
        // alignSelf: "center",
    },
    container: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 8,
    },
    bgAvatar: {
        flex: 2,
    },
    info: {
        flex: 8,
        flexDirection: "column",
        paddingLeft: 5,
        justifyContent: "center",
    },
    accept: {

    },
    confirm: {
        flexDirection: 'row',
        backgroundColor: '#CDF2CA'
    },
    reject: {
        flexDirection: 'row',
        backgroundColor: '#FFADAD'
    },
    name: {
        marginLeft: 15,
        fontWeight: "bold",
        color: "black",
        fontSize: 16,
        paddingBottom: 3,
    },
});
