import React, { useState, useEffect } from "react";
import { Text, Image, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {storage} from '../../firebase/firebase-config';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setAge, setFullName, setBirthdate, setImageUrl,} from '../../Models'
import * as ImagePicker from "expo-image-picker"

const SignUp4 = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [full_name, set_full_name] = useState('Kenneth')
    const [indicatorFlag, setIndicatorFlag] = useState(false)
    const [image, setImage] = useState('data:image/png;base64,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');

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const chooseCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    const chooseFromGalery = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    const SetData = async ()=>{
        var current_birthdate = date.getMonth() + 1 + "/" + date.getDay() + "/" + date.getFullYear()
        var current_age = getCurrentAge(date.getMonth(), date.getFullYear()).toString()
        const imageRef = ref(storage, `files101/` + full_name + '/' + 'profile')
        const img = await fetch(image)
        const bytes = await img.blob()
        uploadBytes(imageRef, bytes).then((snapshot) => {
          console.log('Uploaded a blob or file! ' + snapshot.ref);
          getDownloadURL(snapshot.ref).then(url => setImageUrl(url))
        });
        setBirthdate(current_birthdate)
        setFullName(full_name)
        setAge(current_age)
        navigation.navigate('Sign up 3/3')
    }

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
        {image && <Image source={{ uri: image }} style={{ width: 150, height: 150,alignSelf:'center', marginBottom: 30, borderRadius:100}} />}
        </TouchableOpacity>
        <View style={{marginBottom:30}}>
        <TouchableOpacity
        style={{marginBottom:5, alignSelf:'center', padding:10, backgroundColor:'#C81D35', borderRadius:5, width:150, alignItems:'center'}}
        onPress={chooseCamera}
        >
            <Text style={{color:'white'}}>Use Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{alignSelf:'center', padding:10, backgroundColor:'#0B3954', borderRadius:5,width:150, alignItems:'center'}}
        onPress={chooseFromGalery}
        >
            <Text style={{color:'white'}}>Pick from Galery</Text>
        </TouchableOpacity>
        </View>

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
            value={date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()}
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
          <Image source={require('../../assets/my_assets/add.png')} />
            <Text style={{marginTop:10}}>Add a copy of your <Text style={{fontWeight:'bold'}}>valid ID</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity
                style={styles.buttonLogin}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Next</Text>
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