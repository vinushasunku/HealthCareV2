import React from "react";
import { ListItem,Avatar } from "react-native-elements";
import { styles } from "../constants/styles";
import { Text, View, TouchableOpacity, StatusBar,Pressable, TextInput, Image, FlatList, Platform,StyleSheet, Dimensions ,ScrollView} from "react-native";
const { width,height } = Dimensions.get('screen');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import AntDesign  from 'react-native-vector-icons/AntDesign'; 
import axiosInstance from '../../services/APIService';
import Modal from "react-native-modal";
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import {setorderId } from "../redux/slices/login";
import Spinner from 'react-native-loading-spinner-overlay';
const AppointmentBooking = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const name = useAppSelector(state => state.loginId.doctorName);
    const experience = useAppSelector(state => state.loginId.experience);
    const slot=useAppSelector(state => state.loginId.selectedSlot);
    const date = useAppSelector(state => state.loginId.selectedDate);
    const doctorId = useAppSelector(state => state.loginId.doctorId);
    const loginid = useAppSelector(state => state.loginId.loginId);

    const dispatch = useAppDispatch();
    const fee = useAppSelector(state => state.loginId.fee);
    const [book, setBook] = React.useState(false);
    //const [consultationfee, setConsultationBook] = React.useState(500);
    const [bookingfee, setBookingBook] = React.useState(0);
    const [platformtype, setplatformtype] = React.useState(false);
    const [selectedmembername, setselelctedmember] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [familyMembersdetail, setFamilyMembers] = React.useState([]);
    const [selectmembercolor, setselectmembercolor] = React.useState('');
    const [selectmemberid, setselectmemberid] = React.useState('');
    const [confirmbook, setconfirmBook] = React.useState(false);
    function changecolor(id, fn,mn,ln)
    {
       
        if(selectmembercolor === id){
            setselectmembercolor('')
            setselelctedmember('')
        }
        else{
            setselectmembercolor(id)
            const fullname=fn +' '+ ln;
            setselelctedmember(fullname)
            setselectmemberid(id)
            console.log(selectedmembername)
        }

        if(selectedmembername != ''){
            setconfirmBook(true)
        }

    }
    function selectedFamilyMember(){
        console.log(selectedmembername)
        setModalVisible(!modalVisible)
        setconfirmBook(true)
    }
    React.useEffect(() => {
        console.log(date)
        if(Platform.OS === 'ios' || Platform.OS === 'android' )
        {
            setplatformtype(true)
        }
        const url = require('../../../assets/url.json');
        axiosInstance.get(url.getManageAccount+loginid).then(response => {
            if( response != null &&response.data != null && response.data['familyMembers'].length >0)
            {              
                setFamilyMembers(response.data['familyMembers']);
                response.data['familyMembers'].map((item,index)=>{

                    //member.add({label:item.firstName +item.lastName,value:item.memberId})
                    //setEmployees(current => [...current, {id: 3, name: 'Carl'}]);
                    
                })
              
                console.log(familyMembersdetail);
            }
        }).catch(error =>{
            console.log(error);
        })
    },[1])

    function familyMemberList(){
        return(
          familyMembersdetail.length >0 ? familyMembersdetail.map((item,index)=>(
            //    <View key={index} style={{flexDirection:'row',marginTop:10,alignItems:'center' }}>
                    <TouchableOpacity key={index}  style={{backgroundColor:selectmembercolor === item.memberId?'#ccccff':'#eee', marginTop:10,width:'100%', height:40,paddingHorizontal:5*10, paddingTop:10}}
                        onPress={()=>changecolor(item.memberId,item.firstName,item.middleName ,item.lastName )}
                        >
                            <Text style={{ textTransform:'uppercase',color:'#333333', fontWeight:'600',fontSize:16 }}>{item.firstName +" "+(item.middleName != null ?item.middleName :"")+" "+ item.lastName }</Text>  
                    </TouchableOpacity>      
                   
                       
            //    </View>
              
          )) : <View></View>
        )
      }
    function doctorInfo() {

        return (
            <View>  
          {/* <View> */}
                  <ListItem bottomDivider style={{ width: width, marginBottom:10}}>
                        {/* <View style={styles.doctorImageContainerStyle}>
                            <Avatar source={{ uri: image}} style={{height:110 , width: 110, borderRadius: 75.0,
                                            overflow: 'hidden'}} rounded />

                        </View> */}
                      <Ionicons name="md-person-circle-sharp" size={50} color="#2F4F4F" style={{ paddingLeft:10, paddingRight:10}} />
                      <ListItem.Content>
                      <ListItem.Title style={[stylessheet.textformat,stylessheet.textColor,stylessheet.headerfontsize,{ textTransform:'uppercase'}]}>{name}</ListItem.Title>
                      <View style={[{color:'#eee',borderColor:"#eee", borderWidth:1, width:width-200, paddingRight:10, marginTop:5, marginBottom:5}]}>
                      </View>
                      {/* <ListItem.Subtitle style={{fontWeight:'300', paddingTop:5, fontSize:10}}>{doctorDetail.title}</ListItem.Subtitle> */}
                      <ListItem.Subtitle style={[stylessheet.textformat,stylessheet.textColor]}>{experience} yrs of experience. overall</ListItem.Subtitle>
                      {/* <ListItem.Experience>{props.experience}</ListItem.Experience> */}
                      </ListItem.Content>                    
                  </ListItem>
  
          {/* </View> */}
      </View>
        )
    }
    function typeBooking(){
        return (
            <View style={{ flexDirection: 'row', width:width-50,height:80,backgroundColor:"#FFFFFF",alignItems:'center', paddingLeft:10, borderBottomWidth:1, borderBottomColor:'#eee' }}>
  
                 <MaterialCommunityIcons name="video-plus-outline" size={36} color="#ccccff" style={{width:'10%',height:40}} />
                 <Text style={[stylessheet.textformat,stylessheet.textColor,{fontWeight:'bold', paddingLeft:10, marginRight:10}]}>{"Consultation"}</Text>
                 <MaterialIcons name="access-time" size={18} color="#ccccff"  />
                  <Text style={[stylessheet.textformat,stylessheet.textColor,{  marginLeft: 10 }]}>{date +' ' +slot}</Text>

            </View>
        )
 
    }

    function selectfamilyMember(){
        return (

                  <View style={{height:'10%', borderBottomWidth:1, borderColor:'#eee'}}>
                    <View style={{ flexDirection: 'row', backgroundColor:'white', paddingLeft:15, flexWrap:'wrap', paddingTop:15 }}>
                    <Text style={[styles.label, stylessheet.textColor, {  marginRight:10, fontSize:15, fontWeight:'bold' }]}>
                     {'Family Member:'}
                    </Text>
                    <View style={{ paddingRight:5}}>
                        <Text style={[stylessheet.textformat,stylessheet.textcolor,{textTransform:'uppercase',textDecorationLine:'underline'}]} >{selectedmembername}</Text>
                    </View>
                   
                    <TouchableOpacity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20, width:'20%',  marginLeft:10, paddingBottom:5}}
                                 onPress={()=>setModalVisible(!modalVisible)}
                                >
        
                                            <Text style={{alignItems:'center', paddingTop:5,color:'#ffff' }}>
                                            {"Select"}
                                            </Text>
        
                    </TouchableOpacity>

                    
                 </View>
                 </View>
            
        )
 
    }
    function BookingSlot(){
        const url = require('../../../assets/url.json');
        const time=slot.includes('AM')? slot.replace(' AM', ''):slot.replace(' PM', '');
        const formatedtime= (date + ' '+ time).replace('-','/').replace('-','/');
        const encodeddate=encodeURIComponent(formatedtime);
        const data={
            "orderType" : "CONSULTATION",
            "memberId" : selectmemberid,
            "itemIds" : [doctorId],
            "slotTime" : formatedtime
        };
        setLoading(true);
        axiosInstance.post(url.commonurl+loginid+'/initiateOrder',data).then(response => {
            console.log('responselogindetail',response.data);
            dispatch(setorderId(response.data))
            navigation.navigate('Payment');
            setLoading(false);
        }).catch(error =>{
            setLoading(false);
            console.log(error);
        })
    }
    function appointmentTimings()
    {
        if(platformtype){
            return (
                <View style={[styles.dateAndTimeContainerStyle, {backgroundColor:'white', marginTop:10, height:50}]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name="calendar-alt" size={16} color="#2F4F4F" />
                        <Text style={{  marginLeft:15, color:'#2F4F4F'}}>28-June</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="access-time" size={18} color="#2F4F4F" />
                        <Text style={{  marginLeft: 10 ,color:'#2F4F4F'}}>{date +' ' +slot}</Text>
                    </View>
                </View>
            )
        }else{
            return (
            <View style={[styles.dateAndTimeContainerStyle, {backgroundColor:'white', marginTop:10, height:50}]}>
            <View style={{ flexDirection: 'row'}}>
                <FontAwesome5 name="calendar-alt" size={16} color="#2F4F4F" />
                <Text style={{  marginLeft:15, color:'#2F4F4F'}}>28-June</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="access-time" size={18} color="#2F4F4F" />
                <Text style={{  marginLeft: 10 ,color:'#2F4F4F'}}>{date +' ' +slot}</Text>
            </View>
        </View>
            )
        }

    }
    function billingDetail(){
        return (
            <View style={{backgroundColor:'white',marginTop:10,height:'30%',}}>
               
                <View style={{paddingVertical: 10, paddingLeft:10}}>
                        <Text style={[stylessheet.textformat,stylessheet.textColor,stylessheet.headerfontsize,{   paddingTop:10}]}> {"Billing Details"}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width:width/1.7}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor,{  marginLeft:15}]}>{"Consultation Fee"}</Text>
                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor]}>{'Rs '+fee}</Text>
                        </View>
                      
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop:10}}>
                        <View style={{width:width/1.7}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor,{  marginLeft:15}]}>{"Booking Fee"}</Text>
                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor]}>{bookingfee ===0? 'Free':bookingfee}</Text>
                        </View>
                        
                        
                </View>
                <View style={{paddingVertical: 10, paddingLeft:10}}>
                        <Text style={[stylessheet.textformat,{ color:'green' }]}> {"We care for you & do free booking"}</Text>
                </View>
                <View style={{paddingLeft:10,borderBottomWidth:1, borderBottomColor:"#eee"}}>
                       
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop:10}}>
                        <View style={{width:width/1.7}}>
                            <Text style={[stylessheet.textformat,stylessheet.textColor,{  marginLeft:15}]}>{"Billing"}</Text>
                        </View>
                        <View>
                            <Text style={[stylessheet.textformat,stylessheet.textColor]}>{'Rs '+fee}</Text>
                        </View>
                </View>
            </View>

        )
 
    }
    function divider() {
        return (
            <View style={styles.dividerStyle}>
            </View>
        )
    }
    function promises(){
        return (
            <View style={{backgroundColor:'white',marginTop:10,height:180,borderBottomWidth:1, borderBottomColor:"#ccccff"}}>
               
                <View style={{paddingVertical: 10, paddingLeft:10, height:50, backgroundColor:"#ccccff", flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name="checkcircleo" size={24} color="#2F4F4F" />
                        <Text style={[stylessheet.textcolor,stylessheet.textformat,stylessheet.headerfontsize]}> {" IYU Promise"}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop:10}}>
                        <AntDesign name="check" size={24} style={{paddingLeft:10}}color="#2F4F4F" />
                        <View style={{width:width/1.1, paddingRight:30}}>

                        <Text style={[stylessheet.textcolor,stylessheet.textformat,{paddingLeft:10, flexWrap:'wrap' }]}>{'We assure we will connect you to the doctor. If your consultation does not happen for unforeseen reasons, we will give you 100% money back.'}</Text>

                        </View>

                </View>
            </View>

        )
 
    }
    return (
        <View  style={{ flex: 1, }} backgroundColor="#F5F5F5">
            <Spinner 
                visible={loading}
                textStyle={styles.spinnerTextStyle}
                />
        <View style={{ flex: 1, backgroundColor: 'white',marginLeft:10, marginRight:10 }}>
            <StatusBar backgroundColor="#6979F8" />
            {
                <ScrollView scrollEventThrottle={16}>
                    <View style={{ flex: 1 ,}}>
                        {doctorInfo()}
                        {typeBooking()}
                        {selectfamilyMember()}
                        {/* {appointmentTimings()} */}
                        {billingDetail()}
                        {promises()}
                    </View>

                </ScrollView>

            }
            <View style={{ flex: 1,justifyContent: "center",alignItems: "center",marginTop: 22}}>
                
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
                        <View style={[styles.modalView,{height:400, width:width/1.3, backgroundColor:'#F5F5F5'}]}>
                            <View style={{borderBottomColor:'#B3b3B3', borderBottomWidth:1,width:300, alignItems:'center' }}>
                                <Text style={{paddingBottom:20, fontSize:16, fontWeight:'bold'}}> {"Select Family Member"}</Text>
                            </View>
    
                            {/* <View style={{backgroundColor:'#eee', height:40, borderBottomWidth:1, borderBottomColor:'black'}}>

                            </View> */}
                                <ScrollView style={{height:400}}>
                                        {
                                            familyMemberList()
                                        }
                                </ScrollView>
                            

                            <View style={{paddingTop:20}}>
                                <Pressable
                                style={[styles.buttonClose, {width:200, height:40,paddingTop:10}]}
                                onPress={() => selectedFamilyMember()}
                                >
                                <Text style={[styles.textStyle]}>Ok</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </Modal>

            </View>
            {
                confirmbook === true?              <View style={{marginBottom:20, marginTop:10}}>
                <View style={{height:50,backgroundColor:"white"}}>
                <View style={styles.bookContainerStyle}>

                                    <View>
                                        <Text style={[stylessheet.textformat,stylessheet.textColor,{paddingLeft:20, fontWeight:'bold'}]}>{'Rs '+fee}</Text>
                                    </View>

                            <TouchableOpacity onPress={() => BookingSlot()}>
                                <View style={[styles.buttonBookingStyle, {backgroundColor:'#337ab7'}]}>
                                    <Text style={[stylessheet.textformat,{  color: '#FFFFFF' }]}>{'Confirm Booking'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                </View>
              </View>:<View></View>
            }

        </View>
        </View>
        )
}

AppointmentBooking.navigationOptions = {
    title: "Booking Information",
    headerTintColor: 'black',
    headerTitleAlign: 'center',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'#F5F5F5'
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
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        borderWidth:2
    },
});

export default AppointmentBooking;