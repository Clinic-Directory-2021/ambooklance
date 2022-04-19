import React, { useState, Component, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView} from 'react-native';
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getAddress, getFullName, getLatitude, getlongitude, getUserEmail, getUID} from "../../../../LoginModels";
import {firebase} from '../../../../firebase/firebase-config'
import { collection, query, getDocs, where, onSnapshot, doc } from "firebase/firestore";
import { setData, getData} from "../../../../MapModels";
import MapViewDirections from 'react-native-maps-directions';
import logo from '../../../../assets/my_assets/logo.png'
import GetLocation from 'react-native-get-location'
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

const Maps = () => {
    const [loc, setLoc] = useState([])
    const [books, setBooks] = useState([])
    const [flag, setFlag] = useState(false)
    const [bookFlag, setBookFlag] = useState(false)

    useEffect(async () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            alert(location['coords']['latitude'] + ' ' + location['coords']['longitude']);
          })();

        if(flag == false){
        const q = query(collection(firebase, "Users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.data()['email'])
            setData(doc.data())
            
        })
        setFlag(true)
        setLoc(getData())
        }

        const q = query(collection(firebase, "Bookings"), where("uid", "==", getUID() ));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            setBooks([])
            querySnapshot.forEach((doc) => {
                cities.push(doc.data());
            });
            setBooks(cities)
          });
      },[]);
    return(<View style={{flex:1,backgroundColor:'gainsboro',padding:10}}>
        {/* <GooglePlacesAutocomplete
            styles={{flex:2}}
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details['formatted_address']);
                console.log(details['geometry'].location.lat)
                console.log(details['geometry'].location.lng)
            }}
            query={{
                key: 'AIzaSyDhsiDPQZMeiE9uGA4gRsGuGlpVP5cA_Ro',
                language: 'en',
            }}
            // currentLocation={true}
        /> */}
        <View style={style.progressView}>
            <Text style={style.title}>Booking Progress</Text>
            <ScrollView>
            {books && books.map((data, key) => {
                // if(data['booking_type'])
                return(
                        <View style={{margin:5, borderRadius: 10,width:'90%', height:80, marginEnd:'auto', marginStart:'auto', padding:20, flexDirection:'row', borderColor:'gainsboro', borderWidth:1}}>
                            <Text style={{marginEnd:10}}>{data['booking_type']}</Text>
                            <Text style={{fontStyle:'italic'}}>on progress...</Text>
                            <TouchableOpacity style={{marginStart:'auto'}}>
                                <Text style={{color:'blue'}}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginStart:'auto'}}>
                                <Text style={{color:'red'}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                )
            })}
            </ScrollView>
            {/* <Text style={style.noAvailable}>No Booking yet</Text> */}
        </View>
        <MapView
            style={style.map}
            region={{
                latitude: getLatitude(),
                longitude: getlongitude(),
                latitudeDelta:  0.0522,
                longitudeDelta: 0.0522,
              }}
        >
            <MapViewDirections
                origin={{latitude: 14.9900171, longitude: 120.7454165}}
                destination={{latitude: 14.9522678, longitude: 120.767065 }}
                apikey='AIzaSyDhsiDPQZMeiE9uGA4gRsGuGlpVP5cA_Ro'
                strokeWidth={5}
                strokeColor="green"
            />
            <Marker  
                coordinate={{ latitude: getLatitude(), longitude: getlongitude() }}  
                title={getFullName()}  
                description={getAddress()}
                pinColor='#FFCC00'
                key={getUID()}
                flat={true}
            />
            <Marker
                            coordinate={{ latitude:14.9900171, longitude: 120.7454165 }}  
                            title={"driver"}  
                            description={"official"}
                            flat={true}
            >
                <Image source={logo}  style={{width:24, height:24}}/>
            </Marker>
            {loc.map((data,key) =>{
                if(data['user_type'] == 'official' ){
                    return(
                        <Marker
                            coordinate={{ latitude:data['latitude'], longitude: data['longitude'] }}  
                            title={data['full_name']}  
                            description={data['address']}
                            key={key} 
                            flat={true}
                        >
                            {/* <Image source={logo}  style={{width:24, height:24}}/> */}
                        </Marker>
                    )
                }
            
            })}
        </MapView>
        
    </View>)
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