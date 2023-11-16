import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, BackHandler, Button, ImageBackground, StyleSheet, Text, TextInput, View , TouchableOpacity } from 'react-native';
//import {  TextInput } from 'react-native-paper';

const Register = ({navigation}) => {
    const [email, onChangeEmail] = React.useState('@.com');
    const [password, onChangePass] = React.useState('pass');


  return (
    <ImageBackground source={require("../assets/image.png")} style={styles.container}>
      <View style={styles.authentif}>
      <Text style={{fontSize:32, fontWeight:"bold",color:"white"}}>Authentification</Text>

      <TextInput onChangeText = {onChangeEmail} style={styles.textinput} placeholder='Email'></TextInput>
      <TextInput style={styles.textinput} placeholder='Password' secureTextEntry={true}></TextInput>
      <TextInput style={styles.textinput} placeholder='Confirm Password' secureTextEntry={true}></TextInput>

      <View style={{ flex: 0, flexDirection: "row"}}>
        <Button onPress={() => Alert.alert(email)} title="Submit" style={styles.button_conf}></Button>
        <Button onPress={() => BackHandler.exitApp()} title="Cancel" style={styles.button_conf}></Button>
      </View>
      
      
      </View>
      
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',//align hor
    justifyContent: 'center',//align vert
  },
  textinput:{
    width: "90%",
    textAlign: 'center',
    borderWidth: 1,
    padding:10,
    margin:12,
    borderRadius:15,
    fontSize:15,
    fontFamily:"serif",
    
    
  },
  authentif: {
    backgroundColor: "#0003",
    alignContent:"center",
    alignItems: 'center',//align hor
    width:"85%",
    height:350,
    borderRadius: 50,
    justifyContent:"center"

  },
  button_conf:{
    
    
  }
});
