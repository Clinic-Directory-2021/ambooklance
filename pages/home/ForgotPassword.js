import React, {useState} from 'react';
import { Text, Image, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity,  ActivityIndicator } from 'react-native';
import { auth } from '../../firebase/firebase-config';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({navigation}) =>{
    const [email, setEmail] = useState('')
    const forgotPasswordFunction = () =>{
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Successfully Sent Reset Password Request. Please Check you E-Mail Box.')
                navigation.navigate('Home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text=>setEmail(text)}
            />
            <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={() =>
                    forgotPasswordFunction()
                  }
            >
              <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Login</Text>
            </TouchableOpacity>
            <Text style={{textAlign:'center',color:'#0B3954'}}>
                Enter your active email to receive reset password request.
            </Text>
        </View>
      );
}

export default ForgotPassword;
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