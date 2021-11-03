import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react'
import { View, Text, Image ,TouchableOpacity } from 'react-native'
// import Swipeout from 'react-native-swipeout'
// import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
class Item_Messenger extends Component {

   render() {
       const {item} = this.props

       return (
               <View style={styles.container}>
                   <View style={styles.bgAvatar}>
                       <Image 
                           source={item.avatar}
                           style={styles.avatar}
                       />
                   </View>
                   <View style={styles.info}>
                       <Text style={styles.name}>{item.name}</Text>
                       <Text numberOfLines={1}>{item.description}</Text>
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
    avatar:{
        width: width*15/100,
        height: width*15/100,
        borderRadius: width*10/100,
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
        width: width*5/100,
        height: width*5/100,
        borderRadius: width*2.5/100,
    },
}
)
export default Item_Messenger;