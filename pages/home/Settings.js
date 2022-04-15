import * as React from 'react';
import { Text, ImageBackground, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import {getFullName, getImageUrl} from '../../LoginModels'
import {auth} from '../../firebase/firebase-config'
import { getAuth, signOut } from "firebase/auth";
const Settings= ({navigation}) => {
  const SignOut= () => {
    signOut(auth).then(() => {
      console.log('logged out')
      navigation.navigate('Home')
    }).catch((error) => {
      console.log(error)
    });
  }
    return (
      <ScrollView>
      <ImageBackground style={styles.container} source={require('E:/mobile_application/ambooklance/assets/my_assets/background.png')}>
        <View style={styles.view}>
          <View style={{flexDirection:'row', padding:10,height:90, borderBottomWidth:1, borderBottomColor:'#CACACA', alignItems: 'center',justifyContent: 'center',marginBottom:50}}>
            <Image source={{uri:getImageUrl()}} style={{marginEnd:10, width:64, height:64, borderRadius:100}}></Image>
            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:18}}>{getFullName()}</Text>
          </View>
          <View style={{flexDirection:'row', padding:10}}>
            <Text style={{textAlign: 'left', fontSize:17}}>Change Email Address</Text>
            <TouchableOpacity style={{marginLeft:'auto', padding:10, borderRadius:50}} onPress={()=> navigation.navigate('Change Email')}>
                <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/right_arrow.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', padding:10}}>
            <Text style={{textAlign: 'left', fontSize:17}}>Change Password</Text>
            <TouchableOpacity style={{marginLeft:'auto', padding:10, borderRadius:50}} onPress={()=> navigation.navigate('Change Password')}>
                <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/right_arrow.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', padding:10,borderBottomWidth:1, borderBottomColor:'#CACACA'}}>
            <Text style={{textAlign: 'left', fontSize:17}}>Add Address</Text>
            <TouchableOpacity style={{marginLeft:'auto', padding:5, borderRadius:50}} onPress={()=> navigation.navigate('Add Address')}>
                <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/settings_add.png')}/>
            </TouchableOpacity>
          </View>
          <Text style={{textAlign: 'left', fontSize:17, color:'#ADADAD', margin:10}}>More</Text>
          <View style={{flexDirection:'row', padding:10}}>
            <Text style={{textAlign: 'left', fontSize:17}}>About us</Text>
            <TouchableOpacity style={{marginLeft:'auto', padding:10, borderRadius:50}}>
                <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/right_arrow.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', padding:10}}>
            <Text style={{textAlign: 'left', fontSize:17}}>Privacy policy</Text>
            <TouchableOpacity style={{marginLeft:'auto', padding:10, borderRadius:50}}>
                <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/right_arrow.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', padding:10}}>
            <Text style={{textAlign: 'left', fontSize:17}}>Terms and conditions</Text>
            <TouchableOpacity style={{marginLeft:'auto', padding:10, borderRadius:50}}>
                <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/right_arrow.png')}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
                style={styles.buttonLogin}
                onPress={SignOut}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:14,justifyContent:'center'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      </ScrollView>
    );
  }
  export default Settings;
  const styles = StyleSheet.create({
    // main design
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view:{
      backgroundColor:'white',
      borderRadius:10,
      elevation:5,
      width:'90%',
      marginTop:100,
      marginBottom:100
    },
    buttonLogin:{
      borderRadius:50,
      paddingTop:3,
      alignItems:'center',
      margin: 12,
      width: 221,
      height: 28,
      backgroundColor: '#0B3954',
      alignSelf:'center'
    },
  });