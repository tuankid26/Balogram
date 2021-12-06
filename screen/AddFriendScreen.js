import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { data }  from "../log_data/data.js" ;
import { theme } from "../components/core/theme";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import {
    AcceptFriend,
    BackButton
} from "../components";
const { width } = Dimensions.get("window");
import {friend} from "../handle_api";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'



export default function AddFriendScreen({ navigation }) {
    
    const [datafriend, setDataFriend] = useState([]);
    const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZhbmgxIiwiaWQiOiI2MWFjNjIxOTM1MDBlNTFjYjBhNjBhODAiLCJpYXQiOjE2Mzg2ODcyNTd9.QDeEosuZsf6BiZ-vpouXTAuWhiaTvbDHeI2-aXMKnTo";
    const token = useSelector(state => state.authReducer.token);
    useEffect(() => {
        console.log("datafriend.length");
        console.log(datafriend.length);
        friend.getRequestFriend(token)
            .then(res => {
                // console.log(datafriend.length);
                // console.log("datafriend.length");
                // console.log(datafriend);
                const curRequest = result.data.data.friends;
                setDataFriend(curRequest);
                // setDataFriend(res.data.data.reverse());
                
            })
            .catch(error => {
                console.log("Failed")
            })

    }, []);

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
                
                renderItem={({ item }) => <AcceptFriend item={item} />}
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
});
