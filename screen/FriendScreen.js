import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { data } from "../log_data/data.js";
import { FriendActive } from "../components";
import { theme } from "../components/core/theme";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AddFriendScreen from "./AddFriendScreen.js";
const { width } = Dimensions.get("window");

export default function FriendScreen({ navigation }) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.title}>List Friend</Text>
                <View style={styles.addFriend}>
                    <MaterialCommunityIcons
                        name="account-plus-outline"
                        style={styles.icon}
                        onPress={() => navigation.navigate('AddFriendScreen')}
                    />
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <FriendActive item={item} />}
                keyExtractor={(item) => item.id.toString()}
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
        fontWeight: "bold",
        color: "black",
        padding: 20,
    },
});