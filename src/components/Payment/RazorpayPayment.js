import React from "react";
import {Text,TouchableHighlight, View} from "react-native";
import RazorpayCheckout from 'react-native-razorpay';
import {useAppDispatch,useAppSelector} from '../redux/hooks';
import axiosInstance from "../../services/APIService";

const RazorpayPayment = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const orderid = useAppSelector(state => state.loginId.orderId);
    const [data,setData] = React.useState();

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
               
            }
        }).catch(error =>{
            console.log(error);
            setLoading(false)
        })
        console.log(data) ;   
    }, []);

    function paymentPage() {
        console.log("payment page");
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_BN5ssviLdq3CX7',
            amount: ''+data["feePaid"]+'00',
            name: 'Acme Corp',
            order_id: data["paymentDetails"]["paymentOrderId"],//Replace this with an order_id created using Orders API.
            theme: {color: '#53a20e'}
          }
            RazorpayCheckout.open(options).then((data) => {
                console.log(`Success: ${data.razorpay_payment_id}`);
                conform();
            }).catch((error) => {
                // handle failure
                conform();
            });
    }

    function conform(){
        const data={
            "orderId" : orderid
        }
        const url = require('../../../assets/url.json');
        axiosInstance.post(url.commonurl+loginid+'/conform',data ).then(response => {
            console.log('responselogindetail',response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    return (
    <View>
        <TouchableHighlight onPress={() => paymentPage()}><Text style={{alignItems:'center', paddingTop:10,color:'#ffff' }}>
                            {"payment"}
                            </Text></TouchableHighlight>
    </View>
    )
}

export default RazorpayPayment;