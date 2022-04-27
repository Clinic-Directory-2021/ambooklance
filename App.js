import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp1 from './pages/signup/SignUp1';
import SignUp2 from './pages/signup/SignUp2';
import SignUp3 from './pages/signup/SignUp3';
import SignUp4 from './pages/signup/SignUp4';
import HomePage from './pages/home/HomePage';
import OfficialHomePage from './pages/home/OfficialHomePage';
import Settings from './pages/home/Settings';
import EmergencyBooking from "./pages/home/screens/booking/EmergencyBooking";
import Address from "./pages/home/screens/booking/Address";
import Done from "./pages/home/screens/booking/Done";
import PatientTransferBooking from "./pages/home/screens/booking/PatientTransferBooking";
import ScheduledBooking from "./pages/home/screens/booking/ScheduledBooking";
import {getFullName, getImageUrl} from './LoginModels'
import SignUp2_2 from "./pages/signup/SignUp2_2";
import ChangeEmail from "./pages/home/settings/ChangeEmail";
import ChangePassword from "./pages/home/settings/ChangePassword";
import AddAddress from "./pages/home/settings/AddAddress";
import SignUp4_4 from "./pages/signup/SignUp4_4";
import TransferList from "./pages/home/screens/list/TransferList";
import EmergencyList from "./pages/home/screens/list/EmergencyList";
import ScheduleList from "./pages/home/screens/list/ScheduleList";
import 'react-native-gesture-handler'
import ForgotPassword from "./pages/home/ForgotPassword";
import MessageResident from "./pages/home/screens/official/MessageResident";
import MessageOfficial from "./pages/home/screens/resident/MessageOfficial";

//FIREBASE Imports

const Stack = createNativeStackNavigator();
const MyStack = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false, title:'Home',}}
          name="Home"
          component={Home}
        />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Login" component={Login} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Sign up 1/2" component={SignUp1} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Sign up 2/3" component={SignUp2} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Sign up 3/3" component={SignUp2_2} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Sign up official 1/2" component={SignUp3} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Sign up official 2/3" component={SignUp4} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Sign up official 3/3" component={SignUp4_4} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Change Email" component={ChangeEmail} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Change Password" component={ChangePassword} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Add Address" component={AddAddress} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Transfer List" component={TransferList} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Emergency List" component={EmergencyList} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Scheduled List" component={ScheduleList} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Message Resident" component={MessageResident} />
        <Stack.Screen options={{headerBackTitle:'Back', headerTitleAlign:'center'}} name="Message Official" component={MessageOfficial} />
        <Stack.Screen 
          options={({route, navigation}) => ({
          headerTitleAlign:'center',
          headerLeft: ()=>(
            <View style={styles.view}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Settings') }
              >
                <Image source={require('./assets/my_assets/settings.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => alert('This Feature is not available right now.') }
              >
                <Image source={require('./assets/my_assets/chat.png')} />
            </TouchableOpacity>
            </View>
          ),
          headerRight: ()=>(
            <Image source={{uri:getImageUrl()}} style={{width:32, height:32, borderRadius:100}} />
          )
        })} 
          name="Home Page" 
          component={HomePage} 
          />
          <Stack.Screen 
          options={({route, navigation}) => ({
          headerTitleAlign:'center',
          headerLeft: ()=>(
            <View style={styles.view}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Settings') }
              >
                <Image source={require('./assets/my_assets/settings.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
              >
                <Image source={require('./assets/my_assets/chat.png')} />
            </TouchableOpacity>
            </View>
          ),
          headerRight: ()=>(
            <Image source={{uri:getImageUrl()}} style={{width:32, height:32}} />
          )
        })} 
          name="Official Home Page" 
          component={OfficialHomePage} 
          />
        <Stack.Screen 
        options={{
          headerBackTitle:'Back', 
          headerTitleAlign:'center', 
          headerStyle:{backgroundColor:'#C81D35'},
          headerTintColor:'white',
          headerShadowVisible:false}} 
        name="Settings" component={Settings} 
        />
        <Stack.Screen 
        options={{
          headerBackTitle:'Back', 
          headerTitleAlign:'center', 
          headerStyle:{backgroundColor:'#C81D35'},
          headerTintColor:'white',
          headerShadowVisible:false}} 
        name="Emergency Booking" component={EmergencyBooking} 
        />
        <Stack.Screen 
        options={{
          headerBackTitle:'Back', 
          headerTitleAlign:'center', 
          headerStyle:{backgroundColor:'#C81D35'},
          headerTintColor:'white',
          headerShadowVisible:false}} 
        name="Address" component={Address} 
        />
        <Stack.Screen 
        options={{
          headerBackTitle:'Back', 
          headerTitleAlign:'center', 
          headerStyle:{backgroundColor:'#C81D35'},
          headerTintColor:'white',
          headerShadowVisible:false,
          headerShown: false}} 
        name="Done" component={Done} 
        />
        <Stack.Screen 
        options={{
          headerBackTitle:'Back', 
          headerTitleAlign:'center', 
          headerStyle:{backgroundColor:'#C81D35'},
          headerTintColor:'white',
          headerShadowVisible:false}} 
        name="Patient Transfer Booking" component={PatientTransferBooking} 
        />
        <Stack.Screen 
        options={{
          headerBackTitle:'Back', 
          headerTitleAlign:'center', 
          headerStyle:{backgroundColor:'#C81D35'},
          headerTintColor:'white',
          headerShadowVisible:false}} 
        name="Scheduled Booking" component={ScheduledBooking} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack

const styles = StyleSheet.create({
  // modal design
  button: {
    marginRight:20,
  },
  view: {
    flexDirection:'row',
  }
});
