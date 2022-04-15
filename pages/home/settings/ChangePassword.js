import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity,View, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import {auth} from '../../../firebase/firebase-config'
import { updatePassword} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getUID, getUserPass, } from "../../../LoginModels";

const ChangePassword = ({navigation}) =>{
    const [old_password, set_old_password] =  useState('')
    const [new_password, set_new_password] =  useState('')
    const [confirm_password, set_confirm_password] =  useState('')
    const [indicatorFlag, setIndicatorFlag] = useState(false)
    const SetData = async ()=>{
        if(old_password == new_password){
            alert('You must try a new password different from your old password.')
        }
        else{
            if(new_password != confirm_password){
                alert('New Password and Confirm password does not matched.')
            }
            else{
                updatePassword(auth.currentUser, new_password).then(() => {
                    // Update successful.
                    alert('Successfully Changed Your Password')
                    navigation.navigate('Settings')
                  }).catch((error) => {
                    // An error ocurred
                    alert(error)
                    // ...
                  });
            }
        }
                    // Signed in 
                   
                    // ...
        // navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            
            <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,}}>Email</Text>  
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Old Password"
                value={old_password}
                onChangeText={text=>set_old_password(text)}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="New Password"
                value={new_password}
                onChangeText={text=>set_new_password(text)}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Confirm Password"
                value={confirm_password}
                onChangeText={text=>set_confirm_password(text)}
            />
            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={SetData}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Change Password</Text>
          </TouchableOpacity>
          <ActivityIndicator size="large" color="#0B3954" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} animating={indicatorFlag}/>
        </View>
    )
}
export default ChangePassword

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