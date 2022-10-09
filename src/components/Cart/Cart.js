import React from "react";
import { ListItem,Avatar } from "react-native-elements";
import CalendarStrip from 'react-native-calendar-strip';
import { styles } from "../constants/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, TouchableOpacity, StatusBar, Image, FlatList, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('screen');

const Cart = ({ navigation }) => {

    const doctorId = navigation.getParam('doctorId');
    const fee = navigation.getParam('fee');
    const loginid = navigation.getParam('loginid');
    const orderId =navigation.getParam('orderId');


    function divider() {
        return (
            <View style={styles.dividerStyle}>
            </View>
        )
    }
    function Payment(){
        const data={
            "doctorId" :doctorId ,
            "orderId" : orderId,
            "feePaid" : fee
        }
        const url = require('../../../assets/url.json');
        axios.post(url.commonurl+loginid+'/conform_consultation',data ).then(response => {
            console.log('responselogindetail',response.data);
            navigation.navigate('BottomTabs', {
                loginid:loginid
            });
        }).catch(error =>{
            console.log(error);
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor="#6979F8" />
            {

                <View style={{ flex: 1 ,backgroundColor:"#eee"}}>
                <View style={styles.bookNowContainerStyle}>
                    <TouchableOpacity onPress={() => Payment()} style={{marginRight:10, paddingLeft:30}}>

                                    <Text >
                                        Confirm Payment
                                    </Text>
                             
                        </TouchableOpacity>
                </View>
                </View>
            }

        </View>)
}

Cart.navigationOptions = {
    title: 'Cart',
    headerTitleStyle: {marginLeft: -10 * 2.0,fontSize: 20 },
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    }
}



export default Cart;