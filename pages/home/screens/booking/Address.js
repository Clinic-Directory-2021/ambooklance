import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView, TextInput} from 'react-native';
import { firebase } from "../../../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore"; 
import { getUID, getFullName, getAddress, getLatitude, getlongitude } from "../../../../LoginModels";
import { getAccidentType } from "../../../../BookingModel";
import { setMapFlag } from "../../../../MapModels";

const Address = ({navigation}) =>{
    const SetData = async () =>{
      let today = new Date()
      let ISOyear = today.getFullYear() + "/" + (today.getMonth() + 1)  + "/" + today.getDate();
      var document_id = Date.parse(today);
      await setDoc(doc(firebase, "Bookings", document_id.toString()),{
        accident_type: getAccidentType(),
        uid:getUID(),
        user_full_name:getFullName(),
        booking_date: ISOyear,
        address: getAddress(),
        user_latitude: getLatitude(),
        user_longitude: getlongitude(),
        booking_type: 'Emergency',
        status:"pending",
        book_id:document_id.toString(),
        })
       .then(()=>{
        navigation.navigate('Done')
      });
    }
    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={styles.container}>
                <Image source={require('../../../../assets/my_assets/address.png')} style={{marginTop:50}}/>
            </View>
            <Text style={styles.label}>Is this the right address?</Text>
            <Text style={styles.addressLabel}>{getAddress()}</Text>
            <TouchableOpacity style={{alignSelf:'center'}}><Text style={{fontSize:14}}>Choose Another Address</Text></TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  // navigation.navigate('Done')
                  SetData()
                }
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Book</Text>
          </TouchableOpacity>
        </ScrollView>
    )
}

export default Address;

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
        marginTop:50,
        alignSelf:'center',
        backgroundColor: '#0B3954',
      },
})