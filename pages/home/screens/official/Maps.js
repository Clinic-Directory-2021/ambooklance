import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView} from 'react-native';
import MapView from 'react-native-maps';  
import { getAddress, getFullName, getLatitude, getlongitude, getUserEmail, getUID} from "../../../../LoginModels";
import { Marker } from 'react-native-maps';
import logo from '../../../../assets/my_assets/logo.png'
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { firebase } from "../../../../firebase/firebase-config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
const Maps = () =>{
    const [bookFlag, setBookFlag] = useState(false)
    const [bookCoordinate, setBookCoordinate] = useState(null)
    const [currentPosition,setCurrentPosition] = useState({latitude: getLatitude(), longitude: getlongitude()})
    useEffect(() => {
        const q = query(collection(firebase, "Officials"), where("status", "==", "on the way"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const cities = {};
          querySnapshot.forEach((doc) => {
              cities.longitude =  doc.data().destination_longitude 
              cities.latitude = doc.data().destination_latitude
              if(doc.data()['status'] == 'on the way'){
                setBookFlag(true)
            }
                else{
                    setBookFlag(false)
                }
          });
          setBookCoordinate(cities)
        });

        if(bookCoordinate){
            // setInterval(()=>{
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                // if (status !== 'granted') {
                //   console.log('Permission to access location was denied');
                //   return;
                // }
                
                
                    console.log('running')
                    let location = await Location.getCurrentPositionAsync({});
                    setCurrentPosition({latitdue:location['coords']['latitude'], longitude:location['coords']['longitude']})
              })();
            // }, 1000)
            
        }
    }, [])
    
    console.log(getFullName() + " Hello")
    return(
        <View style={{flex:1,backgroundColor:'gainsboro',padding:10}}>
            <View>
                <TouchableOpacity 
                disabled={!bookFlag}
                style={{margin:10, backgroundColor:'#22bb33', width: 100, height:30, justifyContent:'center', alignItems:'center', borderRadius:5}}>
                    <Text style={{color:'white'}}>Im Here</Text>
                </TouchableOpacity>
            </View>
            <MapView
            style={style.map}
            region={{
                latitude:currentPosition['latitude'],
                longitude: currentPosition['longitude'],
                latitudeDelta:  0.0122,
                longitudeDelta: 0.0122,
              }}
        >
            <Marker  
                coordinate={{ latitude: getLatitude(), longitude: getlongitude() }}  
                title={getFullName()}  
                description={getAddress()}
                key={getUID()}
                flat={true}
            />
            
            {bookCoordinate && <Marker  
                coordinate={bookCoordinate}  
                title={"Book Name"}  
                description={"Destination"}
                pinColor='#FFCC00'
                key={getUID()}
                flat={true}
            />}
            {bookCoordinate && <Marker
                            coordinate={currentPosition}  
                            title={"driver"}  
                            description={"official"}
                            flat={true}
            >
                <Image source={logo}  style={{width:24, height:24}}/>
            </Marker>}
            <MapViewDirections
                origin={{latitude: getLatitude(), longitude: getlongitude()}}
                destination={bookCoordinate}
                apikey='AIzaSyDhsiDPQZMeiE9uGA4gRsGuGlpVP5cA_Ro'
                strokeWidth={5}
                strokeColor="green"
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