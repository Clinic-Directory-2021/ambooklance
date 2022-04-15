import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity,View, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {firebase} from '../../../firebase/firebase-config'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getUID } from "../../../LoginModels";

const AddAddress = ({navigation}) =>{
    const [indicatorFlag, setIndicatorFlag] = useState(false)
    const [address, setAddress] = useState('')
    useEffect( async () => {
        const docRef = doc(firebase, "Users", getUID());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data()['address']);
            setAddress(docSnap.data()['address'])
          } 
        else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    }, [])
    
    // const SetData = async ()=>{
        
    // }

    return (
        <View style={styles.container}>
            <View style={styles.addressDiv}>
                <TextInput
                style={styles.input}
                value={address}
                editable={false}
                // value={email}
                // onChangeText={text=>set_email(text)}
                />
                <TouchableOpacity
                style={{backgroundColor:'#ffcc00',height:40, width:40, marginTop:10, borderRadius:100, padding:10}}
                // onPress={SetData}
                >
                    <Text style={{textAlign:'center'}}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{backgroundColor:'#df4759',height:40, width:40, marginTop:10, borderRadius:100, padding:10}}
                // onPress={SetData}
                >
                    <Text style={{textAlign:'center'}}>Del</Text>
                </TouchableOpacity>
            </View>
            <GooglePlacesAutocomplete
            styles={{height:'50%'}}
            placeholder='Search your address'
            fetchDetails={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                // set_address(details['formatted_address']);
                // setLatitude(details['geometry'].location.lat);
                // setlongitude(details['geometry'].location.lng);
            }}
            query={{
                key: 'AIzaSyDhsiDPQZMeiE9uGA4gRsGuGlpVP5cA_Ro',
                language: 'en',
            }}
            />
            <TouchableOpacity
                style={styles.buttonLogin}
                // onPress={SetData}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Add Address</Text>
          </TouchableOpacity>
          <ActivityIndicator size="large" color="#0B3954" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} animating={indicatorFlag}/>
        </View>
    )
}
export default AddAddress

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
    address:{
        fontSize:18,
        padding:10,
        paddingBottom:50,
        borderBottomColor:'gainsboro',
        borderBottomWidth:1,
    },
    addressDiv:{
        flexDirection:'row'
    },
    input: {
        borderRadius:5,
        borderColor:'#ACB8C2',
        height: 40,
        width:'70%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})