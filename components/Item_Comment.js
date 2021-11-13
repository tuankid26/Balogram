import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
class Item_Comment extends Component {
    render() {
        const { item } = this.props

        return (
            <View>
                <View style={styles.container}>

                    <View style={styles.bgAvatar}>
                        <Image
                            source={item.avatar}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.info}>
                        <View style={styles.inner}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.commen}>{item.description}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    inner: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 5,
        paddingRight: 13,
        borderRadius: 5
    },
    bgAvatar: {
        flex: 2,
        paddingTop: 10
    },
    avatar: {
        width: width * 12 / 100,
        height: width * 12 / 100,
        borderRadius: width * 10 / 100,
    },
    info: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: "#fff"
    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 22,
        paddingBottom: 3
    },
    commen: {
        color: 'black',
        fontSize: 18,
        paddingBottom: 3
    },
    bgSeen: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarSeen: {
        width: width * 5 / 100,
        height: width * 5 / 100,
        borderRadius: width * 2.5 / 100,
    },
}
)
export default Item_Comment;