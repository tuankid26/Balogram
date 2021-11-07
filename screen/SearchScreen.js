import React, { PureComponent, useState } from 'react';
import { Text, View } from 'react-native';
import { SearchBar, Button, ListItem, Avatar, Icon } from 'react-native-elements';
import { StyleSheet, Image, FlatList, StatusBar } from 'react-native';
import { theme } from '../components/core/theme';


export default function SearchScreen({ navigation }) {

    const data = [
        {
            id: 1,
            name: 'Nguyễn Hồng Hạnh',
            avatar: require('../images/avatar/Hanh.jpg')
        },
        {
            id: 2,
            name: 'Nguyễn Hương Nhu',
            avatar: require('../images/avatar/HuongNhu.jpg')
        }
    ];

    const updateSearch = (search) => {
        setSearch(search);

    }
    const onpress = () => {

    }

    const [search, setSearch] = useState();

    const onback = () => {
        navigation.navigate("MainScreen");
    }


    return (
        <View style={styles.outline}>

            <View style={styles.header}>
                <Icon name={'chevron-left'}
                    size={60}
                    onPress={onback} style={styles.Icon} />
                <View style={styles.SearchBar}>
                    <SearchBar
                        lightTheme
                        round
                        placeholder="Type Here..."
                        onChangeText={updateSearch}
                        value={search}
                    />
                </View>
            </View>

            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>Bạn bè</Text>

                    <View style={styles.card}>

                        {
                            data.map((l, i) => (
                                <ListItem key={i} bottomDivider >
                                    <Avatar source={l.avatar} size={60} rounded />
                                    <ListItem.Content>
                                        <ListItem.Title>{l.name}</ListItem.Title>
                                    </ListItem.Content>
                                    <Icon name='people' type='material' size={40} color={theme.colors.button} />
                                </ListItem>
                            ))
                        }
                        <Button onPress={onpress} title="Xem tất cả" />
                    </View>
                </View>
            </View>
            <View>

                <View style={styles.container_2}>
                    <Text style={styles.text}>Kết bạn</Text>

                    <View style={styles.card}>

                        {
                            data.map((l, i) => (
                                <ListItem key={i} bottomDivider >
                                    <Avatar source={l.avatar} size={60} rounded />
                                    <ListItem.Content>
                                        <ListItem.Title>{l.name}</ListItem.Title>
                                    </ListItem.Content>
                                    <Icon name='person-add' type='material' size={40} color={theme.colors.button} />
                                </ListItem>
                            ))
                        }

                        <Button onPress={onpress} title="Xem tất cả" />
                    </View>
                </View>
            </View>


        </View>

    );
}

const styles = StyleSheet.create({
    outline: {
    },
    text: {
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
        // flex: 3,
        backgroundColor: '#ecf0f1',
        padding: 4,
    },
    container_2: {
        // flex: 3,
        backgroundColor: '#ecf0f1',
        padding: 4,
    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        paddingBottom: 3
    },
    header: {
        flexDirection: 'row',
    },
    Icon: {
        // flex: 1,
        // width: '50%'
        // paddingTop: 15
    },
    SearchBar: {
        width: '83%'
        // flex: 1
    },
    card: {
        marginTop: 10,
        height: 250,
        marginLeft: 6,
        width: "97%",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 10,
        padding: 10
    }
});