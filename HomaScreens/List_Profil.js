import { View, Text, StyleSheet, ImageBackground, FlatList, Image,Linking } from 'react-native'
import React, { useEffect , useState } from 'react'
import { SearchBar } from 'react-native-screens';
import FontAwesome5 from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../Config';
const auth=firebase.auth();

export default function List_Profil({navigation}) {
    //data = [{nom :"fadoua", prenom:"ben", num:"25612266"},{nom :"firas", prenom:"ggg", num:"25612266"}]
    const currentId =auth.currentUser.uid;
    const handleEdit = (profilId)=>{
      navigation.navigate('EditProf',{profilId});
    };
    
    const handleUpdate = (updateP)=>{
      const profilsRef = firebase.database().ref('profils');
      profilsRef.child(updateP.id).update(updateP);
    };

    const handleCall = (phoneNum)=>{
      const url = `tel:${phoneNum}`;
      Linking.canOpenURL(url)
        .then((supported)=>{
          if (supported){
            return Linking.openURL(url);
          }
          else{
            console.log("Numero non supporté");
          }
        })
        .catch((error)=> console.error('Erreur ouverture appel',error))
    }

    const [data, setData] =  useState([]);
     useEffect(()=>{
      const fetchData = async () =>
      {try{
          const profilsRef = firebase.database().ref('profils');
          profilsRef.on('value',(snapshot) => {
            const profies = snapshot.val();
            if (profies){
              const profilesArray = Object.keys(profies).map((key)=>{
               
                  return{
                    id:key,
                    ...profies[key],
                  }
                
                
              });
              setData(profilesArray);
            }
          });
      }catch(error){
          console.error("Error get data",error);
      }};
      fetchData();
    },[]);
    
    
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
                  width:350,
                }}>
                <Text style={{marginTop:25,fontSize:32, height:70,
                 fontWeight:"bold",
                  color:"white",
                  }}>List_Profil</Text>

                <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>{
                    const id = item.id;
                    if(id !== currentId){
                      return (
                        <View style={{flexDirection:'row',margin:10}}>
                          <Image source={{uri:item.url}} style={[styles.image,{width:40, height:40, }]}/>
                          {
                            item.onLine ? (<MaterialIcons name="online-prediction" size={24} color="green" />):
                            (<MaterialIcons name="online-prediction" size={24} color="transparent" />)
                          }
                          
                          <View style={{ marginLeft:10}}>
                              <View style={{ width:120}}>
                                <Text>{item.nom} {item.prenom}</Text>
                                <Text>{item.numero}</Text>
                              </View>
                              
                          </View>
  
                          <View  style={{flexDirection:'row',margin:10}}>
                          <Ionicons name="call" size={24} color="black" style={{marginRight:20}} onPress={()=>{handleCall(item.numero)}}/>
                          <FontAwesome name="edit" size={24} color="black" style={{marginRight:20}} onPress={()=>handleEdit(item.id)} />
                          <Ionicons name="chatbubble" size={24} color="black" onPress={()=>{
                              navigation.navigate('Discusion' ,{
                                currentId: currentId,
                                userIdToSendMessage: item.id,  
                              });
                          }}/>
                          </View>
                          
                        </View>
  
                      )
                    }
                    
                }}
                ></FlatList>
           
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
    borderRadius: 50,
    width:"50%",
    height:"25%",


  },
});