import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
//import {  TextInput } from 'react-native-paper';
import {useState,useRef} from 'react'

const Auth = ({navigation}) => {
  const [email,setEmail]=useState("A");
  const [pwd,setPwd]=useState("0");
  const refinput2 = useRef()

  return (
    <ImageBackground source={require("../assets/image.png")} style={styles.container}>
      <View style={styles.authentif}>
        <Text style={{fontSize:32, fontWeight:"bold",color:"white"}}>Authentification</Text>

        <TextInput 
          onSubmitEditing={()=>{refinput2.current.focus()}}
          blurOnSubmit={false}
          style={styles.textinput} 
          placeholder='Email'
          onChangeText={(text)=>{setEmail(text)}}
          keyboardType='email-address'
        ></TextInput>
        <TextInput 
          ref={refinput2}
          onChangeText={(text)=>setPwd(text)}
          secureTextEntry={true} 
          style={styles.textinput} 
          placeholder='Password'></TextInput>
        <View style={{ flex: 0, flexDirection: "row"}}>
          <Button 
            onPress={()=>{
              if ((email === "A") && (pwd === "0")){
                alert("c'est bon");
              } else alert("error");
            }}
            title="Submit"
            style={styles.button_conf}></Button>
          <Button onPress={() => BackHandler.exitApp()} title="Cancel" style={styles.button_conf}></Button>
        </View>

        <TouchableOpacity style={{alignItems:"flex-end",paddingRight:20,margin:12, width:"100%"}}>
          <Text  
            onPress={()=> {navigation.navigate("Register");}
          }
            style={{color:"white", fontWeight:"bold", textDecorationLine:"underline"}}>
            Create New ?
          </Text>
        </TouchableOpacity>

      </View>
      
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

export default Auth

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
    fontFamily:"serif"
    
    
    
  },
  authentif: {
    backgroundColor: "#0003",
    alignContent:"center",
    alignItems: 'center',//align hor
    width:"85%",
    height:300,
    borderRadius: 50,
    justifyContent:"center"
    

  },
  button_conf:{
    
    
  }
});
