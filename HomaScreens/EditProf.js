import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import firebase from '../Config';
import { Alert, Button, ImageBackground, StyleSheet, Text,Image, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
const auth=firebase.auth();

const LoginButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);
const database = firebase.database();
export default function EditProf({route}) {
    const {profilId} = route.params;
  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [NUmTel,setTel]=useState("");
  const refinput2=useRef();
  const navigation =useNavigation()
  useEffect(()=>{
    const profilsRef = firebase.database().ref('profils').child(profilId);
    profilsRef.once('value',(snapshot)=>{
        const profileData = snapshot.val();
        if(profileData){
            setNom(profileData.nom);
            setPrenom(profileData.prenom);
            setTel(profileData.numero);
        }
    });
  },[profilId]);
  return (
    <View style={styles.container}>
     {/* <StatusBar style="auto" />
      <View
           style={{height:24,width:"100%",backgroundColor:"#ffeedf"}}>
      </View> */}
     
     <ImageBackground
         style={{
            alignItems:'center',
            justifyContent:'center',
            flex:1,
            height:"100%",
            width:"100%",
          }}
          source={require("../assets/image.png")}
           >
           <View
                style={{
                  alignItems: 'center',
                  justifyContent:'flex-start',
                  borderRadius:8,
                  backgroundColor:"#0005",
                  height:"95%",
                  width:300,
                }}>
                <Text style={{marginTop:25,fontSize:32,
                 fontWeight:"bold",
                  color:"white",
                  }}>My Account</Text>

               <Image source={require("../assets/user.png")} // Remplacez le chemin par le chemin réel de votre image
                    style={styles.image}
                />
                <TextInput 
                onChangeText={(text)=>{setNom(text)}}
                onSubmitEditing={()=>{
                  refinput2.current.focus();
                }}
                blurOnSubmit={false}
                value={nom}
                placeholder='Nom'
                keyboardType='default'
                style={styles.input} 
                ></TextInput>

                 <TextInput
                    value={prenom}
                 ref={refinput2} 
                onChangeText={(prenom)=>{setPrenom(prenom)}}
                placeholder='Prenom'
                keyboardType='default'
               
                style={styles.input} 
                ></TextInput>
                 <TextInput 
                value={NUmTel}
                onChangeText={(NUmTel)=>{setTel(NUmTel)}}
                placeholder='Num Tel'
                keyboardType='default'
                style={styles.input} 
                ></TextInput>
            
             {/* <Button
                onPress={()=>{
                    if (email==="A" && pwd==="0"){
                      alert("connection avec succés ");
                    }else alert("error");
                }}
                title='Sign In'></Button> */}
 
             <Button title="Edit"
            onPress={(e)=>{
                    const ref_profils = database.ref("profils");
                    
                    const ref_unprofil = ref_profils.child(profilId);
                    ref_unprofil.update({
                        nom:nom,
                        prenom:prenom,
                        numero:NUmTel,
                    });
                    navigation.goBack();
               
              }
            }
          
          />
   
           
            </View>
      </ImageBackground>   
     
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5326',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  input: {
   height:60,
   width:"90%",
   borderRadius:5,
   textAlign:"center",
   backgroundColor:"white",
   fontSize:16,
   fontFamily:"serif",
   marginBottom:5,
   marginTop:10
  },
  buttonContainer: {
    backgroundColor:"#edf5eb",
    padding: 10,
    borderRadius: 8,
    width:"80%",
    marginTop:10,
  },
  buttonText: {
    color: '#0009',
    fontSize: 18,
    textAlign:'center',
    fontWeight:"bold"

  },
  image:{
    padding: 10,
    borderRadius: 8,
    width:"50%",
    height:"25%",


  },
});