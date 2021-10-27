import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, StatusBar} from 'react-native'
import { Avatar } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import FeedImage from '../images/Store_local_image/anhquan.jpg';

export default function NewFeedScreen(props) {
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
        <View style={styles.container}>
            <StatusBar
                backgroundColor = "#000"
                barStyle = "light-content"
            />
            
            <SearchBar
                round
                searchIcon={{ size: 26 }}
                inputStyle={{margin: 0}}
                placeholder={'Tìm Hương Nhu'}
            />
            
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={DATA_demo_posts}
                    renderItem={({ item }) => (
                        <View>
                        <View style={styles.containerUser}>
                            
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
                            {/* { item.currentUserLike ?
                                (
                                    <Button
                                        title="Dislike"
                                        onPress={() => onDislikePress(item.user.uid, item.id)} />
                                )
                                :
                                (
                                    <Button
                                        title="Like"
                                        onPress={() => onLikePress(item.user.uid, item.id)} />
                                )
                            } */}
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
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerUser: {
        flex: 1,
        backgroundColor: "#000",
        flexDirection: 'row',

    },
    containerUserName: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
        marginLeft: 5,
        marginTop: 12
    },

    containerFeed: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "#000"
    },
    image: {
        flex: 1,
        width: 400,
        height: 550,
        resizeMode: 'contain'
    },
    avatarImage: {
        flex: 1,
        width: 40,
        height: 55,
        resizeMode: 'contain'
    },
    comment: {
        fontStyle: 'normal',
        color: '#fff',
        fontSize: 15,
        marginLeft: 15
    }
})

