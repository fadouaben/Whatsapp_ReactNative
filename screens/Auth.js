import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
//import {  TextInput } from 'react-native-paper';
import {useState,useRef, useEffect} from 'react'
import firebase from '../Config';
const auth = firebase.auth();
const Auth = ({navigation}) => {
  const [email,setEmail]=useState("A");
  const [pwd,setPwd]=useState("0");
  const refinput2 = useRef();
  const [currentId,setCurrentId] = useState(null);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user){
        setCurrentId(user.uid);
        const ref_profils = firebase.database().ref("profils");
        const ref_unprofil = ref_profils.child("profil" + currentId);
        const existeData = ref_unprofil.once('value')
        .then(snapshot => {
          const existeData = snapshot.val(); 
          if (existeData){
            ref_unprofil.update({
              onLine:true,
              
            });
            
          }
          
        })
        .catch(error => {
          console.error("Erreur lors de la récupération", error);
        });
        
      }else {
            // L'utilisateur est déconnecté
            console.log(currentId);
            if (currentId){
              const ref_profils = firebase.database().ref("profils");
              const ref_unprofil = ref_profils.child("profil" + currentId);
           
                ref_unprofil.update({
                  onLine: false,
                });
            }
            
                
              
            
          }
        
      
    });
  },[currentId]);

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
              
              /*if ((email === "A") && (pwd === "0")){
                navigation.navigate("Home");
              } else alert("error");*/
              auth.signInWithEmailAndPassword(email,pwd)
              .then(()=>{
                const currentId = auth.currentUser.uid;
                navigation.navigate('Home',{ currentId : currentId });

                
                
              })
              .catch ((err)=>{alert(err)})
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
