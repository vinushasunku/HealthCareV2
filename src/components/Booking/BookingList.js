import React from "react";
import { Text, View, Image, StatusBar, FlatList, TouchableOpacity,Button,platform,Pressable,Alert, StyleSheet ,ScrollView,Dimensions} from "react-native";
import Ionicons  from 'react-native-vector-icons/Ionicons'; 
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
// import { BottomSheet } from 'react-native-btr';
import { styles } from "../constants/styles";
import Modal from "react-native-modal";
import Feather  from 'react-native-vector-icons/Feather'; 
import Fontisto  from 'react-native-vector-icons/Fontisto';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment'; 
import Spinner from 'react-native-loading-spinner-overlay';
import axiosInstance from '../../services/APIService'
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import {setorderId, setStateId,setUpdate,setSelectDoctorName,setDoctorExperience,setfee,setType, setOrderStatus } from "../redux/slices/login";
//import { ZegoUIKitPrebuilt } from "zego-uikit-prebuilt";
const { width,height } = Dimensions.get('screen');
const BookingList = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const startLoading = () => {
        setLoading(!loading);
      };
    const [appointmentInfor, setAppointments] = React.useState([]);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const [visiblitySheet, setvisibilitySheet] = React.useState([false]);
    const [title, setTitle] = React.useState([false]);
    const [textmessage, setmessage] = React.useState([false]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [updatemodalVisible, setUpdateModalVisible] = React.useState(false);
    const [selectedOrderId, setSelectedOrderId] = React.useState('');
    const [cancelStatus, setcancelStatus] = React.useState(false);

    const [morningSlots, setmorningSlot] = React.useState([]);
    const [afternoonSlots, setafternoonSlot] = React.useState([]);
    const [eveningSlots, seteveningSlots] = React.useState([]);
    const [selectedSlot, setSelectedSlot] = React.useState('');
    const [selectedDate, setSelectedDay] = React.useState( moment().format('YYYY-MM-DD'));
 
    const [platformtype, setplatformtype] = React.useState(false);
    const setstate = useAppSelector(state => state.loginId.myState); 
    const [book, setBook] = React.useState(false);
    let datesBlacklist = moment() ;
    const dispatch = useAppDispatch();
    const toggleModal = (orderId) => {
        setcancelStatus(orderId)
        setModalVisible(!modalVisible);
      };
    

    function   toggleBottomNavigationViewCancel() {
        setTitle('Cancel Appointment')
        setmessage('Successfully Cancelled')
        setvisibilitySheet(!visiblitySheet)
       
      };
      function joinVedio(token){
        //   alert(token)
          //const TOKEN = ''; // Generate a Token and fill in the Token you get here.
          //const zp = ZegoUIKitPrebuilt.create(token);
        //   zp.joinRoom({
        //      container: {width:200,height:200},
        //   });
      }
      function cancelAppointment(orderId)
      {
        setModalVisible(!modalVisible)
        setSelectedOrderId(orderId);
      }

    //   function updateAppointment(orderId, doctorId){
    //     dispatch(setorderId(orderId));
    //     const newData = appointmentInfor.filter(
    //         function (item) {
    //           const itemData = item.orderId
    //             ? item.orderId.toUpperCase()
    //             : ''.toUpperCase();
    //           const textData = orderId.toUpperCase();
    //           return itemData.indexOf(textData) > -1;
    //       });
    //     console.log(newData)
    //     //dispatch(setStateId(0))
    //     dispatch(setSelectDoctorName(newData[0].firstName+ ' '+newData[0].lastName));
    //     dispatch(setDoctorExperience(new Date().getFullYear() -newData[0].practicingFrom));
    //     dispatch(setfee(newData[0].consultationFee));
    //     dispatch(setUpdate(true));
    //     dispatch(setType(newData[0].type));
    //     dispatch(setOrderStatus(newData[0].status))
    //     navigation.navigate('TimeSlots');
    //     //setSelectedOrderId(orderId);
    //     // const url = require('../../../assets/url.json');
    //     // const time= new Date().toISOString().slice(0,10);
    //     // const formatedtime=(time.replace('-','%2F')).replace('-','%2F');
    //     // axiosInstance.get(url.timeslots+loginid+'/slots/'+doctorId+'/'+formatedtime).then(response => {
    //     //     if( response != null &&response.data != null && response.data.length >0)
    //     //     {
    //     //         const morningdata=[];
    //     //         const afternoondata=[];
    //     //         const eveningdata=[];
    //     //         for(let i = 0; i < response.data.length; i++)
    //     //         {
    //     //             if(parseInt((response.data[i].slotTime.split(':')[0]).split(' ')[1]) <=12)
    //     //             {
    //     //                 morningdata.push(response.data[i].slotTime.split(' ')[1])
    //     //             }
    //     //             else if(parseInt((response.data[i].slotTime.split(':')[0]).split(' ')[1]) >=13 && parseInt((response.data[i].slotTime.split(':')[0]).split(' ')[1]) <=18)
    //     //             {
    //     //                 afternoondata.push(response.data[i].slotTime.split(' ')[1])
    //     //             }
    //     //             else if(parseInt((response.data[i].slotTime.split(':')[0]).split(' ')[1]) > 18){
    //     //                 eveningdata.push(response.data[i].slotTime.split(' ')[1])
    //     //             }
                   
    //     //         }
    //     //         //setSelectedDay(time);
    //     //         setmorningSlot(morningdata);
    //     //         setafternoonSlot(afternoondata);
    //     //         seteveningSlots(eveningdata);
    //     //         setUpdateModalVisible(!updatemodalVisible);
    //     //     }
    //     // }).catch(error =>{
    //     //     console.log(error);
    //     // })
        
    //   }
      function cancelAppointmentConfirm(){
        const url = require('../../../assets/url.json');
        axiosInstance.post(url.commonurl+loginid+'/order/'+selectedOrderId+'/cancel').then(response => {
         if(response.status === 200)
         {
            setcancelStatus('Successfully Cancelled')
            setModalVisible(!modalVisible);
            for(let i=0;i< appointmentInfor.length;i++ ){
                if(appointmentInfor.orderId === selectedOrderId){
                    appointmentInfor.status = "CANCELLED";
                }
            }
            setAppointments(appointmentInfor)
         }
   
        }).catch(error =>{
            console.log(error);
        })
      }
      function setselecteddatefromcalendar(date)
      {
          console.log(date.toISOString().slice(0,10))
        //datesBlacklist="";
        setSelectedDay(date.toISOString().slice(0,10))
      }
      const today = moment().format('YYYY-MM-DD');
      function calander() {
          return (
              <View>
                  <View style={{width: platformtype == true? 380:width/1.3 }}>
                      <CalendarStrip
                          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                          highlightDateContainerStyle={{
                              backgroundColor: "#ccccff",
                              alignItems: 'center',
                              justifyContent: 'center',
                              //marginBottom:10,
                              height: 50,
                              width: 50,
                              marginTop:10,
                              lineHeight:22
                          }}
                          dateNumberStyle={{ color: 'black', fontSize: 16.0 ,lineHeight:22}}
                          dateNameStyle={{ color: 'black', fontSize: 16.0,lineHeight:22 }}
                          highlightDateNameStyle={{  color: 'white', fontSize: 16.0 ,lineHeight:22}}
                          highlightDateNumberStyle={{ color: 'white', fontSize: 16.0 ,lineHeight:22}}
                          //datesBlacklist={datesBlacklistFunc}
                          disabledDateOpacity={0.6}
                          disabledDateNameStyle={{ color: '#6979F8', fontSize: 16.0,lineHeight:22 }}
                          disabledDateNumberStyle={{ color: '#6979F8', fontSize: 16.0,lineHeight:22 }}
                          useIsoWeekday={false}
                          scrollable={false}
                          upperCaseDays={false}
                          styleWeekend={false}
                          
                          //datesWhitelist={datesWhitelist}
                          //datesBlacklist={datesBlacklist}
                          onDateSelected={date=>setselecteddatefromcalendar(date)}
                          selectedDate={datesBlacklist}
                      />
                  </View>
              </View>
          );
      }
    //   function updateAppointmentConfirm(){
    //     const url = require('../../../assets/url.json');
        
    //     const time=selectedSlot.includes('AM')? selectedSlot.replace(' AM', ''):selectedSlot.replace(' PM', '');
    //     const formatteddate=selectedDate +' ' +time;
    //     const data=new updateModel(formatteddate); 
    //     const urlformatted=url.commonurl+loginid+'/order/'+selectedOrderId+'/update';
    //     axiosInstance.post(urlformatted,data).then(response => {
    //      if(response.status === 200)
    //      {
            
    //         setUpdateModalVisible(!updatemodalVisible);
    //         for(let i=0;i< appointmentInfor.length;i++ ){
    //             if(appointmentInfor.orderId === selectedOrderId){
    //                 appointmentInfor.slot = formatteddate;
    //             }
    //         }
    //         setAppointments(appointmentInfor)
    //      }
   
    //     }).catch(error =>{
    //         console.log(error);
    //     })

    //   }
      function slotsInfo({ image, data }) {
        
        return <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            marginTop:10,
            paddingLeft:15
        }}>
          {
             image === "sunrise" ? <Feather name={image} size={24} color="#2F4F4F" />:<Fontisto name={image} size={24} color="#2F4F4F" />
          }
          
            <Text style={[stylessheet.textColor, stylessheet.textformat,stylessheet.headerfontsize,{  marginLeft: 10,fontWeight:'bold' }]}>{data.length} Slots</Text>
        </View>
    }

    function slotsTime({ slots, time }) {

        // const renderItem = ({ item }) => {
            //console.log('selectetd stlot'+selectedSlot +'item'+ item+'time' +time)
            return (

              
                    <View  style={{flexDirection:'row',flexWrap:'wrap', paddingLeft:15}}>
                        {
                                             slots.map((item,index)=>( 
                                                <TouchableOpacity key={index} onPress={() => {
                                                    setSelectedSlot(`${item} ${time}`)
                                                    setBook(true)
                                                }}>
                                                    <View style={{
                                                        backgroundColor: selectedSlot == `${item} ${time}` ? '#2F4F4F': 'white',
                                                        borderColor: selectedSlot == `${item} ${time}` ? '#2F4F4F' : '#CDCDCD',
                                                        alignItems: 'center',borderRadius: 10, alignItems: 'center',marginBottom: 12,justifyContent: 'center',borderWidth: 1.0,marginRight: 12,height: 45.0,width: 100.0
                                                    }}>
                                                        <Text style={
                                                            (selectedSlot == `${item} ${time}`) ?
                                                                { color: 'white', fontSize: 16.0}
                                                                :
                                                                { color: '#2F4F4F', fontSize: 16.0}
                                                        }>
                                                            {item} {time}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity >
                                                ))

                        }
         
                </View>

             
                
         

            )
    }
    React.useEffect(() => {
        const url = require('../../../assets/url.json');
        console.log(url.commonurl+loginid+'/orders?pageSize=10')
        startLoading();
        axiosInstance.get(url.commonurl+loginid+'/orders?pageSize=100').then(response => {
            setLoading(false);
            if( response != null &&response.data != null && response.data.orders.length>0 )
            {
                setAppointments(response.data.orders);
               
            }
        }).catch(error =>{
            console.log(error);
        })
        //dispatch(setStateId(0))

        //setAppointments(data);
      
    },[setstate]);
    function bookDetail(id){
        dispatch(setorderId(id));
        dispatch(setStateId(0));
        navigation.navigate('BookDetail')
    }
    function bookingList() {
        return(

            <View style={{ marginLeft:10, marginRight:10}}>
                {
                                (appointmentInfor != null && appointmentInfor.length >0) ? appointmentInfor.map((item,index)=>(
                                    <View  key={index} style={{  marginTop: 10.0,backgroundColor:'white',borderRadius:10, paddingTop:20}}>
                                        <TouchableOpacity onPress={()=>bookDetail(item.orderId)}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{paddingLeft:30}}>
                                                    <Ionicons name="person" size={50} color="#2F4F4F" />
                                                </View>
                                
                                                <View style={{paddingLeft:40, width:'65%'}} >
                                                        <Text style={[stylessheet.textformat,stylessheet.textColor,stylessheet.headerfontsize,{textTransform:'uppercase', paddingBottom:5}]}>{item.doctorName != null ?item.doctorName: 'Lab Test' }</Text>
                                                        <View style={{        backgroundColor: "#DBDBDB",height: 0.80}}>
                                                        </View> 
                                
                                                        <View style={{ flexDirection: 'row', marginTop: 3}}>
                                                        
                                                            <Text style={[stylessheet.textformat, stylessheet.textColor]}>
                                                                {item.slot}
                                                            </Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', marginTop: 3}}>
                                                        
                                                        <Text style={[stylessheet.textformat, stylessheet.textColor]}>
                                                            {item.type}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 3}}>
                                                    <Text style={[stylessheet.textformat, stylessheet.textColor]}>
                                                            {"Status : "}
                                                        </Text>
                                                        <Text style={[stylessheet.textformat, stylessheet.textColor]}>
                                                            {item.status}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View >
                                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                                                </View>
                                
                                            </View>

                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom:10 }}>
                                            {/* <View style={{  marginTop: 3,paddingLeft:10 , paddingTop:30}}>
                                                        <acity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20, width:100, height:30, marginLeft:10}}
                                                        onPress={()=>cancelAppointment(item.orderId)}
                                                        >
                        
                                                                    <Text style={{alignItems:'center', paddingTop:5,color:'#ffff' }}>
                                                                    {"Cancel"}
                                                                    </Text>
                        
                                                        </TouchableOpacity>
                        
                                                </View> */}
                                                {/* <View style={{paddingLeft:10 , paddingTop:30,width:'50%'}}>
                                                        <TouchableOpacity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20,  marginLeft:10, paddingBottom:10}}
                                                    onPress={()=>updateAppointment(item.orderId, item.doctorId)}
                                                        >
                        
                                                                    <Text style={{alignItems:'center', paddingTop:5,color:'#ffff' }}>
                                                                    {"Update"}
                                                                    </Text>
                        
                                                        </TouchableOpacity>
                        
                                                </View> */}
                                                {/* <View style={{ paddingLeft:10 , paddingTop:30,width:'50%'}}>
                                                        <TouchableOpacity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20,  marginLeft:10,paddingBottom:10}}
                                                        onPress={()=>joinVedio(item.videoToken)}
                                                        >
                        
                                                                    <Text style={{alignItems:'center', paddingTop:5,color:'#ffff' }}>
                                                                    {"Join"}
                                                                    </Text>
                        
                                                        </TouchableOpacity>
                        
                                                </View> */}
                        
                                        </View>
                    
                                    </View>
                                    
                                )) : <View></View>

                }
            </View>


        )
    }

//     function bottomsheet()
//     {
//     return(
//         <BottomSheet
//           visible={visiblitySheet}
//           onBackButtonPress={toggleBottomNavigationViewCancel()}
//           onBackdropPress={toggleBottomNavigationViewCancel()}
//         >
//         <View style={styles.bottomNavigationView}>
//             <View
//                 style={{
//                     flex: 1,
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     borderBottomColor:'#F8F8F8',
//                 }}>
//                 <Text
//                 style={{
//                   textAlign: 'center',
//                   padding: 20,
//                   fontSize: 20,
//                   backgroundColor:'#F8F8F8',
//                   //width:width
//                 }}>
//                  {title}
//               </Text>
//             </View>
//             <View styles={{paddingTop:10,width:width}}>
//                 <Text style={{fontWeight:'bold' }}>
//                    {textmessage}
//                 </Text>
//             </View>

//         </View>
//         </BottomSheet>
//     )
// }

    return (
        <View style={{ flex: 1, backgroundColor:'#F5F5F5', }}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
                />
        <View >
            <ScrollView >

            {bookingList()}

            </ScrollView>
        </View>        

        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={updatemodalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!updatemodalVisible);
                }}
            >
                  
                  <View  style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                            <View style={[styles.modalView,{height:height/1.5, width:width/1.2, backgroundColor:'rgb(214, 229, 243)'}]}>
                                <View style={{borderBottomColor:'#eee', borderBottomWidth:1,width:300, alignItems:'center' }}>
                                    <Text style={{paddingBottom:20, fontSize:16, fontWeight:'bold'}}> {"Select Slots"}</Text>
                                </View>

                                <ScrollView >
                                                    {calander()}
                                                    {slotsInfo({ image:"sunrise", data: morningSlots })}
                                                    {slotsTime({ slots: morningSlots, time: 'AM' })} 
                                                    {slotsInfo({image:"day-sunny",  data: afternoonSlots })}
                                                    {slotsTime({ slots: afternoonSlots, time: 'AM' })}
                                                    {slotsInfo({ image:"night-clear",data: eveningSlots })}
                                                    {slotsTime({ slots: eveningSlots, time: 'PM' })}
                                            
                                    </ScrollView>
                                

                                <View style={{flexDirection:'row', marginTop:30}}>
                                   
                                  {
                                    book?
                                     <View>
                                        <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => updateAppointmentConfirm()}
                                        >
                                        <Text style={styles.textStyle}>Update</Text>
                                        </Pressable>
                                     </View>:<View></View>
                                  }
                                   <View>
                                        <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setUpdateModalVisible(!updatemodalVisible)}
                                        >
                                        <Text style={styles.textStyle}>No</Text>
                                        </Pressable>

                                   </View>


                                     
                                </View>

                            </View>
                    </View>
            </Modal>

        </View>
    </View>
    )
}

BookingList.navigationOptions = {
    title: 'Booking Appointment',
    headerTintColor: 'black',
    headerTitleAlign: 'center',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'rgb(214, 229, 243)'
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
    }
});

export default BookingList;

