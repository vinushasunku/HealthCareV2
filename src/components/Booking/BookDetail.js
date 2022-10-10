import React from "react";
import { styles } from "../constants/styles";
import { Text, View, TouchableOpacity, StatusBar, Image, FlatList,Pressable, StyleSheet, Dimensions } from "react-native";
import axiosInstance from "../../services/APIService";
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import {setorderId, setStateId,setUpdate,setSelectDoctorName,setDoctorExperience,setfee,setType, setOrderStatus, setSelectselectedDate, setUserName, setVideoToken } from "../redux/slices/login";
import { ScrollView } from "react-native-gesture-handler";
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";
const { width,height } = Dimensions.get('screen');

const BookDetail = ({ navigation }) => {
    const [appointmentInfor, setAppointments] = React.useState([]);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const orderid = useAppSelector(state => state.loginId.orderId);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [cancelStatus, setcancelStatus] = React.useState('');
    const [data,setData] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const setstate = useAppSelector(state => state.loginId.myState); 
    const [updatemodalVisible, setUpdateModalVisible] = React.useState(false);
    const dispatch = useAppDispatch();
    function divider() {
        return (
            <View style={styles.dividerStyle}>
            </View>
        )
    }
    React.useEffect(() => {
        const url = require('../../../assets/url.json');
        console.log(orderid)
        setLoading(true)
        axiosInstance.get(url.commonurl+loginid+'/order/'+orderid).then(response => {
            setLoading(false);
            if( response != null &&response.data != null)
            {
                setData(response.data);
               
            }
        }).catch(error =>{
            console.log(error);
            setLoading(false)
        })
        console.log(data) ;   
    },[setstate]);
    
    function detail(){
        return(
            <View style={{borderColor:'#ffffff'}}>
                <View style={{
                    borderWidth:1, 
                    marginTop:10, 
                    marginLeft:10, 
                    marginRight:10, 
                    backgroundColor:'#FFFFFF', 
                    borderColor:'#eee'
                    }}>
                    <View style={{flexDirection:'row',paddingTop:20,paddingLeft:20}}>
                        <View style={{width:'40%'}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor, stylessheet.textsideheader]}>
                                {'Slot date'}
                            </Text>

                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor]}>
                                {data["slot"]}
                            </Text>

                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:20,paddingTop:5}}>
                        <View style={{width:'40%'}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor, stylessheet.textsideheader]}>
                                {'Booking #'}
                            </Text>

                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor,{width:'60%'}]}>
                                {data["orderId"]}
                            </Text>

                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:20, paddingTop:5, marginBottom:20}}>
                        <View style={{width:'40%'}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor, stylessheet.textsideheader]}>
                                {'Order Type'}
                            </Text>

                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor]}>
                                {data["type"]}
                            </Text>

                        </View>
                    </View>

                    
                </View>

            </View>
        )
    }

    function doctorInfo(){

        return(
            <View style={{borderColor:'#ffffff'}}>
                <View style={{
                    borderWidth:1, 
                    marginTop:10, 
                    marginLeft:10, 
                    marginRight:10, 
                    backgroundColor:'#FFFFFF', 
                    borderColor:'#eee'
                    }}>
                    <View style={{flexDirection:'row',paddingTop:20,paddingLeft:20}}>
                        <View style={{width:'40%'}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor, stylessheet.textsideheader]}>
                                {'Doctor Name'}
                            </Text>

                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor,{textTransform:'uppercase'}]}>
                                {data["doctorName"]}
                            </Text>

                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:20,paddingTop:5}}>
                        <View style={{width:'40%'}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor, stylessheet.textsideheader]}>
                                {'Fee'}
                            </Text>

                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor]}>
                                {'Rs '+data["feePaid"]}
                            </Text>

                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:20, paddingTop:5, marginBottom:20}}>
                        <View style={{width:'40%'}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor, stylessheet.textsideheader]}>
                                {'Status'}
                            </Text>

                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor]}>
                                {data["status"]}
                            </Text>

                        </View>
                    </View>

                    
                </View>

            </View>
        )

    }
    function listOrder(){
        return(
            data['orderItems'].map((item,index)=>(
            <View key={index} style={{borderColor:'#ffffff'}}>
                <View style={{
                    borderWidth:1, 
                    marginTop:10, 
                    marginLeft:10, 
                    marginRight:10, 
                    backgroundColor:'#FFFFFF', 
                    borderColor:'#eee'
                    }}>
                    <View style={{flexDirection:'row',paddingTop:20,paddingLeft:20, marginBottom:20}}>
                        <View style={{width:'40%'}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor, stylessheet.textsideheader]}>
                                {'Item Name'}
                            </Text>

                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor,{textTransform:'uppercase'}]}>
                                {item["itemName"]}
                            </Text>

                        </View>
                    </View>
                    {/* <View style={{flexDirection:'row',paddingLeft:20, paddingTop:5, marginBottom:20}}>
                        <View style={{width:'40%'}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor, stylessheet.textsideheader]}>
                                {'Item #'}
                            </Text>

                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor,{width:'57%'}]}>
                                {item["itemId"]}
                            </Text>

                        </View>
                    </View> */}

                    
                </View>

            </View>
            ))
        )
    }
    function cancelAppointment()
    {
      setModalVisible(!modalVisible)
    //   setSelectedOrderId(orderid);
    }
    function updateAppointment(){
        dispatch(setorderId(orderid));
        dispatch(setStateId(0))
        dispatch(setSelectDoctorName(data['doctorName']));
        //dispatch(setDoctorExperience(new Date().getFullYear() -newData[0].practicingFrom));
        dispatch(setfee(data['feePaid']));
        dispatch(setUpdate(true));
        dispatch(setType(data['type']));
        dispatch(setOrderStatus(data['status']))
        dispatch(setSelectselectedDate(data['slot']))
        navigation.navigate('TimeSlots');      
      }
    function joinVideo() {
        dispatch(setorderId(orderid));
        dispatch(setSelectDoctorName(data['doctorName']));
        dispatch(setUserName(data['memberName']));
        dispatch(setVideoToken(data['videoToken']));
        navigation.navigate('joinVideo');
    }
    function updateAppointmentConfirm(){
        const url = require('../../../assets/url.json');
        
        const time=selectedSlot.includes('AM')? selectedSlot.replace(' AM', ''):selectedSlot.replace(' PM', '');
        const formatteddate=selectedDate +' ' +time;
        const data=new updateModel(formatteddate); 
        const urlformatted=url.commonurl+loginid+'/order/'+selectedOrderId+'/update';
        axiosInstance.post(urlformatted,data).then(response => {
         if(response.status === 200)
         {
            
            setUpdateModalVisible(!updatemodalVisible);
            for(let i=0;i< appointmentInfor.length;i++ ){
                if(appointmentInfor.orderId === selectedOrderId){
                    appointmentInfor.slot = formatteddate;
                }
            }
           // setAppointments(appointmentInfor)
         }
   
        }).catch(error =>{
            console.log(error);
        })

      }
    function cancelAppointmentConfirm(){
        const url = require('../../../assets/url.json');
        setLoading(true);
        axiosInstance.post(url.commonurl+loginid+'/order/'+orderid+'/cancel').then(response => {
        console.log(response.status)
         if(response.status === 200)
         {
            setcancelStatus('Successfully Cancelled')
            data["status"]="CANCELLED"
            setModalVisible(!modalVisible);
            setLoading(false);
            dispatch(setStateId(1));
            
         }
   
        }).catch(error =>{
            setcancelStatus('Unable to cancel appointment. please try again.')
            setLoading(false);
            console.log(error);
        })
      }
    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <Spinner
                visible={loading}
                textStyle={styles.spinnerTextStyle}
                />
            <StatusBar />
            {
                 data != undefined ||data != null? detail():<View></View>
                
            }
            {
                (data != undefined ||data != null ) && data["doctorName"] != null && data['type']  === 'CONSULTATION'?             <View style={{paddingTop:10,  paddingLeft:10}}>
               <Text style={[StyleSheet.headerfontsize, stylessheet.textcolor,{ fontSize:20, fontWeight:'bold'}]}>
                  {"Doctor information"}
               </Text>
                </View>
               :<View></View>
            }
            {
               (data != undefined ||data != null ) && data["doctorName"] != null ? doctorInfo():<View></View>
            }
            {
                (data != undefined ||data != null) && data['type']  != 'CONSULTATION'?            <View style={{paddingTop:10,  paddingLeft:10}}>
                <Text style={[StyleSheet.headerfontsize, stylessheet.textcolor,{ fontSize:20, fontWeight:'bold'}]}>
                   {"Lab List"}
                </Text>
           </View>:<></>
            }

            <ScrollView>
                {  (data != undefined ||data != null) && data['type']  != 'CONSULTATION'? listOrder():<></>}

            </ScrollView>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    
                    <View  style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={[styles.modalView,{height:200, width:300, backgroundColor:'#F5F5F5'}]}>
                                    <View style={{borderBottomColor:'#eee', borderBottomWidth:1,width:300, alignItems:'center' }}>
                                        <Text style={{paddingBottom:20, fontSize:16, fontWeight:'bold'}}> {"Confirmation"}</Text>
                                    </View>

                                    <Text style={[styles.modalText, {marginTop:10}]}>{"Are you sure do you want to cancel ? "}</Text>
                                    

                                    <View style={{flexDirection:'row', marginTop:30}}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => cancelAppointmentConfirm()}
                                            >
                                            <Text style={styles.textStyle}>Yes</Text>
                                            </Pressable>
                                            <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                            >
                                            <Text style={styles.textStyle}>No</Text>
                                        </Pressable>
                                    </View>

                                </View>
                     </View>
                </Modal>

            </View>

            <View style={{ marginTop: 3,height:'10%', backgroundColor:'#ffffff', flexDirection:'row'}}>
                    <View style={{paddingLeft:10 ,width:'33%',marginTop:10}}>
                        <TouchableOpacity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20,   marginLeft:10,paddingBottom:10}}
                            onPress={()=>cancelAppointment()}
                        >
                            
                            <Text style={{alignItems:'center', paddingTop:10,color:'#ffff' }}>
                                {"Cancel"}
                            </Text>
                            
                        </TouchableOpacity>

                    </View>


                    <View style={{paddingLeft:10 , width:'33%',marginTop:10}}>
                            <TouchableOpacity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20,   marginLeft:10,paddingBottom:10}}
                                onPress={()=>updateAppointment()}
                                >
                        
                                    <Text style={{alignItems:'center', paddingTop:10,color:'#ffff' }}>
                                    {"Update"}
                                    </Text>
                        
                            </TouchableOpacity>
                        
                    </View>
                    <View style={{paddingLeft:10 , width:'33%',marginTop:10}}>
                            <TouchableOpacity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20,   marginLeft:10,paddingBottom:10}}
                                 onPress={()=>joinVideo()}
                                >
                        
                                    <Text style={{alignItems:'center', paddingTop:10,color:'#ffff' }}>
                                    {"Video"}
                                    </Text>
                        
                            </TouchableOpacity>
                        
                    </View>
                        
            </View>
        </View>
        )
}

BookDetail.navigationOptions = {
    title: 'Book Detail',
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
        fontWeight:'400'
    },
    textColor:{
        color:'#333333' 
    },
    headerfontsize:{
        fontSize:17,
        color:'black'
    },
    textsideheader:{
        color:'#B3B3B3'
    }
});


export default BookDetail;