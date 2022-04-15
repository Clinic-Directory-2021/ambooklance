import React, {useState} from 'react';
import { Text, Image, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity,  ActivityIndicator } from 'react-native';
import {auth, firebase} from '../firebase/firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setFullName, setPhoneNumber, setBirthdate, setAge, setAddress, setUserEmail, setUID, setImageUrl, setLatitude, setlongitude, getUserEmail, setUserPass } from '../LoginModels';
const Login = ({navigation}) => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [indicatorFlag, setIndicatorFlag] = useState(false)

    const loginFunction = async () =>{
      setIndicatorFlag(true)
      if(email == '' || password == ''){
        alert('All fields are required')
        setIndicatorFlag(false)
      }
      else{
        try{
          await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            setIndicatorFlag(true)
            const user = userCredential.user;
            getDoc(doc(firebase, "Users", user.uid)).then(docSnap => {
              if (docSnap.exists()) {
                setPhoneNumber(docSnap.data()['phone_number'])
                setUserEmail(docSnap.data()['email'])
                setUserPass(password)
                setFullName(docSnap.data()['full_name'])
                setBirthdate(docSnap.data()['birthdate'])
                setAge(docSnap.data()['age'])
                setAddress(docSnap.data()['address'])
                setUID(user.uid)
                setImageUrl(docSnap.data()['image_url'])
                setLatitude(docSnap.data()['latitude'])
                setlongitude(docSnap.data()['longitude'])
                console.log(docSnap.data()['email'] + " " + getUserEmail())
                if(docSnap.data()['user_type'] == 'resident'){
                  navigation.navigate('Home Page')
                }else{
                  navigation.navigate('Official Home Page')
                }
                
              } else {
                alert("There is something wrong in your login");
                setIndicatorFlag(true)
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert("There is something wrong in your login")
              console.log(errorMessage)
            })
          })
        }
        catch(e){
          alert('Username or Password is incorrect')
          setIndicatorFlag(false)
        }
      }
    }
    return (
      <View style={styles.container}>
        <Image style={{marginBottom:10}} source={require('E:/mobile_application/ambooklance/assets/my_assets/logo.png')} />
        <Text style={{color:'#C81D35', fontSize:27, fontWeight:'bold',marginBottom:10}}>Welcome Back</Text>
        <Text style={{color:'black', fontSize:15, fontWeight:'bold',marginBottom:20}}>Sign in to access your account</Text>
        <SafeAreaView>
          <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text=>setEmail(text)}
          />
          <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text=>setPassword(text)}
          />
          <TouchableOpacity
                style={styles.buttonLogin}
                onPress={loginFunction}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Login</Text>
          </TouchableOpacity>
          <Text style={{textAlign:'center',color:'#0B3954'}}>
            Forgot Password? 
            <Text style={{color:'#C81D35', fontWeight:'bold'}}> Get new</Text>
          </Text>
          <Text style={{textAlign:'center', color:'#0B3954'}}>
            Do you need an account? 
            <Text style={{color:'#C81D35', fontWeight:'bold'}}> Sign up</Text>
          </Text>
        </SafeAreaView>
        <ActivityIndicator size="large" color="#0B3954" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} animating={indicatorFlag}/>
      </View>
    );
  }
  export default Login;
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
    },

    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  searchIcon: {
      padding: 10,
  }
  });