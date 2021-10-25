import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'

// import * as firebase from 'firebase'

// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux'
// import rootReducer from './redux/reducers'
// import thunk from 'redux-thunk'
// const store = createStore(rootReducer, applyMiddleware(thunk))

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
// import RegisterScreen from './components/auth/Register'
// import LoginScreen from './components/auth/Login'
import MainScreen from './screen/Main_Screen'
// import AddScreen from './components/main/Add'
// import SaveScreen from './components/main/Save'
// import CommentScreen from './components/main/Comment'


const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main"
          screenOptions={{
            headerShown: false
          }}
          >
            <Stack.Screen name="Main" component={MainScreen} 
            // options={{
            //   title: 'BaloGram',
            //   headerStyle: {
            //     backgroundColor: '#000',
            //   },
            //   headerTintColor: '#fff',
            //   headerTitleStyle: {
            //     fontWeight: 'bold',
            //     fontSize: 25
            //   }
            // }}
            />
            {/* <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/> */}
            {/* <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/> */}
          </Stack.Navigator>
        </NavigationContainer>
        
    )
  }
}

export default App
