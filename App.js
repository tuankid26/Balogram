import React, { Component } from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './components/core/theme';
import {
    LoginScreen,
    RegisterScreen,
    ForgetPasswordScreen,
    MainScreen
} from './screen'
import NewPostScreen from './screen/NewPostScreen';

const Stack = createStackNavigator()


export default function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="LoginScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="MainScreen" component={MainScreen} />
                    <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}