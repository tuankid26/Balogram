import React from "react";
import { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import {
    FriendActive,
    LinePartition
} from "../components";
import { theme } from "../components/core/theme";
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from "react-native-vector-icons";
const { width } = Dimensions.get("window");
import { friend } from "../handle_api";
import { useSelector } from 'react-redux';
export default function FriendScreen({ navigation }) {
    const [dataFriend, setDataFriend] = useState([]);
    const token = useSelector(state => state.authReducer.token);
    const isFocused = useIsFocused();
    useEffect(() => {
        friend.getListFriend(token)
            .then(res => {
                if (isFocused) setDataFriend(res.data.data.friends);
            })
            .catch(error => {
                console.log("Failed");
                console.log(error);
            })

    }, [isFocused]);

    const onSearchPress = () => {
        navigation.navigate("SearchScreen")
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
            <FlatList
                data={dataFriend}
                renderItem={({ item }) => <FriendActive item={item} />}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
   
    wrapper: {
        // flex: 1,
        // backgroundColor: "white",
    },

    addFriend: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    headerBar: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.white,
        height : 40,
      },
    
      headerLeft: {
        flex: 1,
      },
      headerRight: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
      },
      title: {
        fontSize: 30,
        color: theme.colors.logo,
        padding: 20,
      },
      icon: {
        fontSize: 25,
        marginRight: 15,
      },
    
});