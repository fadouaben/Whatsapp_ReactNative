import { View, Text,LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import Auth from './screens/Auth';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './screens/Accueil';
import Discusion from './ChatScreens/Discusion';
import EditProf from './HomaScreens/EditProf';
import MyAccount from './HomaScreens/MyAccount';

import firebase from './Config';
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release."
])
const auth = firebase.auth();

const Stack = createNativeStackNavigator();


export default function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      setLoading(false);
      if (user){
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  },[]);
  
  return (
    <NavigationContainer>
      {
      !currUser ? (
        <Stack.Navigator screenOptions={{headerShown:false}}>

        <Stack.Screen
          name= "Auth"
          component = {Auth}
        />
        <Stack.Screen
          name= "Register"
          component = {Register}
        />
        </Stack.Navigator>
      ):(
        <Stack.Navigator screenOptions={{headerShown:false}}>
         <Stack.Screen
          name= "Auth"
          component = {Auth}
          />
        <Stack.Screen
          name= "Home"
          component = {Accueil}
        />
        <Stack.Screen
          name= "Discusion"
          component = {Discusion}
        />
        <Stack.Screen
          name= "EditProf"
          component = {EditProf}
        />
        <Stack.Screen
          name= "MyAccount"
          component = {MyAccount}
        />
      </Stack.Navigator>)
      }
      
       
      
    </NavigationContainer>

);
}