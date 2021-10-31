import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native'

export default function Comment() {
    const comments = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            user: {
                name: 'Bmtuan',
            },
            text: "123123123 sfs"
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed8-3ad53abb28ba',
            user: {
                name: 'Duong',
            },
            text: "put your hand up"
        },
    ];
    return (
        <View style={styles.comment}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View style={styles.viewText}>
                        {item.user !== undefined ?
                            <Text style={styles.username}>
                                {item.user.name}
                            </Text>

                            : null}
                        <Text>: </Text>
                        <Text>{item.text}</Text>
                    </View>
                )}
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