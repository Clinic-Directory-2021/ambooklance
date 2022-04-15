import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";
import {View} from 'react-native';
import Tabs from "./OfficialTabs";
const Stack = createNativeStackNavigator();

const HomePage = () => {
  return (
    <Tabs />
  );
};

export default HomePage;

// const styles = StyleSheet.create({
//   // modal design
//   button: {
//     marginRight:20,
//   },
//   view: {
//     flexDirection:'row',
//   }
// });
