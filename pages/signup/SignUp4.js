import React, { useState } from "react";
import { Text, Image, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity,ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const SignUp4 = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const getCurrentAge=(month,year)=>{
        var currentMonth = new Date().getMonth()
        var age = 0
        if(month <= currentMonth){
            age = new Date().getFullYear() - year + 1
        }
        else{
            age = new Date().getFullYear() - year
        }
  
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return age-1;//format: dd-mm-yyyy;
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
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

    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
        <TouchableOpacity style={{alignItems:'center', marginBottom: 30}}>
            <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/image_picker.png')} />
        </TouchableOpacity>
          <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,}}>Full Name</Text>  
          <TextInput
            style={styles.input}
            placeholder="Full name"
          />
          <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,}}>Birthdate</Text>  
          <View style={{flexDirection:'row', marginLeft:5, marginRight:5}}>
          <TextInput
            editable={false}
            keyboardType='numeric'
            placeholder="mm/dd/yyyy"
            value={date.getMonth() + 1 + "/" + date.getDay() + "/" + date.getFullYear()}
            style={{borderColor:'#ACB8C2',borderWidth:1, marginLeft:5, padding:10, borderTopLeftRadius:5,borderBottomLeftRadius:5, width:200,height: 40,marginBottom:12}}
          />
          <TouchableOpacity
            style={{  backgroundColor:'#C81D35', borderColor:'#C81D35',borderWidth:1, marginRight:5, padding:10, borderTopRightRadius:5,borderBottomRightRadius:5,height: 40, width:127}}
            onPress={showDatepicker}
          >
            <Text style={{color:'white', fontWeight:'bold'}}>Select a date</Text>
          </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            />
        )}
          <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,}}>Age</Text>  
          <TextInput
            style={styles.input}
            editable={false}
            value={getCurrentAge(date.getMonth(), date.getFullYear()).toString()}
            placeholder="Age"
          />
          {/* <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,}}>Address</Text> 
          <TextInput
            style={styles.input}
            placeholder="Address"
          />
          <Text style={{fontSize:12, textAlign:'center', marginBottom:20, color:'#656F77'}}>Note: This address will be used in case of emergency</Text> */}
          <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,}}>Valid ID</Text>
          <TouchableOpacity style={{alignItems:'center', marginBottom: 20, marginLeft: 12, marginRight: 12,width:327, 
          borderColor:'#ACB8C2', borderWidth:1, height:100, borderRadius:10, padding:5}}>
          <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/add.png')} />
            <Text style={{marginTop:10}}>Add a copy of your <Text style={{fontWeight:'bold'}}>valid ID</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity
                style={styles.buttonLogin}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Sign up</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    );
  }
  export default SignUp4;
  const styles = StyleSheet.create({
    // main design
    container: {
      margin:10
    },
    buttonRow: {
      marginTop:100,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    login: {
      borderColor:'#0B3954',
      borderWidth:2,
      backgroundColor:'white',
      padding:5,
      width:145,
      alignItems: 'center',
      borderRadius: 50,
      marginLeft:5,
      marginRight:5,
    },
    signUp: {
     backgroundColor:'#C81D35',
     padding:5,
     width:145,
     alignItems: 'center',
     borderRadius: 50,
     marginLeft:5,
     marginRight:5,
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
    },
    buttonLogin:{
      borderRadius:50,
      padding: 10,
      alignItems:'center',
      margin: 12,
      width: 327,
      height: 57,
      backgroundColor: '#0B3954',
    }
  });