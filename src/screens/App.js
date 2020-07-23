/*jshint esversion: 6 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp';
import LogIn from './LogIn';
import studyScreen from './studyScreen';
import Home from '../components/Home'
import Account from "./Account";
import Info from "./Info";
import AccountInfo from "./AccountInfo";
import Finder from './Finder';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="Login" component={LogIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="studyScreen" component={studyScreen}/>
        <Stack.Screen name="Account" component={Account}/>
        <Stack.Screen name="Info" component={Info}/>
        <Stack.Screen name="AccountInfo" component={AccountInfo}/>
        <Stack.Screen name="Finder" component={Finder}/>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;