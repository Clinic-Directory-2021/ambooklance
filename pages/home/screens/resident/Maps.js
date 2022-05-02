import React, { useState, Component, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView} from 'react-native';
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';
import { getAddress, getFullName, getLatitude, getlongitude, getUserEmail, getUID} from "../../../../LoginModels";
import {firebase} from '../../../../firebase/firebase-config'
import { collection, query, getDocs, where, onSnapshot, doc } from "firebase/firestore";
import { setData, getData} from "../../../../MapModels";
import MapViewDirections from 'react-native-maps-directions';
import logo from '../../../../assets/my_assets/logo.png'
import * as Location from 'expo-location';

const Maps = ({navigation}) => {
    const [loc, setLoc] = useState([])
    const [books, setBooks] = useState([])
    const [flag, setFlag] = useState(false)
    const [bookFlag, setBookFlag] = useState(false)
    const [bookCoordinate, setBookCoordinate] = useState({latitude: getLatitude(), longitude: getlongitude()})
    const [driverCoordinate, setDriverCoordinate] = useState(null)
    const [bookData, setBookData] = useState()
    const [barangay, setBarangay] = useState([
        {address:'Balucuc, Apalit, Pampanga, Philippines', latitude: 14.9610287, longitude:120.8211796},
        {address:'Calantipe, Apalit, Pampanga, Philippines', latitude:14.9762235, longitude:120.8412807},
        {address:'Cansinala, Apalit, Pampanga, Philippines', latitude:14.9748427, longitude:120.7982029},
        {address:'Capalangan, Apalit, Pampanga, Philippines', latitude:14.9286414, longitude:120.7680395},
        {address:'Colgante, Apalit, Pampanga, Philippines', latitude:14.9396096, longitude:120.7378688},
        {address:'Paligui, Apalit, Pampanga, Philippines', latitude:14.9764281, longitude:120.7470372},
        {address:'Sampaloc, Apalit, Pampanga, Philippines', latitude:14.9644909, longitude:120.7578916},
        {address:'San Juan, Apalit, Pampanga, Philippines', latitude:14.9561454, longitude:120.766603},
        {address:'San Vicente, Apalit, Pampanga, Philippines', latitude:14.9483048, longitude:120.7493632},
        {address:'Sucad, Apalit, Pampanga, Philippines', latitude:14.970889, longitude:120.772349},
        {address:'Sulipan, Apalit, Pampanga, Philippines', latitude:14.9370552, longitude:120.7551101},
        {address:'Tabuyuc, Apalit, Pampanga, Philippines', latitude:14.9531183, longitude:120.7788494},
      ]);

    useEffect(async () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            // alert(location['coords']['latitude'] + ' ' + location['coords']['longitude']);
          })();

        // if(flag == false){
        // const q = query(collection(firebase, "Users"));
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     setData(doc.data())
        // })
        // setFlag(true)
        // setLoc(getData())
        // }

        const q = query(collection(firebase, "Officials"), where("user_id", "==", getUID()));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            var temp = {}
            var temp2 = {}
            querySnapshot.forEach((doc) => {
                if(doc.data()['status'] == 'on the way'){
                    temp.latitude = doc.data()['current_latitude']
                    temp.longitude =  doc.data()['current_longitude']
                    setBookCoordinate({latitude: doc.data()['latitude'], longitude: doc.data()['longitude']})
                    setDriverCoordinate({latitude: doc.data()['current_latitude'], longitude: doc.data()['current_longitude']})
                    setBookFlag(true)
                }
            });
            setDriverCoordinate(temp)
          });

        //   const y = query(collection(firebase, "Officials"));
        //   const unsubscribe3 = onSnapshot(y, (querySnapshot) => {
        //       var temp = {}
        //   querySnapshot.forEach((doc) => {
        //     temp = {longitude:doc.data().official_longitude, latitude:doc.data().official_latitude}
        //       setBookData(doc.data())
        //       if(doc.data()['status'] == 'on the way'){
        //         setBookFlag(true)
        //     }
        //     else{
        //         setBookFlag(false)
        //     }
        //   });

        //   setBookCoordinate(temp)
        // });

        //  const z = query(collection(firebase, "Bookings"), where("uid", "==", getUID()));  
        // const unsubscribe2 = onSnapshot(z, (querySnapshot) => {
        //     const cities = [];
        //     setBooks([])
        //     querySnapshot.forEach((doc) => {
        //         if(doc.data()['status'] == 'on the way' || doc.data()['status'] == 'pending' ){
        //             cities.push(doc.data());
        //         }
        //     });
        //     setBooks(cities)
        //   });
      },[]);
      console.log(driverCoordinate)
    return(<View style={{flex:1,backgroundColor:'gainsboro',padding:10}}>
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
                key={getUID()}
                flat={true}
            />
            
            {driverCoordinate != null ? 
                <Marker
                    coordinate={{latitude: parseFloat(driverCoordinate['latitude']), longitude: parseFloat(driverCoordinate['longitude']) }}  
                    title={"driver"}  
                    description={"official"}
                    key={'driver'}
                    flat={true}
                >
                <Image source={logo}  style={{width:24, height:24}}/>
                </Marker>
            :
                <></>
            }

            {barangay.map((data,key) =>{
                    return(
                        <Marker
                            coordinate={{ latitude:data['latitude'], longitude: data['longitude'] }}  
                            title={data['address']}  
                            description={data['address']}
                            key={key} 
                            flat={true}
                        >
                        </Marker>
                    )
            })}

            {bookFlag && 
            <MapViewDirections
                origin={{latitude: parseFloat(bookCoordinate['latitude']), longitude: parseFloat(bookCoordinate['longitude'])}}
                destination={{latitude: getLatitude(), longitude: getlongitude()}}
                apikey='AIzaSyDhsiDPQZMeiE9uGA4gRsGuGlpVP5cA_Ro'
                strokeWidth={5}
                strokeColor="green"
            />}
        </MapView>
    </View>)
}
 export default Maps;

 const style = StyleSheet.create({
     map:{
         height:'100%'
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