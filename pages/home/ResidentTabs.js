import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Image, TouchableOpacity,Text, Modal} from 'react-native';
import HomeScreen from './screens/resident/HomeScreen';
import Maps from './screens/resident/Maps';
import Contact from './screens/resident/Contact';
import Profile from './screens/resident/Profile';
import {getImageUrl} from '../../LoginModels'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle: { 
            backgroundColor:'#F2F2F2',
            height:100,
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            elevation:5,
         },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
      options={{
        headerShown:false,
        tabBarIcon: ({ focused }) => (
            <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/home.png')} style={{
                tintColor: focused? '#C81D35' : '#909FAA',
            }}/>
        ),
        // tabBarBadge: 3,
      }} 
      />
      <Tab.Screen name="Maps" component={Maps} 
      options={{
        headerShown:false,
        tabBarIcon: ({ focused }) => (
            <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/map.png')} style={{
                tintColor: focused? '#C81D35' : '#909FAA'
            }}/>
        ),
        // headerStyle:{
        //   backgroundColor:'#D35D5D'
        // }
        // tabBarBadge: 3,
      }}/>
      <Tab.Screen name="Contact" component={Contact} 
      options={{
        headerShown:false,
        tabBarIcon: ({ focused }) => (
            <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/contact.png')} style={{
                tintColor: focused? '#C81D35' : '#909FAA'
            }}/>
        ),
        // tabBarBadge: 3,
      }}/>
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        headerShown:false,
        tabBarIcon: ({ focused }) => (
            <Image source={require('E:/mobile_application/ambooklance/assets/my_assets/person.png')} style={{
                tintColor: focused? '#C81D35' : '#909FAA'
            }}/>
        ),
        // tabBarBadge: 3,
      }}/>
    </Tab.Navigator>
  );
}

export default MyTabs