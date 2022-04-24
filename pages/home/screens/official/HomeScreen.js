import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ImageBackground, ScrollView} from 'react-native';
// import { Avatar, Badge, Icon, withBadge } from "@rneui/base";


const HomeScreen = ({navigation}) =>{
    return(
    <ScrollView>
        <View style={styles.view}>
        <Text style={styles.headtext}>Take care</Text>
        <Text style={styles.headtext}>of your Health</Text>
        <View>
            <ImageBackground style={styles.carousel} source={require('../../../../assets/my_assets/image102.png')} >
                <Text  style={{color:'white', fontSize:23, marginLeft:40}}>
                    EMERGENCY BOOKING LIST
                </Text>
                <Text  style={{color:'white', fontSize:12,marginLeft:40}}>
                    click here to see emergency booking list
                </Text>
            </ImageBackground>
        <Text style={{fontSize:17, marginTop:20}}>How can we help you?</Text>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('Emergency List')} >
                <ImageBackground style={styles.item} source={require('../../../../assets/my_assets/item1.png')} >
                    <Text style={{fontSize:12,alignSelf:'center',color:'white', fontWeight:'bold'}}>
                        EMERGENCY BOOKING LIST
                    </Text>
                </ImageBackground>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Scheduled List')} >
                <ImageBackground style={styles.item} source={require('../../../../assets/my_assets/item2.png')} >
                    <Text style={{fontSize:12,alignSelf:'center',color:'white', fontWeight:'bold'}}>
                        SCHEDULED BOOKING LIST
                    </Text>
                    <Image source={require('../../../../assets/my_assets/image2.png')}/>
                </ImageBackground>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('Transfer List')} >
                <ImageBackground style={styles.item} source={require('../../../../assets/my_assets/item2.png')} >
                    <Text style={{fontSize:12,alignSelf:'center',color:'white', fontWeight:'bold'}}>
                        PATIENT TRANSFER BOOKING LIST
                    </Text>
                    <Image source={require('../../../../assets/my_assets/image3.png')}/>
                </ImageBackground>


            </TouchableOpacity>
             <TouchableOpacity>
                <ImageBackground style={styles.item} source={require('../../../../assets/my_assets/item2.png')} >
                    {/* <Text style={{fontSize:12,alignSelf:'center',color:'white', fontWeight:'bold'}}>
                        EMERGENCY HOTLINE IN THE AREA
                    </Text>
                    <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/image4.png')}/> */}
                </ImageBackground>
            </TouchableOpacity>
        </View>
        </View>
        </View>
    </ScrollView>
    )
}
 export default HomeScreen;

 const styles = StyleSheet.create({
  headtext: {
    fontSize:22,
  },
  view: {
    margin:20
  },
  carousel:{
    marginTop:20,
    alignSelf:'center',
    width:366,
    height:145,
    alignItems:"center",
    paddingTop:50,
  },
  row:{
      flexDirection:'row',
      flexWrap: "wrap",
      marginTop:20,
      marginStart:20
  },
  item:{
    width:152,
    height:119,
    padding:5,
    marginEnd:10,
  }
});