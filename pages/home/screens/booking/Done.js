import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView, TextInput} from 'react-native';

const Done = ({navigation}) =>{
    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={styles.container}>
                <Image source={require('../../../../assets/my_assets/car.png')} style={{marginTop:50}}/>
            </View>
            <Text style={styles.label}>Please keep fighting!</Text>
            <Text style={styles.label}>The Ambulance is on its way.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('Maps')
                }
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
    )
}

export default Done;

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
        fontSize:22,
        alignSelf:'center',
        textAlign:'justify'
      },
    button:{
        borderRadius:50,
        padding: 10,
        alignItems:'center',
        margin: 12,
        width: 327,
        height: 57,
        marginTop:100,
        alignSelf:'center',
        backgroundColor: '#0B3954',
    },
})