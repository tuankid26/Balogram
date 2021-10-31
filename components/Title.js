import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from './core/theme'

export default function Title(props) {
    return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
    header: {
        fontSize: 50,
        color: theme.colors.logo,
        paddingBottom: 100,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
})