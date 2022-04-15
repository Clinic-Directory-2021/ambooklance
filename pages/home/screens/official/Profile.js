import React, { useState } from "react";
import { Text, Image, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const Profile = () =>{
    return(
    <ScrollView style={styles.container}>
        <SafeAreaView>
        <TouchableOpacity style={{alignItems:'center', marginBottom: 30}} disabled={true}>
            <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/image_picker.png')} />
        </TouchableOpacity>
          <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Full Name</Text>  
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Full name"
          />
          <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Age</Text>  
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Age"
          />
          <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Birthdate</Text>  
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Full name"
          />
          <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Contact number</Text>  
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Full name"
          />
          <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Address</Text> 
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Address"
          />
          <Text style={{fontSize:12, textAlign:'center', marginBottom:20, color:'#656F77'}}>Note: This address will be used in case of emergency</Text>
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
          />
          <View>
            <TouchableOpacity
              style={{  backgroundColor:'#0B3954', borderColor:'#0B3954',borderWidth:1, padding:10, borderRadius:5,height: 40, width:127, marginLeft:12}}
            >
              <Text style={{color:'white', fontWeight:'bold', alignSelf:'center'}}>Edit Information</Text>
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