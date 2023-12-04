import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import List_Profil from '../HomaScreens/List_Profil';
import Group from '../HomaScreens/Group';
import MyAccount from '../HomaScreens/MyAccount';
const Tab = createMaterialBottomTabNavigator();
export default function Accueil(props) {
  //const currentId = props.route.params.currentId;
  return (
    <Tab.Navigator>
        <Tab.Screen name='listprofil' component={List_Profil} />
        <Tab.Screen name='group' component={Group} />
        <Tab.Screen name='myaccount' component={MyAccount} />
    </Tab.Navigator>

  )
}