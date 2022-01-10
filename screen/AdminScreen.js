import React, { PureComponent, useState } from 'react';
import { Text, View } from 'react-native';
import { SearchBar, Button, ListItem, Avatar, Icon } from 'react-native-elements';
import { StyleSheet, Image, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { theme } from '../components/core/theme';
import { admin } from "../handle_api";
import { useSelector } from "react-redux";
import {useEffect, useCallback } from "react";
import { format, formatDistance, subDays } from "date-fns";


export default function AdminScreen({ navigation }) {
    const [datapost, setDatapost] = useState("");
    const username = useSelector((state) => state.infoReducer.username);
    const token = useSelector((state) => state.authReducer.token);
    const userId = useSelector((state) => state.infoReducer.userId);
    const description = useSelector((state) => state.infoReducer.description);
    const fetchPosts = async (token) => {
        try {
            data = {
                token: token
            }
          const dataFeed = await admin.getListReport(data);
          setDatapost(dataFeed.data.data.reverse());
        } catch (err) {
          console.log(err);
        }
        // console.log(datapost.length);
    };
    const splitDateTime = (raw_date) => {
        // 2021-11-14T17:16:51.653Z
        const list_text = raw_date.split(":");
        const l_date_hour = list_text[0].split("T");
        const date = l_date_hour[0];
        const hour_minute = l_date_hour[1] + ":" + list_text[1];
        const new_text = date + " lúc " + hour_minute;
        const time = formatDistance(new Date(raw_date).getTime(), new Date(), {
          addSuffix: true,
        });
        return time;
    };

    useEffect(() => {
        fetchPosts(token);
    });

    const showPost = (item) =>{
        // const postId = item.post._id;
        const itemReport = item;
        navigation.navigate("ShowPostScreen", { itemReport });
    }
    const renderItem = (item) => {
        const date_time = splitDateTime(item.updatedAt);
        return (
        <View style={styles.containerPost}>
        <View style={styles.containerPostHeader}>
          <View style={styles.containerUser}>
            <View style={styles.containerInfo}>
              <Text style={styles.containerUserName}>
                {item.user.username}
              </Text>
              <Text style={styles.containerHour}> {date_time} </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerFeed}>
            <Text style={styles.report}>Đã báo cáo một bài viết có nội dung:</Text>
            {item.post
            ?
            <Text style={styles.described}>"{item.post.described}"</Text>
            :
            <View></View>
            }

          <View style={styles.button}>
          <Button title="Xem bài viết" onPress={() => showPost(item)} />
          </View>
        
        </View>
        
      </View>
           
        );
    }

    return (
        <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" />
      <View style={styles.headerview}>
                <Text style={styles.header}> Báo cáo </Text>
        </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={datapost}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View>

    );
}

const styles = StyleSheet.create({
    content_comment: {
        // flexDirection: 'row'
    },
    button: {
        marginLeft: 10
    },
    containerHour: {
        color: "#838383",
        fontSize: 14,
        marginLeft: 10,
        marginTop: 5,
    },

    content_comment_name: {
        fontWeight: 'bold'
    },
    containerInfo: {
        flexDirection: "row",
        alignItems: "center",
      },

    containerPost: {
        borderWidth: 1,
        borderColor: theme.colors.white,
        borderRadius: 7,
        marginTop: 10,
        marginTop: 20,
      },
    
    
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: "#ff3300"
    },
    containerFeed: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: theme.colors.white,
        flex: 1,
      },
    Reported: {
        flexDirection: "row"
    },
    headerview: {
        backgroundColor: "#fff",
        marginBottom: 4
    },
    content_comment_action: {
        fontWeight: 'normal'
    }
    ,
    containerUser: {
        flex: 1,
        backgroundColor: theme.colors.white,
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
      },
      containerUserName: {
        color: theme.colors.black,
        fontSize: 17,
        marginLeft: 10,
        marginTop: 5,
        fontWeight: "700",
      },

    containerPostHeader: {
        flexDirection: "row",
        backgroundColor: theme.colors.white,
      },
    container: {
        // flex: 1,
        width: '100%',
        backgroundColor: '#ecf0f1',
    },
    containerUserName: {
        color: theme.colors.black,
        fontSize: 17,
        marginLeft: 10,
        marginTop: 5,
        fontWeight: "700",
    },
    described: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 7,
      },
    report: {
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 7,
        color: "#FF0000"
    }

});