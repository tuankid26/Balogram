import React, { Component } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './components/core/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './redux/store';

import {
    LoginScreen,
    RegisterScreen,
    ForgetPasswordScreen,
    MainScreen,
    ChatMessengerScreen,
    AddFriendScreen,
    CommentScreen,
    SearchScreen,
    SettingScreen,
    MediaPicker,
    ChatInformation,
    EditPostScreen,
    MainMessengerScreen
} from './screen'
import NewPostScreen from './screen/NewPostScreen';


const Stack = createStackNavigator()

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}


const App = () => {
    return (
        <SafeAreaProvider>
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
                    <Stack.Screen name="MediaPicker" options={{ headerShown: false }} component={MediaPicker} />
                    <Stack.Screen name="ChatInformation" options={{ headerShown: false }} component={ChatInformation} />
                    <Stack.Screen name="EditPostScreen" options={{ headerShown: false }} component={EditPostScreen} />
                    <Stack.Screen name="MainMessengerScreen" options={{ headerShown: false }} component={MainMessengerScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default AppWrapper;