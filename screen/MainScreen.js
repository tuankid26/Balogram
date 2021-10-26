import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FeedScreen from './NewFeed_Screen'
import ProfileScreen from '../components/Profile'
import { theme } from '../components/core/theme';

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
            <Tab.Screen name="Feed" component={FeedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="AddContainer" component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-group-outline" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Messenger" component={ProfileScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Messenger", { uid: firebase.auth().currentUser.uid })
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="comment-multiple" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Notifications" component={ProfileScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Notifications", { uid: firebase.auth().currentUser.uid })
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
                        navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
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

