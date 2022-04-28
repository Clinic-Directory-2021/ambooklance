import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView, Dimensions,TextInput} from 'react-native';
import { database,firebase } from "../../../../firebase/firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ref, onChildAdded, onChildChanged, onChildRemoved, set, push, onValue } from "firebase/database";
import { connectAuthEmulator } from "firebase/auth";
import { getUID } from "../../../../LoginModels";
import { get_resident_id } from "./BookModel";

const renderMessage = (messages) =>{
    var temp = []
    // onChildAdded(messages, (data) => {
    //     temp.push({message: data.val().message, uid: data.val().uid})
    // });
    onValue(messages, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          temp.push({'message':childData.message,'uid':childData.uid})
          // ...
        });
      }, {
        onlyOnce: true
      });
    return temp
}
const updateMessage = (messages) =>{
    var temp = []
    onChildAdded(messages, (data) => {
        temp.push({'message':data.val().message,'uid':data.val().uid})
      });
    return temp
}
const MessageOfficial = () =>{
    const scrollViewRef = useRef();
    var height = Dimensions.get('window').height
    var width = Dimensions.get('window').width
    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [content, setContent] = useState([])
    const [render, setRender] = useState(false)
    const messages = ref(database, 'messages/' + getUID());
    var count = 0
    useEffect(() => {
        setContent(renderMessage(messages))
        setInterval(()=>{
            setContent(updateMessage(messages))
        },5000)
    },[])
    const sendMessage = () =>{
        const newPostRef = push(ref(database, 'messages/' + getUID()));
        set(newPostRef,{
           message:message,
           uid:getUID(),
        });
        setMessage('')
        count++
    }
    return(
        <View>
            <View style={{width:width, height:height}}>
                <View style={{height:'10%', borderColor:'#121212', borderBottomWidth:1, alignItems:'center'}}>
                    <Text style={{ marginTop:'auto',marginBottom:'auto'}}>Resident Name</Text>
                </View>

                <ScrollView style={{height:'80%', borderColor:'#121212', borderBottomWidth:1, padding:5}} 
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                <View>
                {content <= 0 ?  <TouchableOpacity style={{marginTop:'50%', backgroundColor:'aqua'}} onPress={()=>setRender(true)}><Text style={{alignSelf:'center', fontStyle:'italic'}}>See Messages</Text></TouchableOpacity> :
                     content.map((data, key) =>{
                        if(key == 0){
                            if(getUID() == data['uid']){
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginLeft:'auto', marginBottom:10, borderRadius:10}}>
                                        <Text key={key}>{data['message']}</Text>
                                    </View>
                                    )
                            }
                            else{
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'gainsboro',alignItems:'center',marginRight:'auto', marginBottom:10, borderRadius:10, marginTop:'auto'}}>
                                        <Text key={key}>{data['message']}</Text>
                                     </View> 
                                )
                            }  
                        }
                        else{
                            if(getUID() == data['uid']){
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginLeft:'auto', marginBottom:10, borderRadius:10}}>
                                        <Text key={key}>{data['message']}</Text>
                                    </View>
                                    )
                            }
                            else{
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'gainsboro',alignItems:'center',marginRight:'auto', borderRadius:10, marginBottom:10}}>
                                        <Text key={key}>{data['message']}</Text>
                                    </View>)
                            }
                        }
                    })}
                </View>
            </ScrollView>
                <View style={{flexDirection:'row', marginTop:10, marginBottom:10, marginLeft:10, marginRight:10,height:'20%'}}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:'90%', padding:5 }}
                    placeholder={'Enter your message here'}
                    onChangeText={text => setMessage(text)}
                    value={message}
                />
                <TouchableOpacity style={{width:'10%', margin:5}} onPress={sendMessage}>
                    <Image source={require('../../../../assets/my_assets/send-message.png')} />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MessageOfficial