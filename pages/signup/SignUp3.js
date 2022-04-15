import React , {useState } from 'react';
import { Text, Image, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { setEmail, setPhoneNumber, setPassword } from '../../Models'

const SignUp3 = ({navigation}) => {
  const [phone_number, set_phone_number] = useState('')
  const [email, set_email] = useState('')
  const [password, set_password] = useState('')
  const [indicatorFlag, setIndicatorFlag] = useState(false)
  const SetData = async ()=>{
    setIndicatorFlag(true)
    if(phone_number == '' || email == '' || password == ''){
      alert('All fields are required.')
      setIndicatorFlag(false)
    }
    else{
      if(email.includes('@') && email.includes('.com')){
        if(password.length < 8){
          alert('Password should atleast 8 characters.')
          setIndicatorFlag(false)
        }
        else{
          if(phone_number.length == 10){
            setPhoneNumber(phone_number)
            setEmail(email)
            setPassword(password)
            setIndicatorFlag(false)
            navigation.navigate('Sign up official 2/3')
          }
          else{
            alert('Invalid phone number format')
            setIndicatorFlag(false)
          }
        }
      }
      else{
        alert('Invalid Email Format')
        setIndicatorFlag(false)
      }
    }
    
  }
    return (
      <View style={styles.container}>
        <Image style={{marginBottom:10}} source={require('E:/mobile_application/ambooklance/assets/my_assets/logo.png')} />
        <Text style={{color:'#C81D35', fontSize:27, fontWeight:'bold',marginBottom:10}}>Hello</Text>
        <Text style={{color:'black', fontSize:15, fontWeight:'bold',marginBottom:20}}>Sign Up to create your account</Text>
        <SafeAreaView>
        <View style={{flexDirection:'row', marginLeft:5, marginRight:5}}>
          <TextInput
            editable = {false}
            value='+63'
            style={{borderColor:'#ACB8C2',borderWidth:1, marginLeft:5, padding:10, borderTopLeftRadius:5,borderBottomLeftRadius:5,height: 40}}
          />
          <TextInput
            keyboardType='numeric'
            placeholder="Phone Number"
            style={{borderColor:'#ACB8C2',borderWidth:1, marginRight:5, padding:10, borderTopRightRadius:5,borderBottomRightRadius:5, width:282,height: 40}}
            value={phone_number}
            onChangeText={text=>set_phone_number(text)}
          />
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text=>set_email(text)}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text=>set_password(text)}
          />
          <TouchableOpacity
                style={styles.buttonLogin}
                onPress={SetData}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>NEXT</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <ActivityIndicator size="large" color="#0B3954" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} animating={indicatorFlag}/>
      </View>
    );
  }
  export default SignUp3;
  const styles = StyleSheet.create({
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
    input: {
      borderRadius:5,
      borderColor:'#ACB8C2',
      height: 40,
      width:327,
      margin: 12,
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