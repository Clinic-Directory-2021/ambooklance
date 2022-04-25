import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView} from 'react-native';
import { firebase } from "../../../../firebase/firebase-config";
import { getLatitude,getlongitude } from '../../../../LoginModels';
import { collection, query, where, onSnapshot, doc, updateDoc, setDoc } from "firebase/firestore";
const List = (props) =>{
  const action =async  () =>{
    const washingtonRef = doc(firebase, "Bookings", props.object.book_id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      status: 'on the way'
    });

    await setDoc(doc(firebase, "Officials", props.object.book_id), {
      status:'on the way',
      user_full_name: props.object.user_full_name,
      destination_longitude:props.object.user_longitude,
      destination_latitude:props.object.user_latitude,
      official_longitude:getlongitude(),
      official_latitude: getLatitude(),
      official_id:props.object.book_id,
      address:props.object.address,
    });
  }
  

  return(
    <View style={styles.List}>
      <View  style={styles.left}>
        <Text style={styles.data}>User Full Name: {props.object.user_full_name}</Text>
        <Text style={styles.data}>Accident Type: {props.object.accident_type}</Text>
        <Text style={styles.data}>Booking Date: {props.object.booking_date}</Text>
        <Text style={styles.data}>Address: {props.object.address}</Text>
      </View>
      <View  style={styles.right}>
        <TouchableOpacity style={styles.button} onPress={() => action()}>
          <Text style={{color:'#22bb33'}}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={{color:'#bb2124'}}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EmergencyList = ({navigation}) => {
  const [emergencyList, setTransferList] = useState([])
  useEffect(() => {
    const q = query(collection(firebase, "Bookings"), where("booking_type", "==", "Emergency"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
          list.push(doc.data());
      });
      setTransferList(list)
    });
  }, [])
    console.log(emergencyList)
    return (
      <ScrollView style={styles.container}>
        <View style={{alignItems:'center', margin:10}}>
          {emergencyList < 1?<Text style={{fontStyle:'italic'}}>No Pending Request</Text> : emergencyList.map((data, key) =>{
              return (<List object={data}/>)
          })}
        </View>
      </ScrollView>
    );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
  List:{
    padding:10,
    width:'95%',
    margin:5,
    backgroundColor: "white",
    borderRadius: 4,
    height: 150,
    shadowColor: "black",
    flexDirection:'row'
  },
  left: {
    width:'70%'
  },
  right:{
    width:'30%',
    marginTop:'auto',
    marginBottom:'auto'
  },
  button:{
    alignItems:'center',
    margin:5
  },
  data:{
    margin:2,
  }
})