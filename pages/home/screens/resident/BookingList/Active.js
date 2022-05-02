import {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView} from 'react-native';
import { getUID} from "../../../../../LoginModels";
import {firebase} from '../../../../../firebase/firebase-config'
import { collection, query, where, onSnapshot, } from "firebase/firestore";
import {Card} from 'react-native-shadow-cards';

const Active = ({navigation}) =>{
    const [books, setBooks] = useState([])

    useEffect(() => {
        const z = query(collection(firebase, "Bookings"), where("uid", "==", getUID()));  
        const unsubscribe2 = onSnapshot(z, (querySnapshot) => {
            const cities = [];
            setBooks([])
            querySnapshot.forEach((doc) => {
                if(doc.data()['status'] == 'on the way' || doc.data()['status'] == 'pending' ){
                    cities.push(doc.data());
                }
            });
            setBooks(cities)
          });
    }, [])
    
    return(
        <View style={style.progressView}>
            <ScrollView>
            {books < 1 ?
            <Card style={{padding: 10, margin: 10}}>
                <Text style={{alignSelf:'center'}}>No Active Bookings. Book ambulance now?</Text>
                <Text></Text>
                <TouchableOpacity style={{marginLeft:'auto', marginRight:'auto', padding:5, backgroundColor:'#C81D35', borderRadius:5}}
                onPress={()=>{
                    navigation.navigate('Emergency Booking')
                }}>
                    <Text style={{color:'white', fontWeight:'bold'}}>Book Here</Text>
                </TouchableOpacity>
            </Card>
            :
             books.map((data, key) => {
                if(data['booking_type'] == 'Emergency'){
                    return(
                        <Card style={{margin:5, borderRadius: 10,width:'90%', marginEnd:'auto', marginStart:'auto', padding:20, flexDirection:'row', borderColor:'gainsboro', borderWidth:1}}>
                            <View style={{width:'50%'}}>
                                <Text style={{marginEnd:10, fontWeight:'bold', fontSize:16}}>{data['booking_type']}</Text>
                                <Text></Text>
                                <Text style={{marginEnd:10}}>{data['user_full_name']}</Text>
                                <Text style={{marginEnd:10}}>{data['emergency_type']}</Text>
                                {data['emergency_type'] == 'Accident' ? <Text style={{marginEnd:10}}>{data['accident_type']}</Text> : <></>}
                                {data['status'] == 'pending' ? <Text style={{fontStyle:'italic', color:'#ff9966'}}>{data['status']}</Text> : <Text style={{fontStyle:'italic', color:'#C81D35'}}>{data['status']}</Text>}
                            </View>
                            <View style={{width:'50%', flexDirection:'row'}}>
                                <TouchableOpacity style={{marginStart:'auto', marginTop:'auto', marginBottom:'auto'}} onPress={() => navigation.navigate('Message Official')}>
                                    <Text style={{color:'blue'}}>Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginStart:'auto',  marginTop:'auto', marginBottom:'auto'}}>
                                    <Text style={{color:'red'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </Card>
                    )
                }
                if(data['booking_type'] == 'Scheduled'){
                    return(
                        <Card style={{margin:5, borderRadius: 10,width:'90%', marginEnd:'auto', marginStart:'auto', padding:20, flexDirection:'row', borderColor:'gainsboro', borderWidth:1}}>
                            <View style={{width:'50%'}}>
                                <Text style={{marginEnd:10, fontWeight:'bold', fontSize:16}}>{data['booking_type']}</Text>
                                <Text></Text>
                                <Text style={{marginEnd:10}}>{data['user_full_name']}</Text>
                                <Text style={{marginEnd:10}}>{data['schedule_date']}</Text>
                                <Text style={{marginEnd:10}}>{data['schedule_time']}</Text> 
                                {data['status'] == 'pending' ? <Text style={{fontStyle:'italic', color:'#ff9966'}}>{data['status']}</Text> : <Text style={{fontStyle:'italic', color:'#C81D35'}}>{data['status']}</Text>}
                            </View>
                            <View style={{width:'50%', flexDirection:'row'}}>
                                <TouchableOpacity style={{marginStart:'auto', marginTop:'auto', marginBottom:'auto'}} onPress={() => navigation.navigate('Message Official')}>
                                    <Text style={{color:'blue'}}>Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginStart:'auto',  marginTop:'auto', marginBottom:'auto'}}>
                                    <Text style={{color:'red'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </Card>
                    )
                }
                if(data['booking_type'] == 'Transfer'){
                    return(
                        <Card style={{margin:5, borderRadius: 10,width:'90%', marginEnd:'auto', marginStart:'auto', padding:20, flexDirection:'row', borderColor:'gainsboro', borderWidth:1}}>
                            <View style={{width:'50%'}}>
                                <Text style={{marginEnd:10, fontWeight:'bold', fontSize:16}}>{data['booking_type']}</Text>
                                <Text></Text>
                                <Text style={{marginEnd:10}}>{data['user_full_name']}</Text>
                                <Text style={{marginEnd:10}}>{data['patient_full_name']}</Text>
                                <Text style={{marginEnd:10}}>{data['patient_age']}</Text> 
                                <Text style={{marginEnd:10}}>{data['patient_medical_condition']}</Text> 
                                {data['status'] == 'pending' ? <Text style={{fontStyle:'italic', color:'#ff9966'}}>{data['status']}</Text> : <Text style={{fontStyle:'italic', color:'#C81D35'}}>{data['status']}</Text>}
                            </View>
                            <View style={{width:'50%', flexDirection:'row'}}>
                                <TouchableOpacity style={{marginStart:'auto', marginTop:'auto', marginBottom:'auto'}} onPress={() => navigation.navigate('Message Official')}>
                                    <Text style={{color:'blue'}}>Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginStart:'auto',  marginTop:'auto', marginBottom:'auto'}}>
                                    <Text style={{color:'red'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </Card>
                    )
                }
            })}
            </ScrollView>
        </View>
    )
}

export default Active

const style = StyleSheet.create({
    progressView:{
        marginBottom:10,
        height: '100%',
        backgroundColor:'white',
    },
})