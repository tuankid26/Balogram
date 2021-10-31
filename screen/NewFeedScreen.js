import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, StatusBar} from 'react-native'
import UserAvatar from 'react-native-user-avatar';
import { Avatar } from 'react-native-elements';
import { SearchBar,Icon } from 'react-native-elements';
import FeedImage from '../images/Store_local_image/anhquan.jpg';
// import SearchBar from 'react-native-search-bar';
import {Dimensions} from 'react-native';
const { width } = Dimensions.get('window')
export default function NewFeed_Screen(props) {
    const DATA_demo_posts = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Post 1',
          user_name: "Hoang Huy Quan"
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Chao em anh dung day tuy chieu',
          user_name: "Bui Manh Tuan"
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Anh la Quan cuto',
          user_name: "Tung gay lo"
        },
    ];


    const onLikePress = (userId, postId) => {

    }
    const onDislikePress = (userId, postId) => {

    }
    return (
        <View style={styles.containerbackground}>
            <StatusBar
                animated
                backgroundColor = "#fff"
                barStyle = "dark-content"
            />
            <View style={styles.Header}>
            <SearchBar
                round
                // lightTheme
                searchIcon={{ size: 26 }}
                color="#000"
                inputStyle={{margin: 0}}
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{width : '90%', height: 30, marginTop: 5, marginBottom: 5, backgroundColor: '#1E90FF'}}
                platform="ios"
                placeholderTextColor={'#000'}
                placeholder={'Tìm Hương Nhu'}
                // leftIconContainerStyle={{backgroundColor: '#1E90FF'}}
                
                

            />
        

            <Icon name="settings" size={30} color="#FFF" style={styles.Icon}/>
            </View>
          

            
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={DATA_demo_posts}
                    renderItem={({ item }) => (
                        <View style={styles.Feed}>
                        <View style={styles.Userinfo}>
                            
                        <Avatar
                            size={40}
                            rounded
                            source={FeedImage}
                            containerStyle={{marginLeft: 5, marginTop: 5}}
                        />
                        <Text style={styles.containerUserName}>{item.user_name}</Text>
    
                        </View>
                        
                        <View
                            style={styles.containerFeed}>
                            
                            <Image
                                style={styles.image}
                                source={FeedImage}
                            />
                            <Text style={styles.comment}
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View Comments...
                                
                            </Text>
                        </View>
                        </View>

                    )}

                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    containerbackground: {
        flex: 1
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
        
    },
    Header: {
        backgroundColor: "#1E90FF",
        flexDirection: 'row'
    }
    ,
    Feed: {
        justifyContent: 'space-between',
        marginBottom: 10
    },
    Userinfo: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: 'row'
    },
    Icon: {
        marginTop: 5
        // backgroundColor: "#"
    },
    containerUserName: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#000',
        fontSize: 18,
        marginLeft: 5,
        marginTop: 12
    },

    containerFeed: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "#fff"
    },
    image: {
        // flex: 1,
        width: width*150/100,
        height:  width*150/100,
        // resizeMode: 'contain'
    },
    avatarImage: {
        flex: 1,
        width: 40,
        height: 55,
        resizeMode: 'contain'
    },
    comment: {
        fontStyle: 'normal',
        color: '#000',
        fontSize: 15,
        marginLeft: 15
    }
}
)
