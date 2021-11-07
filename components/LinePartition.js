import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function LinePartition(props) {
    return <View

        style={{
            borderBottomColor: props.color,
            borderBottomWidth: 1
        }}
    />
}