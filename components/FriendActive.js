import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import { Avatar, Divider } from 'react-native-paper'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
const { width } = Dimensions.get('window')
class FriendActive extends Component {
    render() {
        const { item } = this.props

        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.bgAvatar}>
                        <Avatar.Image
                            size={45}
                            source={item.avatar}
                        />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        {/* <Divider style = {{marginTop : 12}}/> */}
                    </View>
                    <View>
                        <MaterialCommunityIcons name='message-processing-outline' style={styles.icon} />
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 65 }} />
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    icon: {
        fontSize: 30,
        marginRight: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 8,
    },
    bgAvatar: {
        flex: 2
    },
    avatar: {
        width: width * 15 / 100,
        height: width * 15 / 100,
        borderRadius: width * 10 / 100,
    },
    info: {
        flex: 8,
        flexDirection: 'column',
        paddingLeft: 5,
        justifyContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        paddingBottom: 3

    },

}
)
export default FriendActive;