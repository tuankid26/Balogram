import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../components/core/theme';
import NewFeedScreen from './NewFeedScreen';
// import ChannelScreen from './ChatMessengerScreen';
import MainMessengerScreen from './MainMessengerScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen'
import FriendScreen from './FriendScreen';
const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}

export default function MainScreen() {

    return (
        <Tab.Navigator initialRouteName="Feed" labeled={false}
            activeColor={theme.colors.button}
            barStyle={{ backgroundColor: theme.colors.white }}
        >
            <Tab.Screen name="Feed" component={NewFeedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Friend" component={FriendScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Friend")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-group-outline" color={color} size={26} />
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
            <Tab.Screen name="Notifications" component={NotificationScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Notifications")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell-outline" color={color} size={26} />
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