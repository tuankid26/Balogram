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
import { useSelector, useDispatch } from 'react-redux';
import {
  BackButton,
  ItemComment
} from "../components";
import { theme } from "../components/core/theme";

import { comment } from "../handle_api";

export default function CommentScreen({ route, navigation }) {
  const postId = route.params.postId
  const userId = route.params.userId
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [content, setContent] = useState("");
  const token = useSelector(state => state.authReducer.token);
  
  const object = {
    token: token,
    content: content,
    userId: userId,
    postId: postId
  }
  useEffect(  () => {
    comment.listComment(token, postId)
      .then((res) => {
        setData(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => console.log(error));
      
  }, [content])

  const onSend = () => {
    setContent("");
    comment.createComment(object)
      .then((res) => {
        const newComment = res.data.data
        setData([...data,newComment])
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
        { data.length != 0 ? (
          <FlatList
            // ref={"flatList"}
            refreshing={true}
            data={data}
            renderItem={({ item }) => <ItemComment item={item} />}
            keyExtractor={(item) => item._id.toString()}
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
          defaultValue={content}
          onChangeText={(text) => setContent(text)}
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
    // fontFamily: "",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 28,
  },
  noCommentAdd: {
    marginTop: 5,
    // fontFamily: "",
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
