import {useState, useEffect} from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import { firebase } from "../../../../firebase/firebase-config";
import { collection, query, where, onSnapshot, doc, getDocs } from "firebase/firestore";
import { getUID } from "../../../../LoginModels";

const Notifications = () =>{
    const [notification, setNotification] = useState([])
    useEffect(async() => {
        const notifications = await getDocs(collection(firebase, "Users", getUID(), "Notifications"));
        const temp = []
        notifications.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp.push(doc.data())
        });
        setNotification(temp)
    }, [])
    console.log(notification['date'])
    return(
        <View style={style.progressView}>
        <ScrollView>
        {notification < 1 ?
        <Card style={{padding: 10, margin: 10}}>
            <Text>No notifications yet</Text>
        </Card>
        :
        notification.map((data, key) => {
            return(
                <Card style={{margin:5, borderRadius: 10,width:'90%', marginEnd:'auto', marginStart:'auto', padding:20, borderColor:'gainsboro', borderWidth:1}}>
                <View>
                    <Text style={{marginEnd:10, fontWeight:'bold', fontSize:16}}>ADMIN</Text>
                    <Text></Text>
                    <Text style={{marginEnd:10}}>{data['message']}</Text>
                    <Text></Text>
                    <Text style={{fontStyle:'italic', color:'#339900', fontSize: 12, fontStyle:'italic'}}>{data['date']}</Text>
                </View>
            </Card>
            )
        })}
        </ScrollView>
    </View>
    )
}
export default Notifications

const style = StyleSheet.create({
    progressView:{
        marginBottom:10,
        height: '100%',
        backgroundColor:'white',
    },
})