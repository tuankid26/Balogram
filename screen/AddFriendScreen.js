import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { data } from "../log_data/data.js";
import { theme } from "../components/core/theme";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import {
    AcceptFriend,
    BackButton
} from "../components";
const { width } = Dimensions.get("window");

export default function AddFriendScreen({ navigation }) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <View style={styles.backScreen}>
                    <BackButton goBack={navigation.goBack} />
                </View>
                <Text style={styles.title}>Yêu cầu kết bạn</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <AcceptFriend item={item} />}
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