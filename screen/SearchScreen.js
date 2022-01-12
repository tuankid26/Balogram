import React, { useEffect, useState } from "react";
import { Text, View, Alert } from "react-native";
import {
  SearchBar,
  Button,
  ListItem,
  Avatar,
  Icon,
} from "react-native-elements";
import {
  StyleSheet,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { ipServer } from "../handle_api/ipAddressServer";
import { Ionicons, FontAwesome } from "react-native-vector-icons";
import { search } from "../handle_api/search";
import { BackButton } from "../components";
import { friend } from "../handle_api";
import { useSelector, useDispatch } from "react-redux";
export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [strange, setStrange] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showRecent, setShowRecent] = useState(true);
  const recentData = useSelector((state) => state.searchReducer.arr);
  const token = useSelector((state) => state.authReducer.token);
  const userId = useSelector((state) => state.infoReducer.userId);
  // const st = useSelector(state => state)
  // console.log(st)
  const setRequestFriend = (userID) => {
    const dataRequest = {
      user_id: userID,
      token: token,
    };
    friend
      .setRequestFriend(dataRequest)
      .then((res) => {
        Alert.alert(res.data.message);
      })
      .catch((error) => {
        console.log("Failed");
        console.log(error.response.data);
      });
  };

  const onSubmit = () => {
    setShowRecent(false);
    search(token, text)
      .then((res) => {
        setFriends(res.data.friends);
        setStrange(res.data.strange);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const renderRecent = (item) => {
    let recent_avatar = item.avatar;
    return (
      <View>
        <TouchableOpacity style={styles.recentContainer} onPress={() => navigation.navigate("FriendProfileScreen", { item })}>
          <View style={styles.recentWrapper}>
            {recent_avatar ?
              (
                <Avatar
                  source={{
                    uri: `${ipServer}${item.avatar.fileName}`,
                  }}
                  size={60}
                  rounded
                />
              ) : (
                <Avatar
                  source={require("../images/avatar/default-avatar-480.png")}
                  size={60}
                  rounded
                />
              )}
            <Text>{item.username}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const onPressUser = (item) => {
    if (recentData.findIndex(u => u._id == item._id) == -1) {
      dispatch({ type: "ADD_ITEM", payload: item });
    }
    navigation.navigate("FriendProfileScreen", { item });
  };

  return (
    <View style={styles.outline}>
      <View style={styles.header}>
        <TouchableOpacity style={{ justifyContent: "center", width: 40 }}>
          <BackButton goBack={navigation.goBack} />
        </TouchableOpacity>
        <View style={styles.SearchBar}>
          <SearchBar
            lightTheme
            showLoading={true}
            placeholder="Tìm kiếm"
            onChangeText={(text) => setText(text)}
            value={text}
            containerStyle={{
              height: 50,
              justifyContent: "center",
              backgroundColor: "#ecf0f1",
            }}
            inputContainerStyle={{ backgroundColor: "#ecf0f1" }}
          />
        </View>
        <TouchableOpacity
          style={{ justifyContent: "center", width: 40, alignItems: "center" }}
        >
          <FontAwesome name="search" size={25} onPress={onSubmit} />
        </TouchableOpacity>
      </View>
      {showRecent && (
        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.text}>Gần đây</Text>
            <FlatList
              data={recentData}
              renderItem={({ item }) => renderRecent(item)}
              keyExtractor={(item) => item._id.toString()}
              numColumns={3}
            />
          </View>
        </View>
      )}
      {friends.length != 0 && friends && (
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>Bạn bè</Text>
            <View style={styles.card}>
              {friends
                .filter((l, i) => i <= 1 && l._id != userId)
                .map((l, i) => (
                  <ListItem key={i} bottomDivider>
                    <TouchableOpacity>
                      <Avatar
                        source={{
                          uri: `${ipServer}${l.avatar.fileName}`,
                        }}
                        size={60}
                        rounded
                      />
                    </TouchableOpacity>
                    <ListItem.Content>
                      <ListItem.Title>{l.username}</ListItem.Title>
                    </ListItem.Content>
                    <TouchableOpacity>
                      <Ionicons name="people-outline" style={styles.icon} />
                    </TouchableOpacity>
                  </ListItem>
                ))}
              <Button onPress={onpress} title="Xem tất cả" />
            </View>
          </View>
        </View>
      )}
      {strange.length != 0 && strange && (
        <View>
          <View style={styles.container_2}>
            <Text style={styles.text}>Kết bạn</Text>
            <View style={styles.card}>
              {strange
                .filter((l, i) => i <= 1 && l._id != userId)
                .map((l, i) => (
                  <ListItem key={i} bottomDivider>
                    <TouchableOpacity onPress={() => onPressUser(l)}>
                      {l.avatar ? (
                        <Avatar
                          source={{
                            uri: `${ipServer}${l.avatar.fileName}`,
                          }}
                          size={60}
                          rounded
                        />
                      ) : (
                        <Avatar
                          source={require("../images/avatar/default-avatar-480.png")}
                          size={60}
                          rounded
                        />
                      )}
                    </TouchableOpacity>
                    <ListItem.Content>
                      <ListItem.Title>{l.username}</ListItem.Title>
                    </ListItem.Content>
                    <TouchableOpacity onPress={() => setRequestFriend(l._id)}>
                      <Ionicons
                        name="md-person-add-outline"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </ListItem>
                ))}
              <Button title="Xem tất cả" />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outline: {
    flex: 1,
  },
  recentWrapper: {
    padding: 10,
    alignItems: "center",
  },
  recentContainer: {
    width: 120,
  },
  icon: {
    fontSize: 25,
  },
  text: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    // flex: 3,
    backgroundColor: "#ecf0f1",
    padding: 4,
  },
  container_2: {
    // flex: 3,
    backgroundColor: "#ecf0f1",
    padding: 4,
  },
  name: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
    paddingBottom: 3,
  },
  header: {
    flexDirection: "row",
  },
  Icon: {
    // flex: 1,
    // width: '50%'
    // paddingTop: 15
  },
  SearchBar: {
    width: "78%",
    // flex: 1
  },
  card: {
    marginTop: 10,
    marginLeft: 6,
    width: "97%",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    padding: 10,
  },
});
