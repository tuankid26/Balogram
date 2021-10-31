
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, TextInput, TouchableHighlight } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeedImage from '../images/Store_local_image/anhquan.jpg'
import CamImage from '../images/came.png'


export default function NewPostScreen({ navigation }) {
  const [status, setEmail] = useState({ value: '', error: '' })
 

  const iconBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  }
  
  console.log('re-render')
  return (
    <View>
        <View onPress={iconBack}>
      <MaterialCommunityIcons  style={styles.arrowIcon} name="arrow-left" size={24} color="black" />  </View>
      <Text style={styles.dang}>Đăng</Text>
      <View style={styles.line} />
      <Text style={styles.tus}>Bạn đang nghĩ gì?</Text>
      <TextInput    style={styles.status}
        placeholder="Trạng thái của bạn"
        returnKeyType="next"
        value={status.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        multiline={true}
        numberOfLines={3}
        underlineColorAndroid='transparent'
        require={true} 
      />
      <View style={styles.image2}>
         <Image style={styles.image} source={CamImage} />
         <Image style={styles.image} source={FeedImage} />
         <Image style={styles.image} source={FeedImage} />
        </View>
        <View style={styles.image2}>
         <Image style={styles.image} source={FeedImage} />
         <Image style={styles.image} source={FeedImage} />
         <Image style={styles.image} source={FeedImage} />
        </View>
        <View style={styles.image2}>
         <Image style={styles.image} source={FeedImage} />
         <Image style={styles.image} source={FeedImage} />
         <Image style={styles.image} source={FeedImage} />
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  arrowIcon: {
    fontSize: "25px",
     padding:"10px",
     paddingLeft:"12px",
     position:"absolute",
     top:"0",width:"80%",
      display:"flex",
  },
  dang: {
    color: "blue" ,
    fontFamily: "Balsamiq-Sans", 
    fontSize: "25px", 
    padding:"20px",
    paddingTop:"10px",
    position:"absolute",
    top:"0",
    width:"103%", 
    display:"flex",
    justifyContent:"flex-end"
  },
  tus: {
    color: "black" , 
    fontFamily: "Balsamiq-Sans", 
    fontSize: "25px",
    justifyContent:"space-between",
    paddingTop:"17px",
    textAlign:"center",
  },
  status: {
    position:"relative",
    width:"97%",
    marginTop:"14px",
    marginLeft:"5px",
    fontSize:"25px",
    borderRadius:"6px",
    height:"290px",
    border:"2px solid #aaa",
    TextAlign:"right",
    
    
  },
  button: {
      backgroundColor: theme.colors.button
  },
  image: {
    width: 125,
    height: 125,
    flexDirection: "row",
    justifyContent:"center",
    margin:"6px",
    borderRadius:"7px",
},
image2: {
    flexDirection: "row",
    justifyContent:"center",

},
line: {
    borderBottomColor: 'rgb(102, 102, 102)',
    borderBottomWidth: 1,
    position:"relative",
    paddingTop:"45px",
},
})