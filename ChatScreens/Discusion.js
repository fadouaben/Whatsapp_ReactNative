import { View, Text, StyleSheet, ImageBackground, FlatList, Image,Linking, ScrollView, Touchable } from 'react-native'
import React, { useEffect , useState } from 'react'
import { SearchBar } from 'react-native-screens';
import FontAwesome5 from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../Config';
import { TextInput } from 'react-native';


export default function Discusion({route}) {
    const [writing, setWriting] = useState(false);

    //data = [{nom :"fadoua", prenom:"ben", num:"25612266"},{nom :"firas", prenom:"ggg", num:"25612266"}]
    const { currentId, userIdToSendMessage }=route.params;
    const [couleur, setCouleur] = useState('#0005');
    const [msg, setMsg] = useState('');
    const [couleurb, setCouleurb] = useState('#0005');
    const [date, setDate] = useState(new Date())
    const [messagesEnv, setMessagesEnv] = useState([]);
    const [messagesRec, setMessagesRec] = useState([]);
    


    useEffect(()=>{
      const ref_messages = firebase.database().ref('messages');

      //messages que vous les envoyer
      const ref_room = ref_messages.child('room_'+currentId+'_'+userIdToSendMessage);
      const ref_messages_room =ref_room.child('messages');

      const messagesList=ref_messages_room.on('value',(snapshot)=>{
        const messagesData=snapshot.val();
        if(messagesData){
          const messagesArray = Object.keys(messagesData).map((key)=>({
            id: key,
            ...messagesData[key],
          }));
          setMessagesEnv(messagesArray);
        }
        else{
          setMessagesEnv([]);
        }
      });

      //message rçu
      const ref_roomRec = ref_messages.child('room_'+userIdToSendMessage+'_'+currentId);
      const ref_dist_writing = ref_roomRec.child('typing');
      ref_dist_writing.on('value',(snapshot)=>{setWriting(snapshot.val());});

      const ref_messages_roomRec =ref_roomRec.child('messages');

      const messagesListRec=ref_messages_roomRec.on('value',(snapshot)=>{
        const messagesData=snapshot.val();
        if(messagesData){
          const messagesArray = Object.keys(messagesData).map((key)=>({
            id: key,
            ...messagesData[key],
          }));
          setMessagesRec(messagesArray);
        }
        else{
          setMessagesRec([]);
        }
      });



      return ()=>{
        ref_room.off('value',messagesList);
        ref_roomRec.off('value',messagesListRec);
      };

    },[currentId,userIdToSendMessage]);

    const allMsgs=[...messagesEnv, ...messagesRec];
    const sortMsgs = allMsgs.sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime());
      /*const dateA =new Date(a.date).getTime() ;
      const dateB =  new Date(b.date).getTime();
      if (dateA === dateB){
        return a.id.localCompare(b.id);
      }
      else {
        return dateA - dateB;
      }*/
    
    
      //new Date(a.date).getTime() - new Date(b.date).getTime()};
  return ( 
    <View style={styles.container}>
     {/* <StatusBar style="auto" />
      <View
           style={{height:24,width:"100%",backgroundColor:"#ffeedf"}}>
      </View> */}
     
     <ImageBackground
         style={{
            alignItems:'center',
            justifyContent:'flex-start',
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
                  height:"90%",
                  width:350,
                }}
              >
                <ScrollView style={{ width: '100%' }}>
                  {sortMsgs.map((message) => (
                    <View key={message.id} style={[styles.messageContainer,{
                          alignSelf: message.senderId === currentId ? 'flex-end' : 'flex-start',
                          backgroundColor: message.senderId === currentId ? 'white' : 'blue',
                        },]}>
                      <Text style={styles.messageText}>{message.msg}</Text>
                    </View>
                  ))}
                </ScrollView>
                
                
                
                {
                  writing ? 
                  (<Text>Writing...</Text>):
                  (<Text></Text>)
                }
                
            </View>
            <View style={{
                  flexDirection:'row',
                  alignItems: 'center',
                  justifyContent:'flex-start',
                  borderRadius:8,
                  backgroundColor:"#fff0",
                  height:"10%",
                  width:350,
                  display:'flex',
                  
                }}>
                
                <TextInput style={[styles.input,{borderColor:couleurb}]} 
                  value={msg}
                  placeholder='write your message ...'
                  onChangeText={(text)=>{
                    
                    setCouleurb("black");
                    
                    setCouleur("black");
                    setMsg(text);
                    const ref_messages = firebase.database().ref('messages');
                    const ref_room = ref_messages.child('room_'+currentId+'_'+userIdToSendMessage);
                    const ref_dist_writing = ref_room.child('typing');
                    ref_dist_writing.set(text.length > 0);
                    

                  }}

                />
               
                
                <Ionicons name="send-sharp" size={30} color={msg.length > 0 ? 'black' : 'gray'} disabled={msg.length <= 0}  onPress={
                  ()=>{
                    console.log(new Date("2023-12-03T20:24:09.147Z").getTime()-new Date("2023-12-03T20:18:00.699Z").getTime());
                    setDate(new Date());
                    const ref_messages = firebase.database().ref('messages');
                    const ref_room = ref_messages.child('room_'+currentId+'_'+userIdToSendMessage);
                    const ref_messages_room =ref_room.child('messages');
                    const key = ref_messages_room.push().key;
                    const ref_unmessage = ref_messages_room.child('message'+key);
                    ref_unmessage.set({
                      id:key,
                      msg:msg,
                      date:Date.now(),
                      senderId:currentId,
                    });
                    const ref_dist_writing = ref_room.child('typing');
                    ref_dist_writing.set(false);
                    setMsg('');
                    
                    setCouleurb('#0005');
                  }
                }/>
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
   width:"80%",
   borderRadius:20,
   textAlign:"center",
   backgroundColor:"#fff0",
   fontSize:16,
   fontFamily:"serif",
   marginBottom:5,
   marginTop:10,
   borderWidth:1,
   marginRight:18,
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
  messageContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: '80%',
  },
  messageText: {
    color: '#000',
    fontSize: 16,
  },
});