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
    ProfileScreen,
    MainMessengerScreen,
    ChatMessengerScreen,
    SearchScreen

} from './screen'
import NewPostScreen from './screen/NewPostScreen';

const Stack = createStackNavigator()


export default function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
<<<<<<< HEAD
                    initialRouteName="LoginScreen"
                    // screenOptions={{
                    //     headerShown: false,
                    // }}
                >
                    <Stack.Screen name="ChatMessengerScreen" options={{headerShown: true}} component={ChatMessengerScreen} />
                    <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
                    <Stack.Screen name="ForgetPasswordScreen" options={{headerShown: false}} component={ForgetPasswordScreen} />
                    <Stack.Screen name="RegisterScreen" options={{headerShown: false}} component={RegisterScreen} />
                    <Stack.Screen name="MainScreen" options={{headerShown: false}} component={MainScreen} />
                    {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
=======
                    initialRouteName="ProfileScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="MainScreen" component={MainScreen} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
>>>>>>> 8888279cd0236993b95d62ce522bd03f3bf70809
                    {/* <Stack.Screen name="MainScreen" component={MainScreen} /> */}
                    <Stack.Screen name="NewPostScreen" options={{headerShown: false}} component={NewPostScreen} />
                    <Stack.Screen name="SearchScreen" options={{headerShown: false}} component={SearchScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}