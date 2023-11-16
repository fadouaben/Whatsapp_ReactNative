import { View, Text } from 'react-native'
import React from 'react'
import Auth from './screens/Auth';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name= "Auth"
          component = {Auth}
        />
        <Stack.Screen
          name= "Register"
          component = {Register}
        />

      </Stack.Navigator>
    </NavigationContainer>

);
}