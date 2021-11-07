import React, { Component } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import { data } from '../log_data/data.js'
import Item_Messenger from '../components/Item_Messenger'
import {
    LinePartition,
}
    from '../components'
const { width } = Dimensions.get('window')
import { theme } from '../components/core/theme'
import { Ionicons } from 'react-native-vector-icons';
export default function MainMessengerScreen({ navigation }) {

    const renderItem = (item) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("ChatMessengerScreen", { item })
                        console.log('test')

                    }}
                >
                    <Item_Messenger item={item} />
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.headerBar}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>BaloGram</Text>
                </View>
                <View style={styles.headerRight}>
                    <Ionicons name="md-search-outline" style={styles.icon} />
                </View>

            </View>
            <LinePartition color={theme.colors.black} />
            {/* <View>
                <Text style={styles.title}>Messenger</Text>
            </View> */}
            <FlatList
                // ref={"flatList"}
                data={data}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.id.toString()} // tránh trùng các item với nhau
            // parentFlatList={this} //để lát làm swipe left và swipe right
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.logo,
        padding: 20
    },
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
    icon: {
        fontSize: 25,
        marginRight: 15
    },
}
)