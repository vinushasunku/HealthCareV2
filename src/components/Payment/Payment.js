import React from "react";
import { styles } from "../constants/styles";
import { Text, View, TouchableOpacity, StatusBar, Image, FlatList,ScrollView, StyleSheet, Dimensions } from "react-native";
import axiosInstance from "../../services/APIService";
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import {setorderId } from "../redux/slices/login";
import Spinner from 'react-native-loading-spinner-overlay';
import {RazorPay} from '../Payment/RazorPayPaymentProcess';
// import Animated from "react-native-reanimated";
const { width } = Dimensions.get('screen');

const Payment = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const doctorId = useAppSelector(state => state.loginId.doctorId);
    const fee = useAppSelector(state => state.loginId.fee);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const orderId =useAppSelector(state => state.loginId.orderId);

    React.useEffect(() => {
        console.log('payment in main page');
        const url = require('../../../assets/url.json');
        axiosInstance.get(url.commonurl+loginid+'/order/'+orderId).then(response => {
            setLoading(false);
            if( response != null &&response.data != null)
            {
                console.log("Data returned");
                (async () => {
                    const Razorpaymentid= await RazorPay(response.data["feePaid"],response.data["paymentDetails"]["paymentOrderId"],loginid,orderId,navigation);
                    console.log('Testpayment'+Razorpaymentid)
                  })();

            }
        }).catch(error =>{
            console.log(error);
            setLoading(false)
        })

    },[1])

    function Payment(){
        navigation.navigate('RazorpayPayment')
    }
    return (
        <View  style={{ flex: 1, }} backgroundColor="#F5F5F5">
            <Spinner 
                visible={loading}
                textStyle={styles.spinnerTextStyle}
                />
        <View style={[styles.backgroundmargin,{ flex: 1, backgroundColor: 'white'}]}>
            <StatusBar backgroundColor="#6979F8" />
            {
                 <Text>{'Successfully payment is done'}</Text>
            }

        </View>
        </View>
        )
}

Payment.navigationOptions = {
    title: 'Payment',
    headerTitleStyle: {marginLeft: -10 * 2.0,fontSize: 20 },
    headerTintColor: 'black',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'#9ed6fb'
    }
}


const stylessheet = StyleSheet.create({

    textformat:{
        fontSize:16,
        lineHeight:22,
        //letterSpacing:0,
        fontWeight:'500'
    },
    textColor:{
        color:'#333333' 
    },
    headerfontsize:{
        fontSize:17,
        color:'black'
    },

});


export default Payment;