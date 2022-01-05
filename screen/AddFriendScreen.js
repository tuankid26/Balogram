import React from "react";
import { View, FlatList, Text, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import { theme } from "../components/core/theme";
import { Avatar, Button, Divider } from "react-native-paper";
import {
    BackButton
} from "../components";
const { width } = Dimensions.get("window");
import {friend} from "../handle_api";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'



export default function AddFriendScreen({ navigation }) {
    
    const [datafriend, setDataFriend] = useState([]);
    const token = useSelector(state => state.authReducer.token);
    useEffect(() => {
        let isMounted = true; 
        friend.getRequestFriend(token)
            .then(res => {
                if (isMounted) setDataFriend(res.data.data.friends);
                
            })
            
            .catch(error => {
                if (error.response) {
                    const error = err.response.data;
                    dispatch(addError(error.message));
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            return () => { isMounted = false };

    }, []);

    const setAcceptFriend = (userID) => {
        const dataAccept = {
            "user_id": userID,
            "token": token,
            "is_accept": "1",
        }
        friend.setAcceptFriend(dataAccept)
            .then(res => {
                const updateData = datafriend.filter(item => item._id !== res.data.data.sender);
                setDataFriend(updateData);

            })
            .catch(error => {
                console.log("Failed");
                console.log(error.response.data);
            })

    }

    const setRemoveFriend = (userID) => {
        const dataRemove = {
            "user_id": userID,
            "token": token,
        }
        friend.setRemoveFriend(dataRemove)
            .then(res => {
                const updateData = datafriend.filter(item => item._id !== res.data.data.sender);
                setDataFriend(updateData);
            })
            .catch(error => {
                console.log("Failed"); 
                console.log(error.response.data);
            })

    }

    const renderItem = (item) => {
        return (
        <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.bgAvatar}>
                        <Avatar.Image size={52} source={{uri:'../images/Store_local_image/anh2.jpg'}} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.username}</Text>
                    </View>
                    <View style={styles.accept}>
                        <View style={{  width: width/4, padding:2}}>
                            <TouchableOpacity style={styles.confirm} onPress={() => setRemoveFriend(item._id)}>
                                <Text style={styles.rejText}>Đồng ý</Text>
                            </TouchableOpacity></View>
                        <View style={{  width: width/4, padding:2}}>
                            <TouchableOpacity style={styles.reject} onPress={() => setRemoveFriend(item._id)}>
                                <Text style={styles.rejText}>Từ chối</Text>
                            </TouchableOpacity></View>
                        {/* <Button  style={styles.reject} onPress={() => setRemoveFriend(item._id)}> Từ chối </Button> */}
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
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item._id.toString()}
                
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
        padding: 10,
        marginLeft:80
    },
    container: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        marginBottom:5
    },
    bgAvatar: {
        flex: 2,
        paddingTop:10,
        marginLeft:5,
    },
    info: {
        flex: 8,
        flexDirection: "column",
        paddingLeft: 5,
        justifyContent: "center",
        paddingBottom:12
    },
    accept: {

    },
    confirm: {
        flexDirection: 'row',
        backgroundColor: '#a3d13a',
        borderRadius:5,
        justifyContent:"center",
        height: width/12,
    },
    reject: {
        flexDirection: 'row',
        backgroundColor: '#d46161',
        borderRadius:5,
        justifyContent:"center",
        height: width/12,
    },
    rejText: {
        fontSize: 20,
        color: "white",
        marginRight:3,
        marginTop:2
    },
    name: {
        marginLeft: 12,
        fontWeight: "bold",
        color: "black",
        fontSize: 19,
        paddingBottom: 3,
    },
});