import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView} from 'react-native';
import { firebase } from "../../../../firebase/firebase-config";
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
        <Text style={styles.data}>Booking Date: {props.object.booking_date}</Text>
        <Text style={styles.data}>Scheduled Date: {props.object.schedule_date}</Text>
        <Text style={styles.data}>Scheduled Time: {props.object.schedule_time}</Text>
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

export default ScheduleList = ({navigation}) => {
  const [transferList, setTransferList] = useState([])
  useEffect(() => {
    const q = query(collection(firebase, "Bookings"), where("booking_type", "==", "Scheduled"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
          list.push(doc.data());
      });
      setTransferList(list)
    });
  }, [])
    console.log(transferList)
    return (
      <ScrollView style={styles.container}>
        <View style={{alignItems:'center'}}>
          {transferList.length < 1 ? <Text style={{fontStyle:'italic'}}>No Request Pending</Text> : transferList.map((data, key) =>{
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