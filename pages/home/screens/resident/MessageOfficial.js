import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView, Dimensions,TextInput} from 'react-native';
import { database,firebase } from "../../../../firebase/firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ref, onChildAdded, onChildChanged, onChildRemoved, set, push, onValue } from "firebase/database";
import { connectAuthEmulator } from "firebase/auth";
import { getUID } from "../../../../LoginModels";
import { get_resident_id } from "./BookModel";
var temp = []
const MessageOfficial = () =>{
    var height = Dimensions.get('window').height
    var width = Dimensions.get('window').width
    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [content, setContent] = useState([])
    var temp = []
    useEffect(() => {
        const messages = ref(database, 'messages/' + getUID());
         onValue(messages, (snapshot) => {
            const data = snapshot.val();
            temp.push(data)
          });

        onChildAdded(messages, (data) => {
            // addCommentElement(postElement, data.key, data.val().text, data.val().author);
            temp.push(data.val())
            setContent(temp)
          });
          
          onChildChanged(messages, (data) => {
            // setCommentValues(postElement, data.key, data.val().text, data.val().author);
          });
          
          onChildRemoved(messages, (data) => {
            // deleteComment(postElement, data.key);
          });
    }, [])


    const sendMessage = () =>{
        var today = new Date();
        var epoch = Date.parse(today)
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        today = mm + '/' + dd + '/' + yyyy + " " + time;

        const newPostRef = push(ref(database, 'messages/' + getUID()));
        set(newPostRef,{
           message:message,
           uid:getUID(),
        });
        setMessage('')

    }
    console.log(content)
    return(
        <View>
            <View style={{width:width, height:height}}>
                <View style={{height:'10%', borderColor:'#121212', borderBottomWidth:1, alignItems:'center'}}>
                    <Text style={{ marginTop:'auto',marginBottom:'auto'}}>Resident Name</Text>
                </View>

                <ScrollView style={{height:'80%', borderColor:'#121212', borderBottomWidth:1, padding:5}}>
                    <View>
                    {content == null ? <Text>No Chats</Text> :
                     content.map((data, key) =>{
                        if(key == 0){
                            if(getUID() == data['uid']){
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginLeft:'auto', marginBottom:10, borderRadius:10}}>
                                        <Text >{data['message']}</Text>
                                    </View>
                                    )
                            }
                            else{
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'gainsboro',alignItems:'center',marginRight:'auto', marginBottom:10, borderRadius:10, marginTop:'auto'}}>
                                        <Text >{data['message']}</Text>
                                     </View> 
                                )
                            }  
                        }
                        else{
                            if(getUID() == data['uid']){
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginLeft:'auto', marginBottom:10, borderRadius:10}}>
                                        <Text >{data['message']}</Text>
                                    </View>
                                    )
                            }
                            else{
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'gainsboro',alignItems:'center',marginRight:'auto', borderRadius:10, marginBottom:10}}>
                                        <Text >{data['message']}</Text>
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