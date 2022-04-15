import React, { useState, Component, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView} from 'react-native';
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import { getAddress, getFullName, getLatitude, getlongitude, getUserEmail} from "../../../../LoginModels";
import {firebase} from '../../../../firebase/firebase-config'
import { collection, query, getDocs, where, onSnapshot, doc } from "firebase/firestore";
import { setData, getData} from "../../../../MapModels";

const Maps = () => {
    
    const [loc, setLoc] = useState([])
    const [books, setBooks] = useState([])
    const [flag, setFlag] = useState(false)
    const [bookFlag, setBookFlag] = useState(false)
    useEffect(async () => {
        // Update the document title using the browser API
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

        const q = query(collection(firebase, "Bookings"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            setBooks([])
            querySnapshot.forEach((doc) => {
                cities.push(doc.data());
            });
            setBooks(cities)
          });
      },[]);

    //   console.log(getBookings())
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
            <Marker  
                coordinate={{ latitude: getLatitude(), longitude: getlongitude() }}  
                title={getFullName()}  
                description={getAddress()}
                pinColor='#FFCC00'
                flat={true}
            />
            {loc.map((data,key) =>{
                if(data['email'] !=  getUserEmail()){
                    return(
                        <Marker
                            coordinate={{ latitude:data['latitude'], longitude: data['longitude'] }}  
                            title={data['full_name']}  
                            description={data['address']}
                            pinColor='#4BB543'
                            key={key} 
                        />
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