import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView, TextInput} from 'react-native';
import { firebase } from "../../../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore"; 
import { getUID, getFullName, getAddress, getLatitude, getlongitude } from "../../../../LoginModels";
import { setMapFlag } from "../../../../MapModels";

const PatientTransferBooking = ({navigation}) =>{
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [medicalCondition, setMedicalCondition] = useState('')

    const SetData = async() =>{
    let today = new Date()
    let ISOyear = today.getFullYear() + "/" + (today.getMonth() + 1)  + "/" + today.getDate();
    var document_id = Date.parse(today);

    await setDoc(doc(firebase, "Bookings", document_id.toString()),{
      uid:getUID(),
      user_full_name:getFullName(),
      patient_full_name: name,
      patient_age:age,
      patient_medical_condition:medicalCondition,
      booking_date: ISOyear,
      address: getAddress(),
      user_latitude: getLatitude(),
      user_longitude: getlongitude(),
      booking_type: 'Transfer'
      })
     .then(()=>{
      navigation.navigate('Done')
      setMapFlag(false)
    });
    }
    return(
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.container}>
            <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/patient_transfer.png')}/>
        </View>
        <Text style={styles.label}>Patient Transfer to Another Hospital</Text>
        <View style={{margin:20}}>
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Name</Text>  
        <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={text=>setName(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Age</Text> 
        <TextInput
            style={styles.input}
            placeholder="Enter Age"
            value={age}
            onChangeText={text=>setAge(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Medical Condition/s</Text> 
        <TextInput
            style={styles.input}
            placeholder="Enter Medical Condition/s"
            value={medicalCondition}
            onChangeText={text=>setMedicalCondition(text)}
        />
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() =>
              SetData()
            }
        >
        <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Book</Text>
      </TouchableOpacity>
    </ScrollView>
    )
}

export default PatientTransferBooking;

const styles = StyleSheet.create({
    // main design
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin:10
    },
    label: {
        margin: 8,
        marginBottom:50,
        fontSize:22,
        fontWeight:'bold',
        alignSelf:'center',
        textAlign:'justify'
      },
    addressLabel: {
        margin: 8,
        fontSize:18,
        alignSelf:'center',
        textDecorationLine:'underline',
        marginTop:50
      },
      button:{
        borderRadius:50,
        padding: 10,
        alignItems:'center',
        margin: 12,
        width: 327,
        height: 57,
        alignSelf:'center',
        backgroundColor: '#0B3954',
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
        alignSelf:'center'
      },
})