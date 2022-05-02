import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Image, TouchableOpacity,Text, Modal} from 'react-native';
import HomeScreen from './screens/official/HomeScreen';
import Maps from './screens/official/Maps';
import Calendar from './screens/official/Calendar';
import Profile from './screens/official/Profile';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle: { 
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
            <Image source={require('../../assets/my_assets/home.png')} style={{
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
            <Image source={require('../../assets/my_assets/map.png')} style={{
                tintColor: focused? '#C81D35' : '#909FAA'
            }}/>
        ),
        // headerStyle:{
        //   backgroundColor:'#D35D5D'
        // }
        // tabBarBadge: 3,
      }}/>
      {/* <Tab.Screen name="Calendar" component={Calendar} 
      options={{
        headerShown:false,
        tabBarIcon: ({ focused }) => (
            <Image source={require('../../assets/my_assets/calendar.png')} style={{
                tintColor: focused? '#C81D35' : '#909FAA'
            }}/>
        ),
        // tabBarBadge: 3,
      }}/> */}
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        headerShown:false,
        tabBarIcon: ({ focused }) => (
            <Image source={require('../../assets/my_assets/person.png')} style={{
                tintColor: focused? '#C81D35' : '#909FAA'
            }}/>
        ),
        // tabBarBadge: 3,
      }}/>
    </Tab.Navigator>
  );
}

export default MyTabs