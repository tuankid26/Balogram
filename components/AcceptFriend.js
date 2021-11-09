import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
const { width } = Dimensions.get("window");
export default class AcceptFriend extends Component {
    render() {
        const { item } = this.props;

        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.bgAvatar}>
                        <Avatar.Image size={45} source={item.avatar} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={styles.accept}>
                        <Button icon='check' style={styles.confirm}> Đồng ý </Button>
                        <Button icon='close' style={styles.reject}> Từ chối </Button>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 65 }} />
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
