import React from "react";
import { styles } from "../constants/styles";
import { Text, View, TouchableOpacity, StatusBar, Image, FlatList,ScrollView, StyleSheet, Dimensions } from "react-native";
import axiosInstance from "../../services/APIService";
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import {setorderId } from "../redux/slices/login";
const { width } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';


const ConfirmOrder = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const doctorId = useAppSelector(state => state.loginId.doctorId);
    const fee = useAppSelector(state => state.loginId.fee);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const orderId =useAppSelector(state => state.loginId.orderId);
    const [status, setStatus] = React.useState(false);

    function divider() {
        return (
            <View style={styles.dividerStyle}>
            </View>
        )
    }
    function Conform(){
        const data={
            "orderId" : orderId,
            "feePaid" : fee
        }
        const url = require('../../../assets/url.json');
        setLoading(true)
        axiosInstance.post(url.commonurl+loginid+'/conform',data ).then(response => {
            setLoading(false)
            console.log('responselogindetail',response.data);
            setStatus(true);
        }).catch(error =>{
            setLoading(false)
            console.log(error);
        })
    }
    return (
        <View  style={{ flex: 1, }} backgroundColor="#F5F5F5">
            <Spinner 
                visible={loading}
                textStyle={styles.spinnerTextStyle}
                />
        <View style={{ flex: 1, backgroundColor: 'white',marginLeft:10, marginRight:10, marginTop:10 }}>
            <StatusBar backgroundColor="#6979F8" />
            {
                <ScrollView scrollEventThrottle={16}>
                    {
                        status === true?                     
                        <View >
                            <Text style={[stylessheet.textformat, stylessheet.textColor, stylessheet.headerfontsize,{paddingLeft:20, paddingTop:20,  fontSize:20, lineHeight:30}]}>    
                                 {"Thanks for scheduling an appointment with us."}</Text>
                        </View>
                        :<></>
                    }


                </ScrollView>

            }

            {
               <View style={{marginBottom:20, marginTop:10}}>
                <View style={{height:50,backgroundColor:"white"}}>
                <View style={styles.bookContainerStyle}>

                                    <View>
                                        <Text style={[stylessheet.textformat,stylessheet.textColor,{paddingLeft:20, fontWeight:'bold'}]}>{'Rs '+fee}</Text>
                                    </View>

                            <TouchableOpacity onPress={() => Conform()}>
                                <View style={[styles.buttonBookingStyle, {backgroundColor:'#337ab7'}]}>
                                    <Text style={[stylessheet.textformat,{  color: '#FFFFFF' }]}>{'Conform'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                </View>
              </View>
            }

        </View>
        </View>
        )
}


ConfirmOrder.navigationOptions = {
    title: 'Confirm Order',
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

export default ConfirmOrder;