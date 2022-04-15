import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, ScrollView, Text, TextInput} from 'react-native';

const Contact = () =>{
    return(
    <ScrollView style={styles.container}>
        <View>
            <Image source={require('../../../../assets/my_assets/contact2.png')} style={{alignSelf:'center'}}/>
            <Text style={{fontWeight:'bold', fontSize:22, alignSelf:'center',margin:20}}>Hotline</Text>
            <TextInput
            style={styles.input}
            value="+63 929 3006 635"
            />
        </View>
    </ScrollView>
    )
}
 export default Contact;

 const styles = StyleSheet.create({
    container: {
        margin:20,
    },
    input: {
        borderRadius:5,
        borderColor:'#ACB8C2',
        height: 40,
        width:327,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlign:'center'
      },
  });