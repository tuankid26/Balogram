import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { theme } from "../components/core/theme";
import { Icon, Divider } from "react-native-elements";
import { MaterialCommunityIcons } from "react-native-vector-icons";
const { width } = Dimensions.get("window");

export default function SettingScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <MaterialCommunityIcons
            name="arrow-left"
            style={styles.icon}
            // onPress={() => navigation.navigate("SearchScreen")}
          />
        <Text style={styles.title}>Cài đặt</Text>
        <View style={styles.search}>
          <MaterialCommunityIcons
            name="magnify"
            style={styles.icon}
            onPress={() => navigation.navigate("SearchScreen")}
          />
        </View>
      </View>

      <TouchableOpacity>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="shield-account"
            style={styles.icon}
            // onPress={() => navigation.navigate("SearchScreen")}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Tài khoản và bảo mật</Text>
          </View>
        </View>
        <Divider style={{ margintop: 10, marginLeft: 45 }} />
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="monitor-screenshot"
            style={styles.icon}
            // onPress={() => navigation.navigate("SearchScreen")}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Giao diện</Text>
          </View>
        </View>
        <Divider style={{ margintop: 10, marginLeft: 45 }} />
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="bell-outline"
            style={styles.icon}
            // onPress={() => navigation.navigate("SearchScreen")}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Thông báo</Text>
          </View>
        </View>
        <Divider style={{ margintop: 10, marginLeft: 45 }} />
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="cog-outline"
            style={styles.icon}
            // onPress={() => navigation.navigate("SearchScreen")}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Cài đặt ứng dụng</Text>
          </View>
        </View>
        <Divider style={{ margintop: 10, marginLeft: 45 }} />
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="logout-variant"
            style={styles.icon}
            // onPress={() => navigation.navigate("SearchScreen")}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Đăng xuất</Text>
          </View>
        </View>
        <Divider style={{ margintop: 10, marginLeft: 45 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: theme.colors.header,
  },
  search: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  icon: {
    fontSize: 25,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    padding: 20,
    alignContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 8,
  },
  bgAvatar: {
    flex: 2,
  },
  info: {
    flex: 8,
    flexDirection: "column",
    paddingLeft: 5,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
    paddingBottom: 3,
  },
});
