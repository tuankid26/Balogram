import React, { Component } from "react";
import { View, Text,  TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import { data }  from "../log_data/data.js" ;
import { friend } from "../handle_api/index.js";
const { width } = Dimensions.get("window");
export default class AcceptFriend extends Component {


     setAcceptFriend = (userID) => {
        const dataAccept = {
            "user_id": userID,
            "token": token,
            "is_accept": "1",
        }
        friend.setAcceptFriend(dataAccept)
            .then(res => {
               
            })
            .catch(error => {
                console.log("Failed");
                console.log(error.response.data);
            })

    }

    setRemoveFriend = (userID) => {
        const dataRemove = {
            "user_id": userID,
            "token": token,
        }
        friend.setRemoveFriend(dataRemove)
            .then(res => {
            })
            .catch(error => {
                console.log("Failed");
                console.log(error.response.data);
            })

    }


    render() {
        const { item } = this.props;

        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.bgAvatar}>
                        <Avatar.Image size={45} source={data.avatar} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.username}</Text>
                    </View>
                    <View style={styles.accept}>
                        <Button icon='check' style={styles.confirm} onPress={() => this.setAcceptFriend(item.id)}> Đồng ý </Button>
                        <Button icon='close' style={styles.reject} onPress={() => this.setRemoveFriend(item.id)}> Từ chối </Button>
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
