import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView, Dimensions,TextInput} from 'react-native';
import { database,firebase } from "../../../../firebase/firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ref, set, onValue } from "firebase/database";
import { connectAuthEmulator } from "firebase/auth";
import { getUID } from "../../../../LoginModels";

const MessageOfficial = () =>{
    var height = Dimensions.get('window').height
    var width = Dimensions.get('window').width
    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [content, setContent] = useState([])

    useEffect(() => {
        const q = query(collection(firebase, "Officials"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserId(doc.data()['user_id'])
          });
          
        });

        const messages = ref(database, 'users/');
        var temp = []
        onValue(messages, (snapshot) => {
        const data = snapshot.val();
        temp.push(data)
        });
         var temp2 = []
        Object.values(temp).forEach(function(data) {
            Object.values(data).forEach(function(data2) {
                temp2.push(data2)
            });
        });

        setContent(temp2)
    }, [])

    const sendMessage = () =>{
        var today = new Date();
        var epoch = Date.parse(today)
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

        today = mm + '/' + dd + '/' + yyyy + " " + time;
            set(ref(database, 'users/' + epoch), {
              user_id:getUID(),
              message:message,
              date:today
            });
            alert('success')
            setMessage('')
    }
    console.log(content)
    return(
        <ScrollView>
            <View style={{width:width, height:height}}>
                <View style={{height:'10%', borderColor:'#121212', borderBottomWidth:1, alignItems:'center'}}>
                    <Text style={{ marginTop:'auto',marginBottom:'auto'}}>Resident Name</Text>
                </View>

                <View style={{height:'80%', borderColor:'#121212', borderBottomWidth:1, padding:5}}>
                    {content.map((data, key) =>{
                        if(key == 0){
                            if(getUID() == data['user_id']){
                                return(
                                    <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginRight:'auto', marginBottom:10, borderRadius:10}}>
                                        <Text >{data['message']}</Text>
                                    </View>
                                    )
                            }
                            return(
                                <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginLeft:'auto', marginBottom:10, borderRadius:10, marginTop:'auto'}}>
                                    <Text >{data['message']}</Text>
                                 </View> 
                            )
                        }
                        if(getUID() == data['user_id']){
                            return(
                                <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginLeft:'auto', marginBottom:10, borderRadius:10}}>
                                    <Text >{data['message']}</Text>
                                </View>
                                )
                        }
                        return(
                        <View style={{width:'50%',padding:5, backgroundColor:'gainsboro',alignItems:'center',marginRight:'auto', borderRadius:10, marginBottom:10}}>
                            <Text >{data['message']}</Text>
                        </View>)
                    })}
                    {/* <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginLeft:'auto', marginBottom:10, borderRadius:10, marginTop:'auto'}}>
                        <Text >Hello</Text>
                    </View> */}
                    {/* <View style={{width:'50%',padding:5, backgroundColor:'gainsboro',alignItems:'center',marginRight:'auto', borderRadius:10, marginBottom:10}}>
                        <Text >Hi</Text>
                    </View>
                    <View style={{width:'50%',padding:5, backgroundColor:'gainsboro',alignItems:'center',marginRight:'auto', borderRadius:10, marginBottom:10}}>
                        <Text >Hi</Text>
                    </View>
                    <View style={{width:'50%',padding:5, backgroundColor:'aqua',alignItems:'center',marginLeft:'auto', marginBottom:10, borderRadius:10}}>
                        <Text >How are you?</Text>
                    </View> */}
                </View>
                <View style={{flexDirection:'row', marginTop:10, marginBottom:10, marginLeft:10, marginRight:10,height:'30%'}}>
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
        </ScrollView>
    )
}

export default MessageOfficial