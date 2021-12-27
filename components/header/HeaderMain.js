import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native'
import { theme } from "../core/theme";
import {
    MaterialCommunityIcons,
    Ionicons,
  } from "react-native-vector-icons";
export default function HeaderMain(params) {
    
    const onAddPost = params.onAddPost
    const onSearchPress = params.onSearchPress
    return (
        <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Balogram</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons
            name="md-search-outline"
            style={styles.icon}
            onPress={onSearchPress}
          />
          <MaterialCommunityIcons
            name="plus-box-outline"
            style={styles.icon}
            color="#59B7EC"
            onPress={onAddPost}
          />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
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
})