import React from "react";
import { ListItem,Avatar } from "react-native-elements";
import CalendarStrip from 'react-native-calendar-strip';
import { styles } from "../constants/styles";
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Feather  from 'react-native-vector-icons/Feather'; 
import  Fontisto  from 'react-native-vector-icons/Fontisto';
import  Ionicons  from 'react-native-vector-icons/Ionicons'; 
import { LogBox, Platform } from "react-native";
import { updateModel } from "../../models/loginModel";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, TouchableOpacity, StatusBar, Image, FlatList, StyleSheet, Dimensions} from "react-native";
import axiosInstance from "../../services/APIService";
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import { setSelectselectedDate ,setSelectselectedSlot, setStateId, setUpdate} from "../redux/slices/login";
const { width } = Dimensions.get('screen');

const TimeSlots = ({ navigation }) => {
    const name = useAppSelector(state => state.loginId.doctorName);
    const experience = useAppSelector(state => state.loginId.experience);
    const slot=useAppSelector(state => state.loginId.selectedSlot);
    const date = useAppSelector(state => state.loginId.selectedDate);
    const id = useAppSelector(state => state.loginId.doctorId);
    const selectedOrderId = useAppSelector(state => state.loginId.orderId);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const update = useAppSelector(state => state.loginId.update);
    const orderStatus = useAppSelector(state => state.loginId.orderstatus);
    const type = useAppSelector(state => state.loginId.type);
    const [morningSlots, setmorningSlot] = React.useState([]);
    const [afternoonSlots, setafternoonSlot] = React.useState([]);
    const [eveningSlots, seteveningSlots] = React.useState([]);
    const [selectedSlot, setSelectedSlot] = React.useState('');
    const [selectedDate, setSelectedDay] = React.useState('');
    const [platformtype, setplatformtype] = React.useState(false);
    const [numcolunmslist, setcolunmslist] = React.useState(3);
    const [updatestatus, setUpdateStatus] = React.useState(false);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = React.useState(false);
    //const [selectedDate, markedDates] = React.useState('');
    const [book, setBook] = React.useState(false);
    let datesBlacklist = moment() ;
    React.useEffect(() => {
        if(Platform.OS === 'ios' || Platform.OS === 'android' )
        {
            setplatformtype(true)
        }
        else{
            setcolunmslist(4)
        }
        const url = require('../../../assets/url.json');
        const time= new Date().toISOString().slice(0,10);
        const formatedtime=(time.replace('-','%2F')).replace('-','%2F');
        if(type === 'CONSULTATION'){
            setLoading(true);
            axiosInstance.get(url.timeslots+loginid+'/slots/'+id+'/'+formatedtime).then(response => {
                if( response != null &&response.data != null && response.data.length >0)
                {
                    const morningdata=[];
                    const afternoondata=[];
                    const eveningdata=[];
                    for(let i = 0; i < response.data.length; i++)
                    {
                        if(response.data[i].slotStatus === 'AVAILABLE'){
                        if(parseInt((response.data[i].slotTime.split(':')[0]).split(' ')[1]) <=12)
                        {
                            morningdata.push(response.data[i].slotTime.split(' ')[1])
                        }
                        else if(parseInt((response.data[i].slotTime.split(':')[0]).split(' ')[1]) >=13 && parseInt((response.data[i].slotTime.split(':')[0]).split(' ')[1]) <=18)
                        {
                            afternoondata.push(response.data[i].slotTime.split(' ')[1])
                        }
                        else if(parseInt((response.data[i].slotTime.split(':')[0]).split(' ')[1]) > 18){
                            eveningdata.push(response.data[i].slotTime.split(' ')[1])
                        }
                    }
                       
                    }
                    setSelectedDay(time);
                    setmorningSlot(morningdata);
                    setafternoonSlot(afternoondata);
                    seteveningSlots(eveningdata);
                    setLoading(false);
                }
            }).catch(error =>{
                console.log(error);
                setLoading(false);
            })
        }
        else{
            setSelectedDay(date);
            setBook(true);
        }

      
    },[selectedDate]);
    function typeBooking(){
        return (
            <View style={{ flexDirection: 'row',backgroundColor:'white', height:60, marginTop:10, paddingLeft:10, alignItems:'center',borderBottomWidth:1, borderBottomColor:'#eee'}}>
           
 
           <MaterialCommunityIcons name="video-plus-outline" size={36} color="#ccccff" style={{width:40,height:40}} />
                 <Text style={[styles.textStyle,{fontWeight:'bold',fontSize:16, color:'#2F4F4F', paddingLeft:10, marginRight:10}]}>{"Consultation"}</Text>
            

        </View>
        )
 
    }
    function updateAppointmentConfirm(){
        const url = require('../../../assets/url.json');
        
        const time=selectedSlot.includes('AM')? selectedSlot.replace(' AM', ''):selectedSlot.replace(' PM', '');
        //const formatedtime= (date + ' '+ time).replaceAll('-','/');
        const formatteddate= type === 'CONSULTATION' ?(selectedDate +' ' +time).replace('-','/').replace('-','/') : selectedDate
        const data={
            "slotTime" : formatteddate
        };
        dispatch(setStateId(1));
        const urlformatted=url.commonurl+loginid+'/order/'+selectedOrderId+'/update';
        setLoading(true);
        axiosInstance.post(urlformatted,data).then(response => {
         if(response.status === 200)
         {
            dispatch(setUpdate(false));
            setUpdateStatus(true);
            setLoading(false);
            //navigation.navigate('BookingList')
            //setUpdateModalVisible(!updatemodalVisible);
            // for(let i=0;i< appointmentInfor.length;i++ ){
            //     if(appointmentInfor.orderId === selectedOrderId){
            //         appointmentInfor.slot = formatteddate;
            //     }
            // }
          //  setAppointments(appointmentInfor)
         }
   
        }).catch(error =>{
            setLoading(false);
            console.log(error);
        })

      }
    function bookselectedslot(){
        if(update === true){
            updateAppointmentConfirm();

        }else{
            dispatch(setSelectselectedSlot(selectedSlot));
            dispatch(setSelectselectedDate(selectedDate));
           navigation.navigate('AppointmentBooking')
        }

    }
    function statusInformation(){
        return(
            
            <View style={{alignItems:'center', justifyContent: 'space-between', borderTopWidth:1, borderColor:'#eee'}}>
                     <Text style={[stylessheet.textformat, stylessheet.textColor, stylessheet.headerfontsize]}>{'Successfully updated the slot.'}</Text>
            </View>
        )
    }
    function doctorInfo() {
        return (
            <View style={{ flexDirection: 'row', backgroundColor:'white', marginTop:10, paddingLeft:10, alignItems:'center', height:70, borderBottomWidth:1, borderBottomColor:'#eee'}}>
                {/* <View style={styles.doctorImageContainerTimeslotStyle}>
                    <Avatar source={{ uri: image}} style={{height: 60, width: 60, borderRadius: 75.0,
                                    overflow: 'hidden'}} rounded />

                </View> */}
                <Ionicons name="md-person-circle-sharp" size={50} color="#2F4F4F"  />

                <Text style={[styles.textStyle,styles.textcolor,{fontWeight:'bold', fontSize:20,textTransform: 'uppercase', paddingLeft:10} ]}>{name}</Text>
            </View>
        )
    }

    function slotsInfo({ image, data }) {
        
        return <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            marginTop:10
        }}>
          {
             image === "sunrise" ? <Feather name={image} size={24} color="#2F4F4F" />:<Fontisto name={image} size={24} color="#2F4F4F" />
          }
          
            <Text style={{  marginLeft: 10,fontSize: 18,color:"#2F4F4F",fontWeight:'bold' }}>{data.length} Slots</Text>
        </View>
    }

    function slotsTime({ slots, time }) {

        const renderItem = ({ item }) => {
            if(platformtype === true)
            {
                return (
                    <TouchableOpacity onPress={() => {
                        setSelectedSlot(`${item} ${time}`)
                        setBook(true)
                    }}>
                        <View style={{
                            backgroundColor: selectedSlot == `${item} ${time}` ? '#2F4F4F': 'white',
                            borderColor: selectedSlot == `${item} ${time}` ? '#2F4F4F' : '#CDCDCD',
                            ...styles.slotContainerStyle,
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
                )
            }else{
                return (
                    // <View style={{borderColor:'#2F4F4F',backgroundColor:'#2F4F4F', borderWidth:1, borderRadius:10}}>
                    <TouchableOpacity onPress={() => {
                        setSelectedSlot(`${item} ${time}`)
                        setBook(true)
                    }}>
                        <View style={{
                            backgroundColor: selectedSlot == `${item} ${time}` ? '#2F4F4F': 'white',
                            borderColor: selectedSlot == `${item} ${time}` ? '#2F4F4F' : '#CDCDCD',
                            alignItems: 'center',borderRadius: 10,alignItems: 'center',marginBottom: 12,justifyContent: 'center',borderWidth: 1.0,marginRight: 12,height: 45.0,width: 100.0
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
                    // </View>

                )
            }

        }

        if(platformtype === true){
            return (
                <View>
                    <FlatList
                        key={'_'}
                        data={slots}
                        keyExtractor={(index) => `${index}`}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        numColumns={3}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    />
                </View>
            )
        }
        else{
            return (
                <View>
                    <FlatList
                        key={'#'}
                        data={slots}
                        keyExtractor={(index) => `${index}`}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        numColumns={4}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    />
                </View>
            )
        }
    }

    const renderItem = ({ item }) => {

            return (
                <TouchableOpacity onPress={() => {
                    setSelectedSlot(`${item} PM`)
                    setBook(true)
                }} >
                    <View style={{
                        backgroundColor: selectedSlot == `${item} PM` ? '#2F4F4F' : 'white',
                        borderColor: selectedSlot == `${item} PM` ? '#2F4F4F' : '#CDCDCD',
                        alignItems: 'center',borderRadius: 10,alignItems: 'center',marginBottom: 12,justifyContent: 'center',borderWidth: 1.0,marginRight: 12,height: 45.0,width: 100.0
                    }}>
                        <Text style={
                            (selectedSlot == `${item} PM`) ?
                                { color: 'white', fontSize: 16 }
                                :
                                { color: '#2F4F4F', fontSize: 16 }}
                        >{item} PM</Text>
                    </View>
                </TouchableOpacity>
            )


    }

    function bookingInfo() {
        return (
            book ?
            <View style={{  flexDirection:platformtype === true? 'column':'row',alignItems:'center', justifyContent: 'space-between', borderTopWidth:1, borderColor:'#eee'}}>
                <View style={{width:platformtype === true?10: width/1.5}}>

                </View>
                <View style={{width:300, marginLeft:20}}>
                <TouchableOpacity onPress={() => bookselectedslot()} style={[stylessheet.buttonstylecss]}>
                                            <Text style={{color:'#FFFFFF'}}>
                                               {update === true ?'Update':'Continue'}
                                            </Text>
                                {/* <View style={[styles.bookButtonStyle,{backgroundColor:'#333399'}]}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>Book</Text>
                                </View> */}
                            </TouchableOpacity>
                </View>
           </View>
           : <View></View>
          
                
        )
    }

    const datesBlacklistFunc = date => {
        return date.isoWeekday() === 7;
    }
    function setselecteddatefromcalendar(date)
    {

      //datesBlacklist="";
      setSelectedDay(date.toISOString().slice(0,10))
      setBook(true);
    }
    // let datesWhitelist = [{
    //     start: moment(),
    //     end: moment().add(3, 'days')  // total 4 days enabled
    //   }];
     // 1 day disabled
     const today = moment().format('YYYY-MM-DD');
    function calander() {
        return (
            <View>
                <View>
                    <CalendarStrip
                        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                        highlightDateContainerStyle={{
                            backgroundColor: "#6979F8",
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom:10,
                            height: 50,
                            width: 50,
                            marginTop:10
                        }}
                        dateNumberStyle={{ color: 'black', fontSize: 17.0 }}
                        dateNameStyle={{ color: 'black', fontSize: 15.0 }}
                        highlightDateNameStyle={{  color: 'white', fontSize: 15.0 }}
                        highlightDateNumberStyle={{ color: 'white', fontSize: 17.0 }}
                        //datesBlacklist={datesBlacklistFunc}
                        disabledDateOpacity={0.6}
                        disabledDateNameStyle={{ color: '#6979F8', fontSize: 15.0 }}
                        disabledDateNumberStyle={{ color: '#6979F8', fontSize: 17.0, }}
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

    function divider() {
        return (
            <View style={styles.dividerStyle}>
            </View>
        )
    }

    if(platformtype){
        return (
            <View style={{ flex: 1, backgroundColor: 'white', marginLeft:10, marginRight:10,backgroundColor:'#F5F5F5', marginTop:10 }}>
                <Spinner
                visible={loading}
                textStyle={styles.spinnerTextStyle}
                />
                <StatusBar />
                {
    
                    updatestatus != true?<View style={{ flex: 1 ,backgroundColor:"white"}}>
                        {update != true? doctorInfo():<></>}
                        {typeBooking()}
                        {calander()}
                        {divider()}
                        
                       {type === 'CONSULTATION'?
                                               <FlatList
                                               ListHeaderComponent={
                                                   <>
                                                       {slotsInfo({ image:"sunrise", data: morningSlots })}
                                                       {slotsTime({ slots: morningSlots, time: 'AM' })}
                                                       {slotsInfo({image:"day-sunny",  data: afternoonSlots })}
                                                   </>
                                               }
                                               key={"--"}
                                               data={afternoonSlots}
                                               renderItem={renderItem}
                                               keyExtractor={(index) => `${index}`}
                                               numColumns={numcolunmslist}
                                               ListFooterComponent={
                                                   <>
                                                       {slotsInfo({ image:"night-clear",data: eveningSlots })}
                                                       {slotsTime({ slots: eveningSlots, time: 'PM' })}
                                                   </>
                                               }
                                               contentContainerStyle={{
                                                   paddingHorizontal: 10,
                                                   paddingBottom: book ? 10 * 8.0 : 10 * 2.0
                                               }}
                                           />:<></>
                       }

                        {bookingInfo()}
                    </View>:<View style={{alignItems:'center', justifyContent: 'space-between', borderTopWidth:1, borderColor:'#eee', backgroundColor:'white', height:'20%', marginTop:20}}>
                        <Text style={[stylessheet.textformat, stylessheet.textColor, stylessheet.headerfontsize, {fontSize:30,fontWeight:'bold', paddingTop:30, lineHeight:30}]}>
                            {orderStatus === 'CANCELLED' ? '  Booking was already cancelled. Please select the order which is not cancelled. ':'Successfully updated the slot.'}
                           
                        </Text>
                    </View>
                }
    
            </View>)
    }
    else{
        return (
            <View style={{ flex: 1, backgroundColor: 'white', marginLeft:10, marginRight:10, backgroundColor:'rgb(214, 229, 243)', marginBottom:20 }}>
                <StatusBar backgroundColor="rgb(214, 229, 243)" />
                {
    
                    <View style={{ flex: 1 ,backgroundColor:"white"}}>
                        {doctorInfo()}
                        {typeBooking()}
                        {calander()}
                        {divider()}
                        
                    
                        <FlatList
                            ListHeaderComponent={
                                <>
                                    {slotsInfo({ image:"sunrise", data: morningSlots })}
                                    {slotsTime({ slots: morningSlots, time: 'AM' })}
                                    {slotsInfo({image:"day-sunny",  data: afternoonSlots })}
                                </>
                            }
                            key={"##"}
                            data={afternoonSlots}
                            renderItem={renderItem}
                            keyExtractor={(index) => `${index}`}
                            numColumns={4}
                            ListFooterComponent={
                                <>
                                    {slotsInfo({ image:"night-clear",data: eveningSlots })}
                                    {slotsTime({ slots: eveningSlots, time: 'PM' })}
                                </>
                            }
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                paddingBottom: book ? 10 * 8.0 : 10 * 2.0
                            }}
                        />
                        {bookingInfo()}
                    </View>
                }
    
            </View>)
    }

}

TimeSlots.navigationOptions = {
    title: 'Booking Slots',
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
    },
    buttonstylecss:{
        backgroundColor:'#316BBE',
        alignItems:'center',
        borderRadius:15, 
        height:50, 
        marginTop:10,
        alignItems:'center',
        paddingTop:12,
        paddingLeft:10,
        paddingRight:10,
        marginBottom:10
      }
});


export default TimeSlots;