import React, { Component } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import {data} from '../log_data/data.js'
import Item_Messenger from '../components/Item_Messenger'
const { width } = Dimensions.get('window')

export default function MainMessengerScreen({ navigation }) {

    const renderItem = (item) => {
        return (
          <TouchableOpacity
            onPress={() => {
            navigation.navigate("ChatMessengerScreen", {item})
            console.log('test')
 
           }}
           >
               <Item_Messenger item={ item } />
               </TouchableOpacity>
             );
    }
    return(
        <View style={styles.wrapper}>
            <View>
                <Text style={styles.title}>Messenger</Text>
            </View>
            <FlatList
                // ref={"flatList"}
                data={ data }
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.id.toString() } // tránh trùng các item với nhau
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
        color: 'black',
        padding: 20
    }
    }
    )
