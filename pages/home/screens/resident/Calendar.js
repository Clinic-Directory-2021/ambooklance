import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { collection, query, where, onSnapshot  } from "firebase/firestore";
import {firebase} from '../../../../firebase/firebase-config'
import { getUID } from "../../../../LoginModels";
// import { Calendar } from 'react-native-calendario';


const CalendarTab = () =>{
    const [markedDates, setMarkedDates] = useState(null)
    useEffect(async () => {
        const q = query(collection(firebase, "Bookings"), where("booking_type", "==", "Scheduled"), where("uid", "==",  getUID()));
        const dateData = {}
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            dateData[doc.data().schedule_date] =  {selected: true, marked: true, selectedColor: '#C81D35'}
        });
        setMarkedDates(dateData)
        });
    },[])
    return(
        <View>
        {markedDates == null ? <Text>No Dates</Text>
        :
        <CalendarList
            markedDates={markedDates}
        />}
        </View>
    );
}
export default CalendarTab;
// {
//     '2022-05-16': {selected: true, marked: true, selectedColor: 'blue'},
//     '2022-05-17': {marked: true},
//     '2022-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
//     '2022-05-19': {disabled: true, disableTouchEvent: true}
// }