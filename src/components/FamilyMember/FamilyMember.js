import React from "react";
import { styles } from "../constants/styles";
import Modal from "react-native-modal";
//import { ScrollView } from "react-native-gesture-handler";
// import Animated from "react-native-reanimated";
import { Text, View, TouchableOpacity, StatusBar, TextInput, Dimensions,ScrollView,Pressable,Alert, Platform,StyleSheet } from "react-native";
import axiosInstance from "../../services/APIService";
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import moment from 'moment'; 
import {setorderId } from "../redux/slices/login";
import Spinner from 'react-native-loading-spinner-overlay';
import CalendarStrip from 'react-native-calendar-strip';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import {RazorPayPaymentProcess} from '../Payment/RazorPayPaymentProcess';
const { width,height } = Dimensions.get('screen');

const FamilyMember = ({ navigation }) => {
    const [platformtype, setplatformtype] = React.useState(false);
    const labID = useAppSelector(state => state.loginId.labId);
    const loginid =useAppSelector(state => state.loginId.loginId);
    const [selectmembercolor, setselectmembercolor] = React.useState('');
    const [selectmemberid, setselectmemberid] = React.useState('');
    const [selectedmembername, setselelctedmember] = React.useState('');
    const [familyMembersdetail, setFamilyMembers] = React.useState([]);
    const [selectedDate, setSelectedDay] = React.useState(moment().format('YYYY/MM/DD'));
    const [loading, setLoading] = React.useState(false);
    const [selectedStartDate, setselectedStartDate] = React.useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [modalMemberVisible, setModalMemberVisible] = React.useState(false);
    const [modalDateVisible, setModalDateVisible] = React.useState(false);
    const [familymemberdrpdowns, setdropdownlist] = React.useState([]);
    const [value, setselectedFMValue] = React.useState(null);
    const [date, setDate] = React.useState(new Date())
    const [book, setBook] = React.useState(false);
    
    const dispatch = useAppDispatch();
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() + 7);
    let datesBlacklist = moment() ;

    function changecolor(id, fn,mn,ln)
    {
       
        if(selectmembercolor === id){
            setselectmembercolor('')
            setselelctedmember('')
        }
        else{
            setselectmembercolor(id)
            const fullname=fn +' '+ ln;
            setselelctedmember(fullname.toUpperCase())
            setselectmemberid(id)
            console.log(selectedmembername)
        }

        // if(selectedmembername != ''){
        //     setconfirmBook(true)
        // }

    }
    function onDateChange(date)
    {
      const dateFormatted=(date.toISOString().slice(0,10)).replace('-','/').replace('-','/');
      setSelectedDay(dateFormatted)
    }
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
      const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        onDateChange(date);
        hideDatePicker();
      };

      React.useEffect(() => {
        if(Platform.OS === 'ios' || Platform.OS === 'android' )
        {
            setplatformtype(true)
        }
        setBook(false)
        const url = require('../../../assets/url.json');
        setLoading(true);


        axiosInstance.get(url.getManageAccount+loginid).then(response => {
            if( response != null &&response.data != null && response.data['familyMembers'].length >0)
            {    setLoading(false); 
                setFamilyMembers(response.data['familyMembers']);
                for(let i=0;i<=response.data['familyMembers'].length;i++){
                    const data=response.data['familyMembers'][i];
                    const label={label:  "member", value: "name" }
                   // console.log(data["firstName"] +data["lastName"]+ data["memberId"])
                   if(data != null &&(data["memberId"] != undefined || data["memberId"] != null || data["memberId"] != '')){
                    familymemberdrpdowns.push({label: data["firstName"] +' '+data["lastName"]  , value: data["memberId"]})
                   }

                }
            }
        }).catch(error =>{
            setLoading(true); 
            console.log(error);
            
        })
        // settestDetailInfo(data)
     },[book]);
     function setselecteddatefromcalendar(date)
     {
         console.log(date.toISOString().slice(0,10))
       //datesBlacklist="";
       setSelectedDay(date.toISOString().slice(0,10))
     }
    function BookingSlot()
    {
        const url = require('../../../assets/url.json');
        const data={
            "orderType" : "TESTS",
            "memberId" : selectmemberid,
            "itemIds" : [labID],
            "slotTime" : selectedDate
        };
        console.log(data)
        setLoading(true);
        axiosInstance.post(url.commonurl+loginid+'/initiateOrder',data).then(response => {
            console.log('responselogindetail',response.data);
            dispatch(setorderId(response.data))
            setBook(true);
            //navigation.navigate('Payment');
            setLoading(false);
        }).catch(error =>{
            console.log(error);
            setLoading(false);
        })
    }

    const datesBlacklistFunc = date => {
        return date.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') || date.format('YYYY/MM/DD') > moment(moment().add(7, 'd').format('YYYY/MM/DD')).format('YYYY/MM/DD') ;
    }
    const today = moment().format('YYYY-MM-DD');
    function calander() {
        return (
            // <View>
                <View style={{width: platformtype == true? 280:width/1.5 }}>
                    <CalendarStrip
                        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                        highlightDateContainerStyle={{
                            backgroundColor: "#ccccff",
                            alignItems: 'center',
                            justifyContent: 'center',
                            //marginBottom:10,
                            height: 50,
                            width: 30,
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
            // </View>
        );
    }
    function selecteddatedeatil(){
        return(
           <View style={{flexDirection:'row',borderRadius:10, borderWidth:1,borderColor:'#eee', backgroundColor:'white',   height:'50%', paddingBottom:20, paddingLeft:15, alignItems:'center'}}>
            {/* <View style={{flexDirection:'row',paddingTop:30, paddingLeft:15}}> */}
                <View style={{width:width/2, paddingTop:15,}}>
                    <TextInput
                            placeholder="Please select Date"
                            placeholderTextColor={'#D3D3D3'}
                            editable={false}
                            value={selectedDate}
                            style={[styles.textformat,styles.textColor,{  borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F', width:width/2.5,alignItems:'center',textAlign:'center', paddingBottom:10}]}
                            //onChangeText={onChangeField('dob')}
                            //onSubmitEditing={showDatePicker}
                        />
                </View>
                {
                    <DatePicker
                        modal
                        open={isDatePickerVisible}
                        date={date}
                        mode="date"
                        onDateChange={(date)=>onDateChange(date)}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        // maximumDate={new Date()}
                        // minimumDate={lastWeek}
                    />
                }
                <View >
                   <TouchableOpacity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20, width:'150%',  height:30,marginTop:25, marginLeft:10,}}
                                 onPress={()=>setDatePickerVisibility(!isDatePickerVisible)}
                                >
        
                                            <Text style={{alignItems:'center', paddingTop:5,color:'#ffff' }}>
                                            {"Select"}
                                            </Text>
        
                    </TouchableOpacity>
                </View>


                {/* </View> */}
                      
                {/* {
                  <DateTimePickerModal
                    
                  isVisible={isDatePickerVisible}
                  mode="date"
                  //onDateChange={(date)=>onDateChange(date)}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  />
                  } */}
           </View>
        )
   }
   function selectedFamilyMemberdeatil(){
    return(
       <View style={{flexDirection:'row',borderRadius:10, borderWidth:1,borderColor:'#eee', backgroundColor:'white', marginTop:20, height:'50%', paddingBottom:20, paddingLeft:15}}>
        {/* <View style={{flexDirection:'row',paddingTop:30, paddingLeft:15}}> */}
            {/* <View style={{width:width/2, paddingTop:15,}}>
                <TextInput
                        placeholder="Select family member"
                        placeholderTextColor={'#D3D3D3'}
                        editable={false}
                        value={selectedmembername}
                        style={[styles.textformat,styles.textColor,{  borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F', width:width/2.3,alignItems:'center',textAlign:'center', paddingBottom:10,textTransform:'uppercase'}]}
                        //onChangeText={onChangeField('dob')}
                        //onSubmitEditing={showDatePicker}
                    />
            </View>
            <View >
               <TouchableOpacity style={{ backgroundColor:'#337ab7',alignItems:'center', borderRadius:20, width:70, marginTop:25, height:30, marginLeft:10}}
                             onPress={()=>setModalMemberVisible(!modalMemberVisible)}
                            >
    
                                        <Text style={{alignItems:'center', paddingTop:5,color:'#ffff' }}>
                                        {"Select"}
                                        </Text>
    
                </TouchableOpacity>
            </View> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', width:width }}>
                    <Text style={[styles.textformat, styles.textColor,{fontWeight:'bold', paddingRight:20}]}>
                     {"Family Member"}
                    </Text>
                    <Dropdown
                            style={{width:'50%',color:'black',   borderBottomColor: 'gray',
                            borderBottomWidth:2, 
                            borderBottomColor:'#2F4F4F',
                            }}
                            selectedTextProps={{
                                style: {
                                  fontSize: 20, 
                                color: 'black',
                                },
                            }}
                            selectedTextStyle={{
                              fontSize: 13,
                              color: 'black',
                            }}
                            itemTextStyle={{fontWeight:'600', color:'black'}}
                            textColor="black"
                            placeholderStyle={styles.placeholderStyle}
                            //selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={familymemberdrpdowns}
                            //search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={item => {
                                setselectmemberid(item.value);
                            }}
                        />
                 </View>
       </View>
    )
   }
   function familyMemberList(){
    return(
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        
        data={familymemberdrpdowns}
        //search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
       // value={value}
        // onChange={item => {
        //     setValue('gender',item.label);
        // }}
    />
    //   familyMembersdetail.length >0 ? familyMembersdetail.map((item,index)=>(
    //     //    <View key={index} style={{flexDirection:'row',marginTop:10,alignItems:'center' }}>
    //             <TouchableOpacity key={index}  style={{backgroundColor:selectmembercolor === item.memberId?'#ccccff':'#eee', marginTop:10,width:300, height:40,paddingHorizontal:5*10, paddingTop:10}}
    //                 onPress={()=>changecolor(item.memberId,item.firstName,item.middleName ,item.lastName )}
    //                 >
    //                     <Text style={{ textTransform:'uppercase',color:'#2F4F4F', fontWeight:'600',fontSize:16 }}>{item.firstName +" "+(item.middleName != null ?item.middleName :"")+" "+ item.lastName }</Text>  
    //             </TouchableOpacity>      
               
                   
    //     //    </View>
          
    //   )) : <View></View>
    )
  }
  function selectedFamilyMember(){
    console.log(selectedmembername)
    setModalMemberVisible(!modalMemberVisible)
   // setconfirmBook(true)
}


    return (
        book === false?<View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerTextStyle}
        />
            <StatusBar backgroundColor="#6979F8" />
            {
                <ScrollView>
                    <View style={{ flex: 1 ,backgroundColor:"#eee",marginTop:10, marginLeft:10, marginRight:10}}>
                    {selecteddatedeatil()}
                    {selectedFamilyMemberdeatil()}
                    </View>
                </ScrollView>

            }
        <View style={{ flex: 1,justifyContent: "center",alignItems: "center",marginTop: 22}}>
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalDateVisible}
                    onRequestClose={() => {
                        setModalDateVisible(!modalDateVisible);
                    
                    }}
        
                >
                    
                    <View  style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                        <View style={[styles.modalView,{height:'40%', width:'100%', backgroundColor:'#F5F5F5'}]}>
                            <View style={{borderBottomColor:'#B3b3B3', borderBottomWidth:1,width:'100%', alignItems:'center' }}>
                                <Text style={{paddingBottom:20, fontSize:16, fontWeight:'bold'}}> {"Select day for test"}</Text>
                            </View>
                                <ScrollView style={{height:'30%'}}>
                                    <View style={{width:'90%'}}>

                                        {
                                            calander()
                                        }

                                    </View>

                                </ScrollView>
                            

                            <View style={{paddingTop:20}}>
                                <Pressable
                                style={[styles.buttonClose, {width:200, height:40,paddingTop:10}]}
                                onPress={() => setModalDateVisible(!modalDateVisible)}
                                >
                                <Text style={[styles.textStyle]}>Ok</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </Modal>

            </View>
            <View style={{ flex: 1,justifyContent: "center",alignItems: "center",marginTop: 22}}>
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalMemberVisible}
                    onRequestClose={() => {
                    setModalMemberVisible(!modalMemberVisible);
                    
                    }}
        
                >
                    
                    <View  style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                        <View style={[styles.modalView,{height:400, width:300, backgroundColor:'#F5F5F5'}]}>
                            <View style={{borderBottomColor:'#B3b3B3', borderBottomWidth:1,width:300, alignItems:'center' }}>
                                <Text style={{paddingBottom:20, fontSize:16, fontWeight:'bold'}}> {"Select Family Member"}</Text>
                            </View>
    
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
              <View style={{ backgroundColor: selectmemberid != ''?'white':'#F5F5F5',alignItems: 'center', height:'15%'}}>
                <View >
                    {
                          selectmemberid != ''? 
                          <View style={{  flexDirection: 'row',justifyContent: 'space-between', alignItems:'center', marginBottom:10}}>
                                <View style={{width:'40%'}}>
                                  <Text style={[stylessheet.textformat,{marginRight:15}]}>{selectedDate}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => BookingSlot()} style={[stylessheet.buttonstylecss]}>
                                        <Text style={[stylessheet.textformat,{  color: '#FFFFFF' }]}>{'Confirm Booking'}</Text>
                                    </TouchableOpacity>

                                </View>

                        </View> :<View></View>
                    }


                </View>
              </View>
        </View>:<RazorPayPaymentProcess/>
        )
}

FamilyMember.navigationOptions = {
    title: 'Select family member',
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
    dropdown: {
        margin: 16,
        height: 50,
        width:200,
        paddingLeft:50,
        borderBottomColor: 'gray',
        borderBottomWidth:2, 
        borderBottomColor:'#2F4F4F',
        baseColor:"rgba(255, 255, 255, 1)",
        color:"black"
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
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


export default FamilyMember;