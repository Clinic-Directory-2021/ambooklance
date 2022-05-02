import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView, TextInput} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox"; 
import { setAccidentType, setInvolvePerson } from "../../../../BookingModel";

const AccidentPage = ({navigation}) =>{
    const [vehicle, vehicleCheck] = useState(false);
    const [home, homeCheck] = useState(false);
    const [disaster, disasterCheck] = useState(false);
    const [others, othersCheck] = useState(false);
    const [othersValue, setOthersValue] = useState('')
    const [involve, setInvolve] =  useState()

    const chooseCheck = () =>{
    if(vehicle){
        setAccidentType('Vehicular accident')
        setInvolvePerson(involve)
        navigation.navigate('Address')
    }
    else if(home){
        setAccidentType('Home accident')
        setInvolvePerson(involve)
        navigation.navigate('Address')
    }
    else if(disaster){
        setAccidentType('Disaster accident')
        setInvolvePerson(involve)
        navigation.navigate('Address')
    }
    else{
        setAccidentType(othersValue)
        setInvolvePerson(involve)
        navigation.navigate('Address')
    }

    }
    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={styles.container}>
                <Image source={require('../../../../assets/my_assets/alert.png')} style={{marginTop:50}}/>
            </View>
            <Text style={styles.label}>ACCIDENT</Text>
            <View style={{}}>
            <Text style={{margin:10,fontSize:14, color:'black'}}>Number of person involve?</Text>
            <TextInput
                style={styles.input}
                placeholder="Please Specify"
                keyboardType="numeric"
                // editable={others?true : false}
                value={involve}
                onChangeText={text=>setInvolve(text)}
            />
            </View>
            <View style={styles.checkboxContainer}>
            <Text style={{margin:10,fontSize:14, color:'black'}}>What kind of accident happened?</Text>
            <BouncyCheckbox
                size={25}
                fillColor="red"
                text="Vehicular accident"
                style={{margin:10}}
                iconStyle={{ borderColor: "red" }}
                textStyle={{textDecorationLine:'none', fontSize:22}}
                onPress={() => {
                    vehicleCheck(!vehicle)
                }}
            />
            <BouncyCheckbox
                size={25}
                fillColor="red"
                style={{margin:10}}
                text="Home accident"
                iconStyle={{ borderColor: "red" }}
                textStyle={{textDecorationLine:'none', fontSize:22}}
                onPress={() => {
                    homeCheck(!home)
                    
                }}
            />
            <BouncyCheckbox
                size={25}
                fillColor="red"
                style={{margin:10}}
                text="Disaster accident"
                iconStyle={{ borderColor: "red" }}
                textStyle={{textDecorationLine:'none', fontSize:22}}
                onPress={() => {
                    disasterCheck(!disaster)
                }}
            />
            <View style={{flexDirection:'row'}}>
                <BouncyCheckbox
                    size={25}
                    fillColor="red"
                    text="Others"
                    style={{margin:10}}
                    iconStyle={{ borderColor: "red" }}
                    textStyle={{textDecorationLine:'none', fontSize:22}}
                    onPress={() => {
                        othersCheck(!others)
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Please Specify"
                    editable={others?true : false}
                    value={others?othersValue : 'N/A'}
                    onChangeText={text=>setOthersValue(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  chooseCheck()
                }
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Next</Text>
          </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
export default AccidentPage;

const styles = StyleSheet.create({
    // main design
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin:10
    },
    checkboxContainer: {
        marginBottom: 20,
        marginTop:20
    },
    label: {
        margin: 8,
        fontSize:22,
        fontWeight:'bold',
        alignSelf:'center'
      },
    input: {
        borderRadius:5,
        borderColor:'#ACB8C2',
        height: 40,
        width:200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
})