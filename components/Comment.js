import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native'
import { comment } from '../handle_api';
import { useSelector } from 'react-redux';
export default function Comment(params) {
    const [comments, setComment] = useState([]);
    const token = useSelector(state => state.authReducer.token);
    const postID = params.postID
    useEffect(() => {
        comment.listComment(token, postID)
            .then((res) => {
                setComment(res.data.data);
            })
            .catch((error) => console.log(error));
    }, [])

    const short_list_cmt = comments.filter((_, index) => {
        return index < 2
    })

    return (
        <View style={styles.comment}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={short_list_cmt}
                renderItem={({ item }) => (
                    <View style={styles.viewText}>
                        <Text style={styles.username}>
                            {item.user.username}
                        </Text>
                        <Text>: {item.content}</Text>
                    </View>
                )}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    comment: {
        marginLeft: 10
    },
    viewText: {
        flexDirection: 'row'
    },
    username: {
        fontWeight: 'bold'
    }
})