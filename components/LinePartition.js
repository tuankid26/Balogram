import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function LinePartition(color) {
    return <View
        style={{
            borderBottomColor: color,
            borderBottomWidth: 1
        }}
    />
}