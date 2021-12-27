import React from "react";
import { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Dimensions ,TouchableOpacity} from "react-native";
import {
    FriendActive,
    LinePartition
} from "../components";
import { theme } from "../components/core/theme";
import { useIsFocused } from '@react-navigation/native';
import {  Ionicons } from "react-native-vector-icons";
const { width } = Dimensions.get("window");
import {friend} from "../handle_api";
import { useSelector } from 'react-redux';
export default function FriendScreen({ navigation }) {
    const [datafriend, setDataFriend] = useState([]);
    const token = useSelector(state => state.authReducer.token);
    const isFocused = useIsFocused();
    useEffect(() => {
        friend.getListFriend(token)
            .then(res => {
                if(isFocused) setDataFriend(res.data.data.friends);
            })
            .catch(error => {
                console.log("Failed");
                console.log(error);
            })

    }, [isFocused]);

    const onSearchPress = () => {
        navigation.navigate("SearchScreen")
    }

    const noFriend = () => {
        if (datafriend.length == 0)
        return (
            <View style={styles.noF}>
                <View >
                    <Text style={styles.textNoF}>Chưa có người bạn nào!</Text>
                </View>
                <View style={{  width: width/2, padding:10}}>
                <TouchableOpacity style={styles.buttonNoF} onPress={onSearchPress}>
                    <Text style={styles.textNoF2}>Tìm bạn mới</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
        else {
            return (
            <FlatList 
                data={datafriend}
                renderItem={({ item }) => <FriendActive item={item} />}
                keyExtractor={(item) => item._id.toString()}
            />);
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerBar}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>BaloGram</Text>
                </View>
                <View style={styles.headerRight}>
                    <Ionicons name="md-search-outline" style={styles.icon} onPress={onSearchPress} />
                    <Ionicons name="person-add-outline" style={styles.icon} onPress={() => navigation.navigate('AddFriendScreen')} />
                </View>
            </View>
            <LinePartition color={theme.colors.silver} />
            <View >{noFriend()}</View>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
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
    wrapper: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: theme.colors.header,
    },
    addFriend: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    icon: {
        fontSize: 25,
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        color: theme.colors.logo,
        padding: 20,
    },
    textNoF: {
        fontSize: 24,
        color: theme.colors.logo,
        
    },
    textNoF2: {
        fontSize: 26,
        color: theme.colors.logo,
        
    },
    buttonNoF: {
        backgroundColor: '#CDF2CA',
        height:width/9,
        alignItems: "center",
        borderRadius:10,
    },
    noF: {
        flexDirection: 'column',
        alignItems: "center",
        paddingTop: width/2,
        
    },
    
});
