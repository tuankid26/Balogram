import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
import { ipServer } from "../handle_api/ipAddressServer";
import DefaultAvatar from '../images/avatar/default-avatar-480.png';

class Item_Messenger extends Component {

    render() {
        const { item } = this.props
        const { isBlock } = this.props
        const avatar = item.avatar;
        return (
            <View style={styles.container}>
                <View style={styles.bgAvatar}>
                    {
                        avatar
                            ?
                            <Image
                                source={{ uri: `${ipServer}${avatar.fileName}` }}
                                style={styles.avatar}
                            />
                            :
                            <Image
                                source={DefaultAvatar}
                                style={styles.avatar}
                            />


                    }

                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    {isBlock ? <Text
                        style={{
                            fontStyle: "italic",
                            color: "#9A4747",
                        }}
                    >
                        Bạn đã chặn cuộc trò chuyện này
                    </Text> : <Text numberOfLines={1}>{item.text}</Text>
                    }
                </View>
                <View style={styles.bgSeen}>
                    <Image
                        source={item.avatar}
                        style={styles.avatarSeen}
                    />
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
        paddingLeft: 10,
        justifyContent: 'center'

    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
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
export default Item_Messenger;