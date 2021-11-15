import React, { Component, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { data2 } from "../log_data/data2.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BackButton, ItemComment } from "../components";
import axios from "axios";
const postId = "60c452e4ae8c0f00220f462e";
const auth =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1YW5raWQyNiIsImlkIjoiNjE4N2FlNDY3YjJiYzUzMDMwNWQ4MGNlIiwiaWF0IjoxNjM2ODU1MDQ0fQ.jL4Ss_ONfRgOXmR4MrePGJ0S1cumjOewMxIlSHt9opI";
export default function CommentScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [getData, setGetData] = useState(false);
  const [text,setText] = useState('')

  const onBack = () => {
    navigation.navigate("MainScreen");
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.101:8000/api/v1/postcomment/list/${postId}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        // console.log(res.data.data)
        // const dataRes = res.data
        setData(res.data.data);
        if (data != null) setGetData(true);
      })
      .catch((error) => console.log(error));
  });
    // console.log(getData);
  const onSend = () => {
    axios
      .post(`http://192.168.0.101:8000/api/v1/postcomment/create/${postId}`,{content: text}, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        if (res.status = '200') setText('')
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
        <Text style={styles.title}>Bình luận</Text>
      </View>
      <View style={styles.body}>
        {getData ? (
          <FlatList
            // ref={"flatList"}
            data={data}
            renderItem={({ item }) => <ItemComment item={item} />}
            keyExtractor={(item) => item.id} // tránh trùng các item với nhau
          />
       
        ) : (
          <View/>
        )}
      </View>
      <View style={styles.inputForm}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="image" style={styles.icon2} size={30} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Bình luận"
          onChangeText={(text) => setText(text)}
          multiline={true}
          numberOfLines={1}
        />
        <TouchableOpacity onPress = {onSend}>
          <MaterialCommunityIcons name="send" style={styles.icon} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  body: {
    flex: 20,
  },
  title: {
    fontSize: 26,
    color: "blue",
    padding: 20,
    paddingLeft: 100,
    marginBottom: 5,
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
    flex: 1,
  },
  icon: {
    color: "blue",
    fontSize: 40,
    padding: 10,
  },
  icon2: {
    color: "black",
    fontSize: 40,
    padding: 5,
    paddingLeft: 0,
  },
  inputForm: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingBottom: 15,
    borderTopWidth: 1,
    paddingTop: 12,
  },
  input: {
    flex: 1,
    paddingTop: 3,
    paddingRight: 10,
    paddingBottom: 3,
    paddingLeft: 10,
    color: "#424242",
    borderStyle: null,
    fontSize: 20,
  },
});
