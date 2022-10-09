import React from "react";
import { styles } from "../constants/styles";
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  Fontisto  from 'react-native-vector-icons/Fontisto';
import { Text, View, TouchableOpacity, StatusBar,TextInput,Platform, Image, FlatList, StyleSheet,Pressable, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import Animated from "react-native-reanimated";
import axiosInstance from '../../services/APIService'
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment'; 
import {useAppDispatch,useAppSelector} from '../redux/hooks'


import AntDesign  from 'react-native-vector-icons/AntDesign'; 
const { width, height } = Dimensions.get('screen');

const LabDetail = ({ navigation }) => {
    const [platformtype, setplatformtype] = React.useState(false);
    const labID = useAppSelector(state => state.loginId.labId);
    const loginid =useAppSelector(state => state.loginId.loginId);
    const [testDetailinfo, settestDetailInfo] = React.useState([]);
    const [testDetails, settestDetails] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectedStartDate, setselectedStartDate] = React.useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [modalDateVisible, setModalDateVisible] = React.useState(false);
    const [selectedDate, setSelectedDay] = React.useState(moment().format('YYYY/MM/DD'));
    const [testGroupNameselected, settestGroupNameselected] = React.useState('');

    const [modalMemberVisible, setModalMemberVisible] = React.useState(false);
    const [familyMembersdetail, setFamilyMembers] = React.useState([]);
    const [selectmembercolor, setselectmembercolor] = React.useState('');
    const [selectmemberid, setselectmemberid] = React.useState('');
    const [selectedmembername, setselelctedmember] = React.useState('');
    let datesBlacklist = moment() ;


    function BookingSlot(){
        navigation.navigate('FamilyMember')
    }

    
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
        const url = require('../../../assets/url.json');
        console.log('labid'+labID)
        setLoading(true);
        axiosInstance.get(url.test+'/'+labID).then(response => {
         if( response != null &&response.data != null && response.data != undefined)
            {
                settestDetailInfo(response.data);
                settestDetails(response.data["testDetails"])
                setLoading(false);
                // setFilteredLabDataSource(response.data["summary"]);
            }
        }).catch(error =>{
            console.log(error);
            setLoading(false);
        })


     },[labID]);
    function divider() {
        return (
            <View style={styles.dividerStyle}>
            </View>
        )
    }

    function testdetail(){
         return(
            <View style={{borderRadius:10, borderWidth:1,borderColor:'#eee', backgroundColor:'white',   paddingTop:10, marginBottom:10, paddingBottom:10}}>

                <Text style={[stylessheet.textColor, stylessheet.textformat,stylessheet.headerfontsize,{paddingLeft:15}]}>{testDetailinfo.testName}</Text>
                {/* <View style={{flexDirection:'row', paddingTop:10,paddingLeft:15}}>
                   <MaterialCommunityIcons name="clock-outline" size={24} color="#f93" />
                   <Text style={[stylessheet.textColor, stylessheet.textformat,{paddingLeft:5}]}> {"Get reports:"}</Text>
                   <Text style={[styles.textcolor,{paddingLeft:5}]}> {"Within 7 days" }</Text>
                </View> */}
                <View style={{borderWidth:1,borderColor:'#eee', marginTop:20, paddingLeft:0}}>
                </View>
                <View >
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:110, height:25, backgroundColor:'#f93', alignItems:'center'}}>
                                <Text>{testDetailinfo.discountPercentage +' % discount'}</Text>
                        </View>
                    </View>
                     <View style={{flexDirection:'row',paddingTop:20, paddingLeft:15}}>
                        <FontAwesome name="rupee" size={24} color="#2F4F4F" />
                        <Text style={[stylessheet.textformat,{paddingLeft:5,textDecorationLine:'line-through'}]}>{testDetailinfo.fee}</Text>
                        <Text style={[ stylessheet.textformat,{paddingLeft:5,color:'#f93'}]}>{testDetailinfo.currentFee}</Text>
                     </View>
                </View>
            </View>
         )
    }
    function  lablistdetail(){
            <View>
            <Text style={[styles.textcolor,{fontSize:16,paddingLeft:15}]}>{"Total Tests Included ("+ testDetailinfo.count +")"}</Text>
            <View style={{flexDirection:'row', paddingTop:10,paddingLeft:15}}>
               <Text style={[styles.textcolor,{paddingLeft:5, fontWeight:'600'}]}> {"Get reports:"}</Text>
               <Text style={[styles.textcolor,{paddingLeft:5}]}> {"Within " +testDetailinfo.duration +" days" }</Text>
            </View>
            </View>

         
           
    }
  
   
    function collapsiable(testGroupName){
        if(testGroupName ===testGroupNameselected){
            settestGroupNameselected('')
        }
        else{
            settestGroupNameselected(testGroupName);
        }
   
    }
    function Totaltestdetail(){
        // console.log('deatil'+ testDetailinfo["testDetails"])
        return(
           testDetails.map((item,index)=>(

            <View key={index} style={{borderRadius:10, borderWidth:1,borderColor:'#eee', backgroundColor:'white', paddingTop:10}}>
            <View style={{flexDirection:'row', paddingTop:10,paddingLeft:15, paddingBottom:10}}>
                <View style={{width:'90%'}}>
                    <View style={{flexDirection:'row'}}>
                    <Fontisto name="blood-test" size={24} color="#f93"/> 
                    <Text style={[stylessheet.textColor, stylessheet.textformat,stylessheet.headerfontsize,{paddingLeft:15}]}>{"Tests Include ("+ item.testGroupName+")"}</Text>
                    </View>


                    <Text style={[stylessheet.textColor,stylessheet.headerfontsize,{paddingLeft:15, paddingTop:10, }]}>{"Total Tests Include ("+ item["tests"].length+")"}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=> collapsiable(item.testGroupName)} >
                        <AntDesign name="down" size={20} color="black" />
                    </TouchableOpacity>

                </View>



            </View>
            <View style={{height:testGroupNameselected === item.testGroupName ? 100:0}}>
                <View style={{borderBottomWidth:1, borderBottomColor:'#eee'}}>

                </View>
            
                <ScrollView>

                {
                        item["tests"].map((item,index)=>( 
                                <View key={index} style={{paddingTop:10}}>
                                    <Text style={[stylessheet.textColor, stylessheet.textformat,{paddingLeft:15}]}>{item}</Text>
                                    {/* <View style={{flexDirection:'row', paddingTop:10,paddingLeft:15}}>
                                    <Text style={[stylessheet.textColor, stylessheet.textformat,{paddingLeft:5}]}> {item.tests.count +" test included"}</Text>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#eee', marginTop:20, paddingLeft:0}}>
                                    </View> */}
                                </View>
                    
                                ))
                }

                </ScrollView>
            </View>

           </View>

           )) 

        )
   }
    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5', marginBottom:2, marginTop:10,marginLeft:10,marginRight:10 }}>
            <Spinner
                visible={loading}
                textStyle={styles.spinnerTextStyle}
                />
            <StatusBar backgroundColor="#6979F8" />
            {
            <ScrollView>
              <View style={{ flex: 1 }}>
                    {testdetail()}
                    {Totaltestdetail()}

                </View>
             </ScrollView>       
            }

            {
            <View>
                <View style={{height:80,backgroundColor:"white"}}>
                  <View style={[{alignItems:'center', flexDirection:'row', paddingTop:15}]}>
  
                              <View style={{width:width/2}}>
                                  <Text style={[stylessheet.textformat,stylessheet.textColor,{paddingLeft:20, fontWeight:'bold'}]}>{'Rs '+ testDetailinfo.currentFee}</Text>
                              </View>
                              <View>
                              <TouchableOpacity onPress={() => BookingSlot()}>
                                  <View style={[styles.buttonBookingStyle, {backgroundColor:'#337ab7'}]}>
                                      <Text style={[stylessheet.textformat,{  color: '#FFFFFF' }]}>{'Continue'}</Text>
                                  </View>
                              </TouchableOpacity>
                              </View>
                             
                          </View>
  
                  </View>
                </View>
            }


        </View>)
}

LabDetail.navigationOptions = {
    title: 'Test package details',
    headerTintColor: 'black',
    headerTitleAlign: 'center',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'rgb(214, 229, 243)'
        //fontFamily:'sharp-sans-bold, fallback-font, Arial, sans-serif'
        
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

export default LabDetail;