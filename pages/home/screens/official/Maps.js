import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView} from 'react-native';
import MapView from 'react-native-maps';  
import { getAddress, getFullName, getLatitude, getlongitude, getUserEmail, getUID} from "../../../../LoginModels";
import { Marker } from 'react-native-maps';
const Maps = () =>{
    console.log(getFullName() + " Hello")
    return(
        <View style={{flex:1,backgroundColor:'gainsboro',padding:10}}>
            <MapView
            style={style.map}
            region={{
                latitude: getLatitude(),
                longitude: getlongitude(),
                latitudeDelta:  0.0522,
                longitudeDelta: 0.0522,
              }}
        >
            <Marker  
                coordinate={{ latitude: getLatitude(), longitude: getlongitude() }}  
                title={getFullName()}  
                description={getAddress()}
                key={getUID()}
                flat={true}
            />
        </MapView>
        </View>
    );
}
export default Maps;

const style = StyleSheet.create({
    map:{
        flex:1,
        height:'60%'
    },
    progressView:{
        marginBottom:10,
        height: '40%',
        backgroundColor:'white',
    },
    title:{
        textAlign:'center',
        fontSize:18,
        color:'#C81D35',
        fontWeight:'bold',
        borderBottomWidth:1,
        borderBottomColor:'gainsboro',
        padding:5,
        margin:5,
    },
    noAvailable:{
        textAlign:'center',
        marginTop:'10%',
        fontStyle:'italic',
        color:'grey'
    }
})