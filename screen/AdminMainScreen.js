import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../components/core/theme';
import AdminScreen from './AdminScreen';
import MainMessengerScreen from './MainMessengerScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen'
// import { AdminScreen } from '.';
const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}

export default function AdminMainScreen() {

    return (
        <Tab.Navigator initialRouteName="Feed" labeled={false}
            activeColor="#ff3300"
            barStyle={{ backgroundColor: "#000000" }}
        >
            <Tab.Screen name="Feed" component={AdminScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Messenger" component={MainMessengerScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Messenger")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="comment-multiple" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Profile")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
                }} />

        </Tab.Navigator>
    )
}