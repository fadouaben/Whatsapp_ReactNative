import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import firebase from '../Config';
import { Alert, Button, ImageBackground, StyleSheet, Text,Image, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


const auth=firebase.auth();


const database = firebase.database();
const storage = firebase.storage();
export default function MyAccount(props,params) {
  //const currentId = props.route.params.currentId;
  const user = auth.currentUser;
  const currentId =user.uid;
  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [NUmTel,setTel]=useState("0");
  const [isDefault, setIsDefault] = useState(true);
  const [uricod, setUricod] = useState()
  const refinput2=useRef();
  const navigation =useNavigation();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      /*setIsdefault(false);
      seturlImage(result.assets[0].uri);*/
      const uri = result.assets[0].uri;
      setIsDefault(false);
      setUricod(uri);
    }
  };
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };

  const uploadLocalImage = async (urilocal)=>{
    //covertir l'image  to blob 
    const blob = await imageToBlob(urilocal);

    //save blob to reference
    const ref_mes_images = storage.ref().child('MesImages');
    const ref_une_image = ref_mes_images.child('Image'+currentId+'.png');
    ref_une_image.put(blob);

    //get uri
    const uri =await ref_une_image.getDownloadURL();
    return uri;
  }
  
  //les données de cureent user
  useEffect(()=>{
    //vérifier si user est connecté
    if(user){

      const ref_profils = database.ref('profils');
      const ref_unprofil = ref_profils.child('profil'+currentId);
      const profil = ref_unprofil.once('value');
      //once pour obtenir les données une seule fois
      profil.then(snapshot => {
          const data = snapshot.val();
          //verif si données existe
          if(data){
           
            if(data.url !=="" && data.nom !=="nom" && data.prenom != "prenom" && data.numero !== "numero"){
              setIsDefault(false);
              setNom(data.nom || "");
              setPrenom(data.prenom || "");
              setTel(data.numero ||"0");
               setUricod(data.url);
            }
            
            
          } 
        })
        .catch(error => {
          console.error("Erreur lors de la récupération",error);
        })
    }
  },[user,currentId]);
  
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

                <TouchableOpacity style={{width:'50%',height:'20%',marginTop:50,borderRadius: 100,marginBottom:50}} onPress={()=>{
                  pickImage();
                  

                }}>
                  <Image source={isDefault ?  require("../assets/user.png") : {uri:uricod}} 
                      style={styles.image}
                  />
                </TouchableOpacity>
               
                <TextInput 
                onChangeText={(text)=>{setNom(text)}}
                onSubmitEditing={()=>{
                  refinput2.current.focus();
                }}
                blurOnSubmit={false}
                placeholder='Nom'
                keyboardType='default'
                style={styles.input} 
                value={nom}
                ></TextInput>

                 <TextInput
                 ref={refinput2} 
                onChangeText={(prenom)=>{setPrenom(prenom)}}
                placeholder='Prenom'
                keyboardType='default'
                value={prenom}
                style={styles.input} 
                ></TextInput>
                 <TextInput 
                onChangeText={(NUmTel)=>{setTel(NUmTel)}}
                placeholder='Num Tel'
                keyboardType='default'
                style={styles.input} 
                value={NUmTel}
                ></TextInput>
            
             {/* <Button
                onPress={()=>{
                    if (email==="A" && pwd==="0"){
                      alert("connection avec succés ");
                    }else alert("error");
                }}
                title='Sign In'></Button> */}
 
             <Button title="Save"
            onPress={async(e)=>{
                    const ref_profils = database.ref("profils");
                    //const key = ref_profils.push().key;
                    const ref_unprofil = ref_profils.child("profil"+currentId );
                    const url =await uploadLocalImage(uricod);
                    //const snapshot = ref_unprofil.once('value');
                    
                    const existeData = ref_unprofil.once('value')
                      .then(snapshot => {
                        const existeData = snapshot.val();
                        if (existeData){
                          ref_unprofil.update({
                            nom:nom,
                            prenom:prenom,
                            numero:NUmTel,
                            url:url,
                            onLine:true,
                            
                          });
                          
                        }
                        else{
                          ref_unprofil.set({
                            id:currentId,
                            nom:nom,
                            prenom:prenom,
                            numero:NUmTel,
                            url:url,
                            onLine:true,
                            
    
                        });
                   
                        }
                      })
                      .catch(error => {
                        console.error("Erreur lors de la récupération", error);
                      });
                    
                    
              }
            }
          
          />

            <Button title="LogOut"
              onPress={async(e)=>{ 
                const ref_profils = database.ref("profils");
                const ref_unprofil = ref_profils.child("profil"+currentId );

                ref_unprofil.update({
                  onLine:false,
                });
                navigation.replace('Auth');
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
    borderRadius: 200,
    width:"100%",
    justifyContent:'center',
    height:"100%",
   


  },
});