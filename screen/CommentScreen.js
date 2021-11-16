import React, { Component, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { BackButton, ItemComment } from "../components";
import { theme } from "../components/core/theme";
import axios from "axios";

const postId = "60c452e4ae8c0f00220f462e";
const auth =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1YW5raWQyNiIsImlkIjoiNjE4N2FlNDY3YjJiYzUzMDMwNWQ4MGNlIiwiaWF0IjoxNjM2ODU1MDQ0fQ.jL4Ss_ONfRgOXmR4MrePGJ0S1cumjOewMxIlSHt9opI";
const url = "http://192.168.0.101:8000/api/v1";

export default function CommentScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [getData, setGetData] = useState(false);
  const [noData, setNoData] = useState(false);
  const [text, setText] = useState("");

  const onBack = () => {
    navigation.navigate("MainScreen");
  };

  useEffect(() => {
    axios
      .get(`${url}/postcomment/list/${postId}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        setData(res.data.data);
        if (data != null) setGetData(true);
        data.length == 0 ? setNoData(true) : setNoData(false);
      })
      .catch((error) => console.log(error));
  });

  const onSend = () => {
    axios
      .post(
        `${url}/postcomment/create/${postId}`,
        { content: text },
        {
          headers: { Authorization: `Bearer ${auth}` },
        }
      )
      .then((res) => {
        if ((res.status = "200")) setText("");
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
        {getData && !noData ? (
          <FlatList
            // ref={"flatList"}
            data={data}
            renderItem={({ item }) => <ItemComment item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.comment_blank}>
            <Text style={styles.noComment}> No comments Yet </Text>
            <Text style={styles.noCommentAdd}> Start the conversation </Text>
          </View>
        )}
      </View>
      <View style={styles.inputForm}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="image" style={styles.icon2} size={30} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          onChangeText={(text) => setText(text)}
          multiline={true}
          numberOfLines={1}
        />
        <TouchableOpacity onPress={onSend}>
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
    color: theme.colors.logo,
    padding: 20,
    paddingLeft: 100,
    marginBottom: 5,
  },
  header: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    padding: 10,
    marginBottom: 15,
    flex: 1,
  },
  icon: {
    color: theme.colors.logo,
    fontSize: 32,
    padding: 10,
  },
  icon2: {
    // color: "black",
    fontSize: 32,
    padding: 5,
    paddingLeft: 0,
  },
  comment_blank: {
    alignContent: "center",
    marginTop: 20,
  },
  noComment: {
    fontFamily: "",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 28,
  },
  noCommentAdd: {
    marginTop: 5,
    fontFamily: "",
    textAlign: "center",
    fontWeight: "400",
    color: "#787A91",
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
