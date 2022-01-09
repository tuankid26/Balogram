import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    TextInput,
    Picker,
    TouchableOpacity,
    Button
} from "react-native";
import { BackButton } from "../components";
import { theme } from "../components/core/theme";
import { Divider } from "react-native-elements";
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../handle_api';
import Toast from 'react-native-toast-message';
const { width } = Dimensions.get("window");
export default function InfoUserScreen({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const token = useSelector(state => state.authReducer.token);
    const data = {
        token: token,
        currentPassword: currentPassword,
        newPassword: newPassword,
        repeatNewPassword: repeatNewPassword
    }
    const onPress = () => {
        console.log("dsds");
        console.log
        auth.changePassword(data)
            .then(res => {
                console.log(res)
                Toast.show({
                    type: 'success',
                    text1: 'Đổi mật khẩu thành công'
                });
                setCurrentPassword("")
                setNewPassword("")
                setRepeatNewPassword("")
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    text1: error.response.data.message
                });
                console.log(error.response.data.message)
            })
    }
    return (
        <View style={styles.wrapper}>
            <Toast position="bottom" />
            <StatusBar
                backgroundColor={theme.colors.white}
                barStyle="dark-content"
            />
            <View style={styles.header}>
                <TouchableOpacity style={{ width: 40 }}>
                    <BackButton goBack={navigation.goBack} />
                </TouchableOpacity>
                <Text style={styles.title}>Đổi mật khẩu</Text>
            </View>

            <View>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.name}>Mật khẩu cũ</Text>
                        <TextInput
                            onChangeText={(text) => setCurrentPassword(text)}
                            returnKeyType="next"
                            autoCapitalize="none"
                            secureTextEntry
                        />
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 10, marginRight: 10 }} />
            </View>
            <View>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.name}>Mật khẩu mới</Text>
                        <TextInput
                            onChangeText={(text) => setNewPassword(text)}
                            returnKeyType="next"
                            autoCapitalize="none"
                            secureTextEntry
                        />
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 10, marginRight: 10 }} />
            </View>
            <View>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.name}>Nhập lại mật khẩu mới</Text>
                        <TextInput
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(text) => setRepeatNewPassword(text)}
                            secureTextEntry
                        />
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 10, marginRight: 10 }} />
            </View>
            <View style={styles.button}>
                <Button
                    title="Xác nhận"
                    color='#283F24'
                    touchSoundDisabled={true}
                    onPress={onPress}
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        width: 100,
        margin: 10
    },
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
        color: "#A1A1A1",
        fontSize: 16,
        paddingBottom: 3,
    },
});
