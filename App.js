import React, { Component } from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './components/core/theme';
import {
    LoginScreen,
    RegisterScreen,
    ForgetPasswordScreen,
    MainScreen,
    ChatMessengerScreen,
    AddFriendScreen,
    CommentScreen,
    SearchScreen,
    SettingScreen
} from './screen'
import NewPostScreen from './screen/NewPostScreen';

const Stack = createStackNavigator()


export default function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="LoginScreen"
                // screenOptions={{
                //     headerShown: false,
                // }}
                >
                    <Stack.Screen name="ChatMessengerScreen" options={{ headerShown: true }} component={ChatMessengerScreen} />
                    <Stack.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="ForgetPasswordScreen" options={{ headerShown: false }} component={ForgetPasswordScreen} />
                    <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} component={RegisterScreen} />
                    <Stack.Screen name="MainScreen" options={{ headerShown: false }} component={MainScreen} />
                    <Stack.Screen name="NewPostScreen" options={{ headerShown: false }} component={NewPostScreen} />
                    <Stack.Screen name="AddFriendScreen" options={{ headerShown: false }} component={AddFriendScreen} />
                    <Stack.Screen name="CommentScreen" options={{ headerShown: false }} component={CommentScreen} />
                    <Stack.Screen name="SearchScreen" options={{ headerShown: false }} component={SearchScreen} />
                    <Stack.Screen name="SettingScreen" options={{ headerShown: false }} component={SettingScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}