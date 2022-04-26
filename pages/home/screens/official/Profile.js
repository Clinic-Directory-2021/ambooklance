import React, { useState } from "react";
import { Text, Image, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import {getAddress, getAge, getBirthdate, getEmail,getImageUrl, getFullName, getPhoneNumber, getUID, setAddress, setAge, setBirthdate, setEmail, setFullName, setPhoneNumber} from '../../../../LoginModels'
import { doc, updateDoc } from "firebase/firestore";
import {firebase} from '../../../../firebase/firebase-config'

const Profile = () =>{
  const [profileFlag, setProfileFlag] = useState(false)
  const [buttonName, setButtonName] = useState('Edit Information')

  const [fullName, fullNameHook] = useState(getFullName())
  const [phoneNumber, phoneNumberHook] = useState(getPhoneNumber())
  const [birthdate, birthdateHook] = useState(getBirthdate())
  const [age, ageHook] = useState(getAge())
  const [address, addressHook] = useState(getAddress())
  const buttonFunct = async () =>{
    setProfileFlag(!profileFlag)
    if(!profileFlag){
      setButtonName('Save Changes')}
    else{
      setButtonName('Edit Information')
      const washingtonRef = doc(firebase, "Users", getUID());
      await updateDoc(washingtonRef, {
        full_name: fullName,
        address:address,
        age:age,
        birthdate:birthdate,
        phone_number:phoneNumber
      }).then(()=>{
          setPhoneNumber(phoneNumber)
          setFullName(fullName)
          setBirthdate(birthdate)
          setAge(age)
          setAddress(address)
        alert('Data updated.')
      });
    }
  }
    return(
      <ScrollView style={styles.container}>
      <SafeAreaView>
      <TouchableOpacity style={{alignItems:'center', marginBottom: 30}} disabled={true}>
          <Image source={{uri:getImageUrl()}} style={{width:120, height:120, borderRadius:100}}/>
      </TouchableOpacity>
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Full Name</Text>  
        <TextInput
          style={styles.input}
          editable={profileFlag}
          placeholder="Full name"
          value={fullName}
          onChangeText={text=>fullNameHook(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Age</Text>  
        <TextInput
          style={styles.input}
          editable={profileFlag}
          placeholder="Age"
          value={age}
          onChangeText={text=>ageHook(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Birthdate</Text>  
        <TextInput
          style={styles.input}
          editable={profileFlag}
          placeholder="Birth Date"
          value={birthdate}
          onChangeText={text=>birthdateHook(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Contact number</Text>  
        <TextInput
          style={styles.input}
          editable={profileFlag}
          placeholder="Contact Number"
          value={phoneNumber}
          onChangeText={text=>phoneNumberHook(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Address</Text> 
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Address"
          value={address}
          onChangeText={text=>addressHook(text)}
        />
        {/* <Text style={{fontSize:12, textAlign:'center', marginBottom:20, color:'#656F77'}}>Note: This address will be used in case of emergency</Text>
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Additional Address</Text>
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Address"
        />
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Address"
        /> */}
        <View style={{margin:20}}>
        <TouchableOpacity
            style={{  backgroundColor:'#0B3954', borderColor:'#0B3954',borderWidth:1, padding:10, borderRadius:5,height: 40, width:127, marginLeft:12}}
            onPress={buttonFunct}
          >
            <Text style={{color:'white', fontWeight:'bold', alignSelf:'center'}}>{buttonName}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
    )
}
 export default Profile;
 const styles = StyleSheet.create({
    // main design
    container: {
        margin:20
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    buttonRow: {
      marginTop:100,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    login: {
      borderColor:'#0B3954',
      borderWidth:2,
      backgroundColor:'white',
      padding:5,
      width:145,
      alignItems: 'center',
      borderRadius: 50,
      marginLeft:5,
      marginRight:5,
    },
    signUp: {
     backgroundColor:'#0B3954',
     padding:5,
     width:145,
     alignItems: 'center',
     borderRadius: 50,
     marginLeft:5,
     marginRight:5,
    },
    input: {
      borderRadius:5,
      borderColor:'#ACB8C2',
      height: 40,
      width:327,
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttonLogin:{
      borderRadius:50,
      padding: 10,
      alignItems:'center',
      margin: 12,
      width: 327,
      height: 57,
      backgroundColor: '#0B3954',
    }
  });