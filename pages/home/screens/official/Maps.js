import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView, LogBox} from 'react-native';
import MapView from 'react-native-maps';  
import { getAddress, getFullName, getLatitude, getlongitude, getUserEmail, getUID} from "../../../../LoginModels";
import { Marker } from 'react-native-maps';
import logo from '../../../../assets/my_assets/logo.png'
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { firebase } from "../../../../firebase/firebase-config";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { get_resident_id, set_resident_id } from "./BookModel";

LogBox.ignoreAllLogs();
const Maps = ({navigation}) =>{
    const [bookFlag, setBookFlag] = useState(false)
    const [display, setDisplay] = useState('block')
    const [bookCoordinate, setBookCoordinate] = useState({latitude: getLatitude(), longitude: getlongitude()})
    const [currentPosition,setCurrentPosition] = useState({latitude: getLatitude(), longitude: getlongitude()})
    const [direction, setDirection] = useState({})
    const [bookData, setBookData] = useState()
        useEffect(() => {
            const q = query(collection(firebase, "Officials"), where('driver_id', "==", getUID()));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  if(doc.data()['status'] == 'on the way'){
                    setBookCoordinate({longitude:doc.data().destination_longitude, latitude:doc.data().destination_latitude})
                    setBookData(doc.data())
                    setBookFlag(true)
                    setDisplay('block')
                  }
                  else{
                    setBookFlag(false)
                    setDisplay('none')
                  }
              });
            });
    
                (async () => {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                      console.log('Permission to access location was denied');
                      return;
                    }
             
                        setInterval(async()=>{
                        let location = await Location.getCurrentPositionAsync({});
                        setCurrentPosition({latitude:location['coords']['latitude'], longitude:location['coords']['longitude']})
                    },1000)
                  })();

                  setInterval(async()=>{
                    const updateDriver = doc(firebase, "Officials", bookData['official_id']);
                    await updateDoc(updateDriver, {
                      current_latitude: currentPosition['latitude'],
                      current_longitude:currentPosition['longitude'],
                    });
                  },300000)
        }, [])
    const ImHereFunc = async () =>{
        const bookings = doc(firebase, "Bookings", bookData['book_id']);
        const officials = doc(firebase, "Officials", bookData['official_id']);
        await updateDoc(bookings, {
            status: "Arrived"
          });
        await updateDoc(officials, {
            status: "Arrived"
          });
        setDisplay('none')
        setBookFlag(!bookFlag)
        setBookCoordinate({latitude: getLatitude(), longitude: getlongitude()})
        alert('Success! You already Arrived. Please Contact the patient.')
    }

    const MessageResident = () =>{
        set_resident_id(bookData['user_id'])
        console.log(get_resident_id())
        navigation.navigate('Message Resident')
    }
    return(
        <View style={{flex:1,backgroundColor:'gainsboro',padding:10}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                disabled={!bookFlag}
                onPress={ImHereFunc}
                style={{margin:10, backgroundColor:'#22bb33', width: 100, height:30, justifyContent:'center', alignItems:'center', borderRadius:5}}>
                    <Text style={{color:'white'}}>Im Here</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                disabled={!bookFlag}
                onPress={MessageResident}
                style={{margin:10, backgroundColor:'#C81D35', height:30, justifyContent:'center', alignItems:'center', borderRadius:5}}>
                    <Text style={{color:'white'}}>Message Resident</Text>
                </TouchableOpacity>
            </View>
            <MapView
            style={style.map}
            region={{
                latitude:getLatitude(),
                longitude: getlongitude(),
                latitudeDelta:  0.0122,
                longitudeDelta: 0.0122,
              }}
            >
            {/* Start point */}
            {bookFlag && 
            <Marker 
                coordinate={{latitude: getLatitude(), longitude: getlongitude()}}
                title={getFullName()}  
                description={getAddress()}
                key={getUID()}
                flat={true}
            />}
            
            {/* Destination point */}
            {bookFlag && <Marker  
                coordinate={bookCoordinate}  
                title={"Destination"}  
                description={bookData['address']}
                key={bookData['user_id']}
                flat={true}
            />}

            {/* Driver's current location */}
            {bookFlag && <Marker
                            coordinate={{latitude: currentPosition['latitude'], longitude: currentPosition['longitude']}}  
                            title={"driver"}  
                            description={"official"}
                            key={'driver'}
                            flat={true}
            >
                <Image source={logo}  style={{width:24, height:24}}/>
            </Marker>}
            
            {/* Map Direction */}
            {bookFlag && <MapViewDirections
                origin={{latitude: bookData['latitude'], longitude: bookData['longitude']}}
                destination={{latitude: bookData['destination_latitude'], longitude: bookData['destination_longitude']}}
                apikey='AIzaSyDhsiDPQZMeiE9uGA4gRsGuGlpVP5cA_Ro'
                strokeWidth={5}
                strokeColor="green"
            />}
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