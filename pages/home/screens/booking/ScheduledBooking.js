import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from "../../../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore"; 
import { getUID, getFullName, getAddress, getLatitude, getlongitude } from "../../../../LoginModels";
import { setMapFlag } from "../../../../MapModels";

const ScheduledBooking = ({navigation}) =>{
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [dateVal, setDateVal] = useState('')
  const [timeVal, setTimeVal] = useState('')

  const SetData = async () =>{
    let today = new Date()
    let ISOyear = today.getFullYear() + "/" + (today.getMonth() + 1)  + "/" + today.getDate();
    var document_id = Date.parse(today);

    await setDoc(doc(firebase, "Bookings", document_id.toString()),{
      uid:getUID(),
      user_full_name:getFullName(),
      booking_date: ISOyear,
      schedule_date: dateVal,
      schedule_time:timeVal,
      address: getAddress(),
      user_latitude: getLatitude(),
      user_longitude: getlongitude(),
      booking_type: 'Scheduled'
      })
     .then(()=>{
      navigation.navigate('Done')
      setMapFlag(false)
    });
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    if(currentDate)
    {
      if(mode == 'date'){
        setDateVal(currentDate)
        setDate(currentDate);
        setDateVal(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear())
      }
      else{
        if(currentDate.getHours() <= 12){
          setTimeVal(currentDate.getHours() + ':' + currentDate.getMinutes() + ' ' + 'AM')
        }
        else{
          setTimeVal((currentDate.getHours() - 12) + ':' + currentDate.getMinutes() + ' ' + 'PM')
        }
        setDate(currentDate); 
      }
    }
    
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };
    return(
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.container}>
            <Image source={require('../../../../assets/my_assets/calendar_image.png')} style={{marginTop:50}}/>
        </View>
        <Text style={styles.label}>Schedule an Ambulance</Text>
        <View style={{margin:20}}>

        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Date</Text>  
        <View style={{flexDirection:'row', marginLeft:5, marginRight:5}}>
          <TextInput
            editable={false}
            keyboardType='numeric'
            placeholder="mm/dd/yyyy"
            value={dateVal.toString()}
            style={{borderColor:'#ACB8C2',borderWidth:1, marginLeft:5, padding:10, borderTopLeftRadius:5,borderBottomLeftRadius:5, width:200,height: 40,marginBottom:12}}
          />
          <TouchableOpacity
            style={{  backgroundColor:'#C81D35', borderColor:'#C81D35',borderWidth:1, marginRight:5, padding:10, borderTopRightRadius:5,borderBottomRightRadius:5,height: 40, width:127}}
            onPress={showDatepicker}
          >
            <Text style={{color:'white', fontWeight:'bold'}}>Select a date</Text>
          </TouchableOpacity>
        </View>

        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Time</Text> 
        <View style={{flexDirection:'row', marginLeft:5, marginRight:5}}>
          <TextInput
            editable={false}
            placeholder="Hour:Minute:Second"
            value={timeVal}
            style={{borderColor:'#ACB8C2',borderWidth:1, marginLeft:5, padding:10, borderTopLeftRadius:5,borderBottomLeftRadius:5, width:200,height: 40,marginBottom:12}}
          />
          <TouchableOpacity
            style={{  backgroundColor:'#C81D35', borderColor:'#C81D35',borderWidth:1, marginRight:5, padding:10, borderTopRightRadius:5,borderBottomRightRadius:5,height: 40, width:127}}
            onPress={showTimepicker}
          >
            <Text style={{color:'white', fontWeight:'bold'}}>Select time</Text>
          </TouchableOpacity>
        </View>
        {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            onChange={onChange}
            />
        )}
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() =>
              SetData()
            }
        >
        <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Book</Text>
      </TouchableOpacity>
    </ScrollView>
    )
}

export default ScheduledBooking;

const styles = StyleSheet.create({
    // main design
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin:10
    },
    label: {
        margin: 8,
        marginBottom:50,
        fontSize:22,
        fontWeight:'bold',
        alignSelf:'center',
        textAlign:'justify'
      },
    addressLabel: {
        margin: 8,
        fontSize:18,
        alignSelf:'center',
        textDecorationLine:'underline',
        marginTop:50
      },
      button:{
        borderRadius:50,
        padding: 10,
        alignItems:'center',
        margin: 12,
        width: 327,
        height: 57,
        marginTop:50,
        alignSelf:'center',
        backgroundColor: '#0B3954',
      },
      input: {
        borderRadius:5,
        borderColor:'#ACB8C2',
        height: 40,
        width:327,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        alignSelf:'center'
      },
})