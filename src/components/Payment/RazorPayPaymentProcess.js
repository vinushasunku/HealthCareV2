import React from "react";
import {Text,TouchableHighlight, View} from "react-native";
import RazorpayCheckout from 'react-native-razorpay';
import {useAppDispatch,useAppSelector} from '../redux/hooks';
import axiosInstance from "../../services/APIService";
import {setStateId } from "../redux/slices/login";
import {useNavigation} from '@react-navigation/native';
 export const RazorPayPaymentProcess = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const orderid = useAppSelector(state => state.loginId.orderId);
    const [data,setData] = React.useState();
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        const url = require('../../../assets/url.json');
        console.log(orderid)
        setLoading(true)
        axiosInstance.get(url.commonurl+loginid+'/order/'+orderid).then(response => {
            setLoading(false);
            if( response != null &&response.data != null)
            {
                console.log("Data returned");
                setData(response.data);
                paymentPage(response.data["feePaid"],response.data["paymentDetails"]["paymentOrderId"])
            }
        }).catch(error =>{
            console.log(error);
            setLoading(false)
        })
        console.log(data) ;   
    }, []);

    function paymentPage(fee,paymentOrderId) {
        console.log("payment page");
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_BN5ssviLdq3CX7',
            amount: ''+fee+'00',
            name: 'Acme Corp',
            order_id: paymentOrderId,//Replace this with an order_id created using Orders API.
            theme: {color: '#53a20e'},
            "modal": {
                "ondismiss": function(){
                    console.log('Checkout form closed');
                }
            }
          }
          console.log(options)
            RazorpayCheckout.open(options).then((data) => {
                console.log(`Success: ${data.razorpay_payment_id}`);
                if(data.razorpay_payment_id != undefined){
                    conform();
                }

            }).catch((error) => {
                // handle failure
                console.log("closed");
                //dispatch(setStateId(2))
                //navigation.navigate('AppointmentBooking')
                //;
               // conform();
            });
    }
    function conform(){
        const data={
            "orderId" : orderid
        }
        const url = require('../../../assets/url.json');
        axiosInstance.post(url.commonurl+loginid+'/conform',data ).then(response => {
            navigation.navigate('BookingList')
        }).catch(error =>{
            console.log(error);
        })
    }
return(
    <></>
)
    // return (
    //     <></>
    // // <View>
    // //     <TouchableHighlight onPress={() => paymentPage()}><Text >
    // //                         {"payment"}
    // //                         </Text></TouchableHighlight>
    // // </View>
    // )
}

//export default RazorPayPaymentProcess;
