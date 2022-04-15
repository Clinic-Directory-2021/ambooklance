import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity,View, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import {auth, firebase} from '../../../firebase/firebase-config'
import { updateEmail} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getUID, getUserEmail, getUserPass, setUserEmail, } from "../../../LoginModels";

const ChangeEmail = ({navigation}) =>{
    const [email, set_email] =  useState('')
    const [indicatorFlag, setIndicatorFlag] = useState(false)
    const SetData = async ()=>{
        console.log(getUserEmail())
                
                  setIndicatorFlag(true)
                  updateEmail(auth.currentUser, email).then(() => {
                    // Email updated!
                    // ...
                    console.log('Updated Email')
                    setUserEmail(email)
                  }).catch((error) => {
                    console.log(error)
                  });
                  updateDoc(doc(firebase, "Users", getUID()),{
                    email:email,
                  });
                  alert('Successfully Changed Email')
                  setIndicatorFlag(false)
                  navigation.navigate('Settings')
                    // Signed in 
                   
                    // ...
        // navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            
            <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,}}>Email</Text>  
            <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text=>set_email(text)}
          />
          <Text style={{textAlign:'center', fontStyle:'italic'}}>Current Email: {getUserEmail()}</Text>
            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={SetData}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Change Email</Text>
          </TouchableOpacity>
          <ActivityIndicator size="large" color="#0B3954" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} animating={indicatorFlag}/>
        </View>
    )
}
export default ChangeEmail

const styles = StyleSheet.create({
    container: {
        padding:10,
        flex:1,
        marginTop:'20%',
    },
    buttonLogin:{
        borderRadius:50,
        padding: 10,
        alignItems:'center',
        margin: 12,
        width: 327,
        height: 57,
        backgroundColor: '#0B3954',
        alignSelf:'center',
      },
      input: {
        borderRadius:5,
        borderColor:'#ACB8C2',
        height: 40,
        width:327,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})