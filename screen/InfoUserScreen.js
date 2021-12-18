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
} from "react-native";
import { BackButton } from "../components";
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from "../components/core/theme";
import { Divider } from "react-native-elements";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "react-native-paper";
import { auth } from "../handle_api";
import Toast from 'react-native-toast-message';
const { width } = Dimensions.get("window");

export default function InfoUserScreen({ navigation }) {
    const info = useSelector(state => state.infoReducer)
    const token = useSelector(state => state.authReducer.token)
    const [date, setDate] = useState(new Date(info.birthday));
    const [gender, setGender] = useState(info.gender);
    const [address, setAddress] = useState(info.address);
    const [description, setDescription] = useState(info.description);
    const [username, setUsername] = useState(info.username);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const newInfo = {
        birthday: date,
        gender: gender,
        address: address,
        description: description,
        username: username
    }
    const onChange = (event, selectedDate) => {
        setShow(false)
        const newDate = selectedDate || date
        setDate(newDate);
    };
    const onshow = () => {
        setShow(true)
    }

    const onSave = () => {
        dispatch({ type: 'STORE_INFO', payload: newInfo })
        auth.edit({ token, newInfo })
            .then(res => {
                Toast.show({
                    type: 'success',
                    text1: 'Lưu thành công'
                });
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    text1: 'Đã có lỗi xảy ra'
                });
            })
    }

    const splitDateTime = (raw_date) => {
        // Mon Dec 06 2021 14:49:34 GMT+0700 (+07)
        const list_text = raw_date.split(" ");
        const year = list_text[3];
        const month = list_text[1];
        const day = list_text[2];
        return day + " " + month + " " + year;
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
                <Text style={styles.title}>Thông tin cá nhân </Text>
            </View>

            <View>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.name}>Tên người dùng</Text>
                        <TextInput
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            returnKeyType="next"
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 10, marginRight: 10 }} />
            </View>
            <View>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.name}>Giới tính</Text>
                        <Picker
                            selectedValue={gender}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                        >
                            <Picker.Item label="Nam" value="male" />
                            <Picker.Item label="Nữ" value="female" />
                            <Picker.Item label="Khác" value="secret" />
                        </Picker>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 10, marginRight: 10 }} />
            </View>
            <TouchableOpacity onPress={onshow}>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.name}>Ngày sinh</Text>
                        {show && <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />}
                        <Text>{date && splitDateTime(date.toString())}</Text>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 10, marginRight: 10 }} />
            </TouchableOpacity>
            <View>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.name}>Mô tả</Text>
                        <TextInput
                            value={description}
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(text) => setDescription(text)}
                        />
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 10, marginRight: 10 }} />
            </View>
            <View>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.name}>Địa chỉ</Text>
                        <TextInput
                            value={address}
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(text) => setAddress(text)}
                        />
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 10, marginRight: 10 }} />
            </View>
            <View style={styles.wrapperButton}>
                <TouchableOpacity>
                    <Button style={styles.button} color="black" onPress={onSave}>Lưu</Button>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapperButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 20
    },
    button: {
        width: 50,
        backgroundColor: '#C9D1C8',
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
