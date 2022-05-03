import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity,Text, Modal} from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { setuserType } from "../Models";

export default function Home({navigation}) {

    // const createChannels = () =>{
    //   PushNotification.createChannel({
    //     channelId: "test-channel",
    //     channelName: "Test Channel"
    //   })
    // }
    const [modalVisible, setModalVisible] = useState(false);
    const getUserType = async (userType) =>{
      setModalVisible(!modalVisible)
      if(userType == "resident"){
        navigation.navigate('Sign up 1/2')
        setuserType('resident')
      }
      else{
        navigation.navigate('Sign up official 1/2')
        setuserType('official')
      }
      
    }
    useEffect(() => {
      // createChannels()
    }, [])
    
    return (
      <View style={styles.container}>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{marginBottom:20}}>Choose Type of User</Text>
              <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.buttonOfficial}
                onPress={() =>{ getUserType('official') }}
              >
                <Text style={{color:'white', fontWeight:'bold'}}>Official</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonResident}
                onPress={() =>{ getUserType('resident') }}
              >
                <Text style={{color:'white',fontWeight:'bold'}}>Resident</Text>
              </TouchableOpacity>
              </View>
  
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Image source={require('../assets/my_assets/close.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
  
        <Image style={{marginBottom:50}} source={require('../assets/my_assets/logo.png')} />
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Image source={require('../assets/my_assets/left.png')} style={{marginTop:20, marginRight:30}} />
          <Text style={{fontWeight:'bold', fontSize:33, color:'#0B3954'}}>amBOOKlance</Text>
          <Image source={require('../assets/my_assets/right.png')} style={{marginTop:20,marginLeft:30}} />
        </View>
        <Text style={{fontWeight:'bold', fontSize:23, marginTop:10, letterSpacing: 5}}>The ride of your life</Text>
        <View style={styles.buttonRow}>
          {/* button Sign up */}
          <TouchableOpacity
            style={styles.signUp}
            onPress={() => {
              // getUserType('resident')
              // PushNotification.localNotification(details, object)
            }}
          >
            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Sign up</Text>
          </TouchableOpacity>
  
          {/* button Login */}
          <TouchableOpacity
            style={styles.login}
            onPress={() =>
              navigation.navigate('Login')
            }
          >
            <Text style={{color:'#0B3954', fontWeight:'bold', fontSize:20}}>Login</Text>
          </TouchableOpacity>
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    // modal design
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    buttonOfficial: {
      backgroundColor:'#C81D35',
      marginLeft:5,
      marginRight:5,
      padding: 10,
      elevation: 2
    },
    buttonResident: {
      backgroundColor:'#C81D35',
      marginLeft:5,
      marginRight:5,
      padding: 10,
      elevation: 2
    },
    button: {
      marginTop:20,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonView:{
      flexDirection:'row',
    },
  
    // main design
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    subTextLogo: {
      marginTop:20,
    },
  });