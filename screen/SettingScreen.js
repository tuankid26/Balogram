import React, { Component } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { BackButton } from "../components";
import { theme } from "../components/core/theme";
import { Icon, Divider } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome } from "react-native-vector-icons";
import { useSelector, useDispatch } from 'react-redux';
const { width } = Dimensions.get("window");

export default function SettingScreen({ navigation }) {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({ type: 'REMOVE_TOKEN' })
        navigation.navigate("LoginScreen")
    }
    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <TouchableOpacity style={{ width: 40 }}>
                    <BackButton goBack={navigation.goBack} />
                </TouchableOpacity>
                <Text style={styles.title}>Cài đặt</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("InfoUserScreen")}>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        name="shield-account"
                        style={styles.icon}
                        color='green'
                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>Thông tin tài khoản</Text>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 45 }} />
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        name="monitor-screenshot"
                        style={styles.icon}
                        color='#B1AE57'
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
                        color='#B61E1E'
                    // onPress={() => navigation.navigate("SearchScreen")}
                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>Thông báo</Text>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 45 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ChangePasswordScreen")}>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        name="cog-outline"
                        style={styles.icon}
                        color='#468548'

                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>Đổi mật khẩu</Text>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 45 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => logout()}>
                <View style={styles.container} >
                    <MaterialCommunityIcons
                        name="logout-variant"
                        style={styles.icon}
                        color='#920B0B'
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
        padding: 15,
        alignContent: "center",
    },
    container: {
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
