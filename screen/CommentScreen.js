import React, { Component } from 'react'
import { View, FlatList, Text, TextInput, TouchableOpacity } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import { data2 } from '../log_data/data2.js'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const { width } = Dimensions.get('window')
import { useState } from 'react'
import {
    BackButton,
    ItemComment
}
    from '../components'


export default function CommentScreen({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("")


    const onback = () => {
        navigation.navigate("MainScreen");
    }




    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>

                <BackButton goBack={navigation.goBack} />
                <Text style={styles.title}>Bình luận</Text>


            </View>
            <View style={styles.body}>
                <FlatList
                    // ref={"flatList"}
                    data={data2}
                    renderItem={({ item }) => (
                        <ItemComment item={item} />
                    )}
                    keyExtractor={(item) => item.id.toString()} // tránh trùng các item với nhau
                // parentFlatList={this} //để lát làm swipe left và swipe right
                />
            </View>
            <View style={styles.inputForm}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="image" style={styles.icon2} size={30} />
                </TouchableOpacity>

                <TextInput style={styles.input}
                    placeholder='comment...'
                    onChangeText={(text) => setText(text)}
                    multiline={true}
                    numberOfLines={1}
                />
                <TouchableOpacity>
                    <MaterialCommunityIcons name="send" style={styles.icon} size={30} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: "column"
    },
    body: {
        flex: 20,

    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'blue',
        padding: 20,
        paddingLeft: 135,
        marginBottom: 5
    },
    header: {
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 20,
        flex: 1
    },
    icon: {
        color: "blue",
        fontSize: 40,
        padding: 10
    },
    icon2: {
        color: "black",
        fontSize: 40,
        padding: 5,
        paddingLeft: 0
    },
    inputForm: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingBottom: 15,
        borderTopWidth: 1,
        paddingTop: 12
    },
    input: {
        flex: 1,
        paddingTop: 3,
        paddingRight: 10,
        paddingBottom: 3,
        paddingLeft: 10,
        color: '#424242',
        borderStyle: null,
        fontSize: 26
    },
}
)