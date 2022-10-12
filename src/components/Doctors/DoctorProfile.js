import React from "react";
import { ListItem,Avatar } from "react-native-elements";
import CalendarStrip from 'react-native-calendar-strip';
import { styles } from "../constants/styles";
import { Text, View, TouchableOpacity, StatusBar, Image,Platform, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('screen');
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Animated from "react-native-reanimated";
import { LogBox } from "react-native";
import Feather  from 'react-native-vector-icons/Feather'; 
import Fontisto  from 'react-native-vector-icons/Fontisto'; 
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import moment from 'moment'; 
import axiosInstance from "../../services/APIService";

import {useAppDispatch,useAppSelector} from '../redux/hooks'
import { setDoctorExperience, setSelectDoctorName, setfee, setSelectselectedDate, setSelectselectedSlot } from "../redux/slices/login";

const DoctorProfile = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const startLoading = () => {
        setLoading(!loading);
      };
    const type = useAppSelector(state => state.loginId.type);
    //const rating = navigation.getParam('rating');
    // const id = useAppSelector(state => state.loginid.doctorId);
     const dispatch = useAppDispatch();
    const loginid =useAppSelector(state => state.loginId.loginId);
    const  profileImage=require('../../../assets/doctorprofile.jpg');
    const id = useAppSelector(state => state.loginId.doctorId);
    const days=["Monday","Tue","Wed","Thu","Fri","Sat","sun"];
    const timing=["8:00 -4:00pm"];
    const [doctorAccountInfo, setDoctorAccount] = React.useState([]);
    const [specializationList, setspecializationList] = React.useState();
    const [qualificationList, setqualificationList] = React.useState();
    const [languageList, setlanguageList] = React.useState();
    const [doctorName, setDoctorName] = React.useState();
    const [platformtype, setplatformtype] = React.useState(false);

    const [morningSlots, setmorningSlot] = React.useState([]);
    const [afternoonSlots, setafternoonSlot] = React.useState([]);
    const [eveningSlots, seteveningSlots] = React.useState([]);
    const [selectedSlot, setSelectedSlot] = React.useState('');
    const [selectedDate, setSelectedDay] = React.useState(moment().format('YYYY/MM/DD'));
    const [numcolunmslist, setcolunmslist] = React.useState(3);
    //const [selectedDate, markedDates] = React.useState('');
    const [book, setBook] = React.useState(false);
    
    let datesBlacklist = moment() ;
    React.useEffect(() => {
        if(Platform.OS === 'ios' || Platform.OS === 'android' )
        {
            setplatformtype(true)
        }
        const url = require('../../../assets/url.json');
        console.log(url.doctorAccountUrl+id)
        startLoading();
        axiosInstance.get(url.doctorAccountUrl+id).then(response => {
         if( response != null &&response.data != null && response.data != undefined)
            {
                setLoading(false);
                console.log(response.data)
                setDoctorAccount(response.data);
                setspecializationList(response.data.specialities);
                setlanguageList(response.data.languages);
                setqualificationList(response.data.qualification.split(','));
                setDoctorName(response.data.firstName + ' '+(response.data.middleName != null ?response.data.middleName :"")+response.data.lastName)
                console.log(doctorAccountInfo)
            }
        }).catch(error =>{
            console.log(error);
            setLoading(false);
        })
        //setLoading(true);

        getslotsfromapi();
    },[]);

    function getslotsfromapi(){
        const url = require('../../../assets/url.json');
        const time= new Date().toISOString().slice(0,10);
        const formatedtime=(time.replace('-','%2F')).replace('-','%2F');
        console.log(url.timeslots+loginid+'/slots/'+id+'/'+formatedtime)
        setLoading(true);
        axiosInstance.get(url.timeslots+loginid+'/slots/'+id+'/'+formatedtime).then(response => {
            if( response != null &&response.data != null && response.data.length >0)
            {
                setLoading(false);
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
                //setSelectedDay(time);
                setmorningSlot(morningdata);
                setafternoonSlot(afternoondata);
                seteveningSlots(eveningdata);
            }
        }).catch(error =>{
            console.log(error);
            setLoading(false);
        })
    }
    function bookselectedslot(){
        dispatch(setSelectDoctorName(doctorName));
        dispatch(setDoctorExperience(new Date().getFullYear() -doctorAccountInfo.practicingFrom));
        dispatch(setSelectselectedSlot(selectedSlot));
        //dispatch(setSelectselectedSlot(selectedSlot));
        dispatch(setSelectselectedDate(selectedDate));
        dispatch(setfee(doctorAccountInfo.consultationFee));

        navigation.navigate('AppointmentBooking')
    }

    function doctorInfo() {

        return (
            doctorAccountInfo != undefined ?
            <View>  
                <View>
                        <ListItem bottomDivider style={{ width: width}}>
                                <View style={styles.doctorImageContainerStyle}>
                                    <Avatar source={profileImage} style={{height:110 , width: 110, borderRadius: 75.0,overflow: 'hidden'}} rounded />
                                {/* <Avatar rounded source={profileImage}  style={{height:100 ,borderRadius:100/2, width: 100,paddingLeft:20,paddingTop:10,  marginRight:20,borderWidth:1, borderColor:"#eee" }}  /> */}

                                </View>
                            {/* <Ionicons name="person-circle-outline" size={100} color="#337ab7" /> */}
                            <ListItem.Content>
                            <ListItem.Title style={[stylessheet.textcolor,stylessheet.textformat,stylessheet.headerFontSize,{fontWeight:'bold', textTransform: 'uppercase'}]}>{doctorName}
                            </ListItem.Title>
                            <View style={[{borderWidth:1, width:platformtype === true? width-200 : width/4, borderColor:"#eee", marginTop:5}]}>
                            </View>
                            <ListItem.Subtitle style={[stylessheet.textcolor,stylessheet.textformat,{ paddingTop:5}]}>{'Exp : '}{new Date().getFullYear() -doctorAccountInfo.practicingFrom}</ListItem.Subtitle>
                            <ListItem.Subtitle style={[stylessheet.textcolor,stylessheet.textformat,{ paddingTop:5}]}> { "Fee : "+doctorAccountInfo.consultationFee}
                            </ListItem.Subtitle>
                            </ListItem.Content>   
                                             
                        </ListItem>
        
                        {/* <ListItem bottomDivider style={{ width: width}}>
                            <ListItem.Content>

                                <View style={{flexDirection:"row" ,backgroundColor:"#ccccff", width:width-30,height:55, borderRadius:15, alignItems:'center',}}>
                                        <Text style={[styles.textcolor,{paddingLeft:10}]}>
                                            Vedio Consultation
                                        </Text>
                                        <View style={{flexDirection:'row', alignItems:'center', paddingLeft:150}}>
                                        <FontAwesome name="rupee" size={24} color="#2F4F4F" />
                                        <Text style={[styles.textcolor]}>
                                            { " "+doctorAccountInfo.consultationFee}
                                        </Text>
                                        </View>
                                     
                                </View>
                                
                            </ListItem.Content>
                            
                        </ListItem> */}
        
                </View>
            </View>
            :<View></View>
        )
    }
     
    function timings(){
        return(
            days.map((item,index)=>( 
                <View key={index} style={styles.hours}>
                    <Text style={[styles.textStyle,styles.textcolor]}>{item}</Text>
                    {
                        doctorAccountInfo != undefined ? <Text style={[styles.textStyle,stylessheet.textColor, stylessheet.textformat]}>{doctorAccountInfo.consultationsStartTime + "AM -" + doctorAccountInfo.consultationsEndTime +"PM"}</Text>  :<Text></Text>
                    }
      
                </View>
            ))
        )   
    }

    function specialization(){
        return(
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>{
            specializationList != undefined ?    
            specializationList.map((item,index)=>( 
                <View key={index} style={[styles.hours,styles.textcolor]}>
                    {/* <Ionicons name="checkmark-circle-outline" size={45} color="#2F4F4F"  />  */}
                    <Text style={[styles.textStyleDoctorprofile,stylessheet.textColor, stylessheet.textformat]}>{item}</Text>  
                </View>
            )):<View></View>
            }
            </View>
        )   
    }

    function language(){
        return(
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>{
            languageList  != undefined?
            languageList.map((item,index)=>( 
                <View key={index} style={styles.qualification}>
                    {/* <Ionicons name="checkmark-circle-outline" size={45} color="#2F4F4F"  />  */}
                    <Text style={[styles.textStyleDoctorprofile,stylessheet.textColor, stylessheet.textformat]}>{item}</Text>  
                </View>
            )):<View></View>
            }
            </View> 
        )   
    }
    function qualification(){
        return(
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {
            qualificationList != undefined?
            qualificationList.map((item,index)=>( 
                <View key={index} style={styles.qualification}>
                    {/* <Ionicons name="checkmark-circle-outline" size={45} color="#2F4F4F"  />  */}
                    <Text style={[styles.textStyleDoctorprofile,stylessheet.textColor, stylessheet.textformat]}>{item}</Text>  
                </View>
            )):<View></View>
            }

            </View>
            
        )   
    }

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
           {/* <Fontisto name="blood-test" size={24} color={'#2F4F4F'}/>  */}
            <Text style={[stylessheet.textColor, stylessheet.textformat,stylessheet.headerfontsize,{  marginLeft: 10,fontWeight:'bold' }]}>{data.length} Slots</Text>
        </View>
    }
    function setselecteddatefromcalendar(date)
    {
        console.log(date.toISOString().slice(0,10))
      //datesBlacklist="";
      setSelectedDay(date.toISOString().slice(0,10))
      getslotsfromapi();
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
                                                        backgroundColor: selectedSlot == `${item} ${time}` ? '#ccccff': 'white',
                                                        borderColor: selectedSlot == `${item} ${time}` ? '#ccccff' : '#CDCDCD',
                                                        alignItems: 'center',borderRadius: 10, alignItems: 'center',marginBottom: 12,justifyContent: 'center',borderWidth: 1.0,marginRight: 12,height: 45.0,width: 100.0
                                                    }}>
                                                        <Text style={
                                                            (selectedSlot == `${item} ${time}`) ?
                                                                { color: 'white', fontSize: 16.0}
                                                                :
                                                                { color: '#333333', fontSize: 16.0}
                                                        }>
                                                            {item} {time}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity >
                                                ))

                        }
         
                </View>

             
                
         

            )

        // }

        // if(platformtype === true){
        //     return (
        //         <View>
        //             <FlatList
        //                 key={'_'}
        //                 nestedScrollEnabled
        //                 data={slots}
        //                 keyExtractor={(index) => `${index}`}
        //                 renderItem={renderItem}
        //                 scrollEnabled={false}
        //                 numColumns={3}
        //                 contentContainerStyle={{ paddingHorizontal: 20 }}
        //             />
        //         </View>
        //     )
        // }
        // else{
        //     return (
        //         <View>
        //             <FlatList
        //                 key={'#'}
        //                 data={slots}
        //                 keyExtractor={(index) => `${index}`}
        //                 renderItem={renderItem}
        //                 scrollEnabled={false}
        //                 numColumns={4}
        //                 contentContainerStyle={{ paddingHorizontal: 20 }}
        //             />
        //         </View>
        //     )
        // }
    }
    const datesBlacklistFunc = date => {
        return date.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') || date.format('YYYY/MM/DD') > moment(moment().add(7, 'd').format('YYYY/MM/DD')).format('YYYY/MM/DD') ;
    }
   // const today = moment().format('YYYY-MM-DD');
    function calander() {
        return (
            <View>
                <View style={{width: platformtype == true? 370:width/1.5 }}>
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
                        dateNumberStyle={{ color: 'black', fontSize: 12.0 ,lineHeight:22}}
                        dateNameStyle={{ color: 'black', fontSize: 12.0,lineHeight:22 }}
                        highlightDateNameStyle={{  color: 'white', fontSize: 12.0 ,lineHeight:22}}
                        highlightDateNumberStyle={{ color: 'white', fontSize: 12.0 ,lineHeight:22}}
                        datesBlacklist={datesBlacklistFunc}
                        disabledDateOpacity={0.6}
                        disabledDateNameStyle={{ color: '#6979F8', fontSize: 12.0,lineHeight:22 }}
                        disabledDateNumberStyle={{ color: '#6979F8', fontSize: 12.0,lineHeight:22 }}
                        useIsoWeekday={false}
                        scrollable={false}
                        upperCaseDays={false}
                        styleWeekend={false}
                        
                        //datesWhitelist={datesWhitelist}
                        //datesBlacklist={datesBlacklist}
                        onDateSelected={date=>setselecteddatefromcalendar(date)}
                        selectedDate={selectedDate}
                    />
                </View>
            </View>
        );
    }
    // let AnimatedHeaderValue=new Animated.Value(0);
    // const Header_Hight=50;
    // const animatedHeaderBackgroundColor=AnimatedHeaderValue.interpolate({
    //   inputRange:[0,1],
    //   outputRange:[0,120],
    // });
    return (
        <View  style={{ flex: 1, backgroundColor:"#F5F5F5"}}  >
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                //textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
                />
            <StatusBar  backgroundColor="#6979F8" />
            {
                <ScrollView scrollEventThrottle={16}>
                    <View style={{ flex: 1, backgroundColor: 'white', marginLeft:10, marginRight:10, marginBottom:20, marginTop:10 }}>
                    {/* <View style={{ flex: 1 }}> */}
                        {doctorInfo()}
                    <View style={{paddingLeft:15}}>
                    <View>
                        <Text style={[StyleSheet.textformat, stylessheet.textColor, stylessheet.headerfontsize,{ fontWeight:'bold',textAlign:'left', paddingTop:10}]}>Specializations</Text>
                    </View>
                        {specialization()}

                    <View>
                        <Text style={[StyleSheet.textformat, stylessheet.textColor,stylessheet.headerfontsize,{fontWeight:'bold',textAlign:'left', paddingTop:10, }]}>Qualification</Text>
                    </View>
                    {/* <ScrollView horizontal={true}> */}
                        {qualification()}
                    {/* </ScrollView> */}
                    <View>
                        <Text style={[StyleSheet.textformat, stylessheet.textColor,stylessheet.headerfontsize,{fontWeight:'bold',textAlign:'left', paddingTop:10}]}>Language</Text>
                    </View>
                    {/* <ScrollView horizontal={true}> */}
                        {language()}
                    {/* </ScrollView> */}
                    <View>
                        <Text style={[StyleSheet.textformat, stylessheet.textColor,stylessheet.headerfontsize,{fontWeight:'bold',textAlign:'left', paddingTop:10 }]}>Available Slots</Text>
                    </View>
                    {calander()}
                    </View>

                    <View style={styles.dividerStyle}>
                    </View>

                    {slotsInfo({ image:"sunrise", data: morningSlots })}
                    {slotsTime({ slots: morningSlots, time: 'AM' })} 
                    {slotsInfo({image:"day-sunny",  data: afternoonSlots })}
                    {slotsTime({ slots: afternoonSlots, time: 'AM' })}
                    {slotsInfo({ image:"night-clear",data: eveningSlots })}
                    {slotsTime({ slots: eveningSlots, time: 'PM' })}
                    {/* </View> */}
                    

                    </View>


                </ScrollView>
                
            }
                {
                    
                    book?<View style={{ backgroundColor: 'white', flexDirection:platformtype === true? 'column':'row',alignItems:'center', justifyContent: 'space-between', borderTopWidth:1, borderColor:'#eee'}}>
                        <View style={{width:platformtype === true?10: width-400}}>

                        </View>
                        <View style={{alignItems:'center' , flexDirection:'row'}}>
                            <Text style={[stylessheet.textformat, {marginRight:10}]}>{selectedDate +' '+ selectedSlot}</Text>
                            <TouchableOpacity  onPress={() =>bookselectedslot() } style={[stylessheet.buttonstylecss]}>

                                        <Text style={[stylessheet.textformat,{color:'#ffff'}]}>
                                            Book Consultation
                                        </Text>


                            </TouchableOpacity>
                        </View>
                      
                    </View>:<View></View>
                }
        </View>

        )
}

DoctorProfile.navigationOptions = {
    title: 'Doctor Profile',
    headerTintColor: 'black',
    headerTitleAlign: 'center',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        backgroundColor:'rgb(214, 229, 243)',
        
    }
}
const stylessheet = StyleSheet.create({
    circleStyle: {
        height: 50.0,
        width: 50.0,
        backgroundColor: '#F5F5F5',
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:5
    },
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


export default DoctorProfile;