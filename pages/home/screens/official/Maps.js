import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView} from 'react-native';
import MapView from 'react-native-maps';  
import { getAddress, getFullName, getLatitude, getlongitude, getUserEmail, getUID} from "../../../../LoginModels";
import { Marker } from 'react-native-maps';
import logo from '../../../../assets/my_assets/logo.png'
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { firebase } from "../../../../firebase/firebase-config";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
const Maps = () =>{
    const [bookFlag, setBookFlag] = useState(false)
    const [display, setDisplay] = useState('block')
    const [bookCoordinate, setBookCoordinate] = useState({latitude: getLatitude(), longitude: getlongitude()})
    const [currentPosition,setCurrentPosition] = useState({latitude: getLatitude(), longitude: getlongitude()})
    const [bookData, setBookData] = useState()

    const ImHereFunc = async () =>{
        const bookings = doc(firebase, "Bookings", bookData['official_id']);
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
    useEffect(() => {
        const q = query(collection(firebase, "Officials"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
              setBookCoordinate({longitude:doc.data().destination_longitude, latitude:doc.data().destination_latitude})
              setBookData(doc.data())
              if(doc.data()['status'] == 'on the way'){
                setBookFlag(true)
                setDisplay('block')
            }
            else{
                setBookFlag(false)
                setDisplay('none')
            }
          });
          
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
    console.log(bookCoordinate)
    console.log(bookData)
    return(
        <View style={{flex:1,backgroundColor:'gainsboro',padding:10}}>
            <View>
                <TouchableOpacity 
                disabled={!bookFlag}
                onPress={ImHereFunc}
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
            
            {bookFlag && <Marker  
                coordinate={bookCoordinate}  
                title={bookData['user_full_name']}  
                description={bookData['address']}
                key={getUID()}
                flat={true}
            />}
            {bookFlag && <Marker
                            coordinate={currentPosition}  
                            title={"driver"}  
                            description={"official"}
                            flat={true}
            >
                <Image source={logo}  style={{width:24, height:24}}/>
            </Marker>}
            {bookFlag && <MapViewDirections
                origin={{latitude: getLatitude(), longitude: getlongitude()}}
                destination={bookCoordinate}
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