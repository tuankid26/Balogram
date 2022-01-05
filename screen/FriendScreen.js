import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FriendActive, LinePartition } from "../components";
import { theme } from "../components/core/theme";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "react-native-vector-icons";
const { width } = Dimensions.get("window");
import { friend } from "../handle_api";
import { useSelector, useDispatch } from "react-redux";
export default function FriendScreen({ navigation }) {
  const [dataFriend, setDataFriend] = useState([]);
  const token = useSelector((state) => state.authReducer.token);

  const dispatch = useDispatch();
  const recentData = useSelector((state) => state.searchReducer.arr);
  const isFocused = useIsFocused();

  useEffect(() => {
    friend
      .getListFriend(token)
      .then((res) => {
        if (isFocused) setDataFriend(res.data.data.friends);
        // console.log(res.data.data)
      })
      .catch((error) => {
        console.log("Failed");
        console.log(error);
      });
  }, [isFocused]);

  const onSearchPress = () => {
    navigation.navigate("SearchScreen");
  };

  // const onPressUser = (item) => {
  //   recentData.includes(item)
  //     ? null
  //     : dispatch({ type: "ADD_ITEM", payload: item });
  //   navigation.navigate("FriendProfileScreen", { item });
  // };

  const onPressUser = (item) => {
    navigation.navigate("FriendProfileScreen", { item });
  };

  const noFriend = () => {
    
    if (dataFriend.length == 0)
      return (
        <View style={styles.noF}>
          <View>
            <Text style={styles.textNoF}>Chưa có người bạn nào!</Text>
          </View>
          <View style={{ width: width / 2, padding: 10 }}>
            <TouchableOpacity style={styles.buttonNoF} onPress={onSearchPress}>
              <Text style={styles.textNoF2}>Tìm bạn mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    else {
      console.log(dataFriend.length);
      // return (
      //   <FlatList
      //     data={dataFriend}
      //     renderItem={({ item }) => (
      //       <FriendActive item={item} onPressUser={onPressUser}/>
      //     )}
      //     keyExtractor={(item) => item._id.toString()}
      //   />
      // );
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>BaloGram</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons
            name="md-search-outline"
            style={styles.icon}
            onPress={onSearchPress}
          />
          <Ionicons
            name="person-add-outline"
            style={styles.icon}
            onPress={() => navigation.navigate("AddFriendScreen")}
          />
        </View>
      </View>
      <LinePartition color={theme.colors.silver} />
      <Text style ={{fontSize : 24, backgroundColor : 'white', marginLeft : 15}}>Danh sách bạn bè</Text>
      <View>{noFriend()}</View>

      {/* <FlatList
        data={dataFriend}
        renderItem={({ item }) => <FriendActive item={item} />}
        keyExtractor={(item) => item._id.toString()}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    // backgroundColor: "white",
  },

  addFriend: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  headerBar: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    height: 40,
  },

  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    color: theme.colors.logo,
    padding: 20,
  },
  textNoF: {
    fontSize: 24,
    color: theme.colors.logo,
  },
  textNoF2: {
    fontSize: 26,
    color: theme.colors.logo,
  },
  buttonNoF: {
    backgroundColor: "#CDF2CA",
    height: width / 9,
    alignItems: "center",
    borderRadius: 10,
  },
  noF: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: width / 2,
  },

  icon: {
    fontSize: 25,
    marginRight: 15,
  },
});