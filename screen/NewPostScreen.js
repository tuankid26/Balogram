
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, TextInput, TouchableHighlight } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import anh1 from '../images/Store_local_image/anh1.jpg'
import anh2 from '../images/Store_local_image/anh2.jpg'
import anh3 from '../images/Store_local_image/anh3.jpg'
import anh4 from '../images/Store_local_image/anh4.jpg'
import anh5 from '../images/Store_local_image/anh5.jpg'
import anh6 from '../images/Store_local_image/anh6.png'
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
        // onChangeText={(text) => setEmail({ value: text, error: '' })}
        multiline={true}
        numberOfLines={3}
        underlineColorAndroid='transparent'
        require={true} 
      />
      <View style={styles.image2}>
         <Image style={styles.image} source={CamImage} />
         <Image style={styles.image} source={anh1} />
         <Image style={styles.image} source={anh2} />
        </View>
        <View style={styles.image2}>
         <Image style={styles.image} source={anh6} />
         <Image style={styles.image} source={anh4} />
         <Image style={styles.image} source={anh5} />
        </View>
        <View style={styles.image2}>
         <Image style={styles.image} source={anh3} />
         <Image style={styles.image} source={anh2} />
         <Image style={styles.image} source={anh1} />
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  arrowIcon: {
    fontSize: 25,
     padding: 10,
     paddingLeft: 12,
     position:"absolute",
     width:80,
      display:"flex",
  },
  dang: {
    color: "blue" ,
    fontFamily: "Balsamiq-Sans", 
    fontSize: 25, 
    padding:20,
    paddingTop:10,
    paddingBottom:10, 
    position:"relative",
    display:"flex",
    justifyContent:"flex-end",
     
  },
  tus: {
    color: "black" , 
    fontFamily: "Balsamiq-Sans", 
    fontSize: 25,
    justifyContent:"space-between",
    paddingTop:17,
    textAlign:"center",
  },
  status: {
    position:"relative",
    width: 400,
    marginTop:14,
    marginLeft:7,
    fontSize:25,
    borderRadius:6,
    height:290,
    borderWidth:2,
    borderStyle:"solid",
    borderColor:"#aaa",
<<<<<<< HEAD
    // TextAlign:"right",
=======
    textAlign:"right",
>>>>>>> 06d5a125f9865c422a2cebfdd03535ef1cdea180
    
    
  },
  button: {
      backgroundColor: theme.colors.button
  },
  image: {
    width: 125,
    height: 125,
    flexDirection: "row",
    justifyContent:"center",
    margin:6,
    borderRadius:7,
},
image2: {
    flexDirection: "row",
    justifyContent:"center",

},
line: {
    borderBottomColor: 'rgb(102, 102, 102)',
    borderBottomWidth: 1,
    position:"relative",
   
},
})