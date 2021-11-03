import React, { PureComponent, useState } from 'react';
import {Text, View, Dimensions } from 'react-native';
import { SearchBar, Button,ListItem, Avatar, Icon } from 'react-native-elements';
import { StyleSheet, Image, FlatList, StatusBar } from 'react-native';
import { theme } from '../components/core/theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const profileImg ="https://reactnativemaster.com/wp-content/uploads/2019/11/React-native-master-logo-only.png"

export default function SearchScreen({navigation}){

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
  const updateSearch = (search) =>{
    setSearch(search);

  }
  const onpress = ( ) =>{

  }

  const [search, setSearch] = useState();

  const onback = () => {
    navigation.navigate("MainScreen");
  }

  
    return (
      <View>
      
      <View style={styles.header}>
      <Icon name={'chevron-left'}
      size={40}
      onPress={onback} style={styles.Icon}/>

      <SearchBar
      lightTheme
      round
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={search}
      style={styles.SearchBar}
      />
      </View>
      {/* Bạn bè view */}
      <View style={styles.container}>
      <Text style={styles.text}>Bạn bè</Text>
      
       <View style={styles.card}>
        {/* <View style={styles.card}> */}
        {
          data.map((l, i) => (
            <ListItem key={i} bottomDivider >
              <Avatar source={l.avatar} size={60} rounded/>
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
              </ListItem.Content>
              <Icon name='people' type='material' size={40} color={theme.colors.button}/>
            </ListItem>
          ))
        }
      {/* </View> */}
        <Button onPress={onpress} title="Xem tất cả" />
        </View>
      </View>

      {/* Add Friend View */}
      <View style={styles.container}>
      <Text style={styles.text}>Kết bạn</Text>
      
       <View style={styles.card}>
        {/* <View style={styles.card}> */}
        {
          data.map((l, i) => (
            <ListItem key={i} bottomDivider >
              <Avatar source={l.avatar} size={60} rounded/>
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
              </ListItem.Content>
              <Icon name='person-add' type='material' size={40} color={theme.colors.button}/>
            </ListItem>
          ))
        }
      {/* </View> */}
        <Button onPress={onpress} title="Xem tất cả" />
        </View>
      </View>


      </View>
    
    );
}

const styles = StyleSheet.create({
  text: {
    paddingLeft: windowWidth*0.03,
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 4,
  },
  card:{
    marginTop: 10,
    height:250,
    width:"100%",
    backgroundColor:"white",
    borderRadius:15,
    elevation:10,
    padding:10
  },
  profileImg:{
    width:30,
    height:30,
    borderRadius:50,
    marginRight:10,
  },
  User: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5,
  },
    bgAvatar: {
        flex: 2
    },
    avatar:{
        width: windowWidth*15/100,
        height: windowWidth*15/100,
        borderRadius: windowWidth*10/100,
    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        paddingBottom: 3
    },
    header: {
     
      flexDirection: 'row'
    },
    Icon: {
      marginTop: 15
    },
    SearchBar: {
      width: windowWidth*77/100
    }

  
});
