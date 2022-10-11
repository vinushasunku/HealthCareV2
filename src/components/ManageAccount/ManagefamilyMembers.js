import React from "react";
import { Text, View, Image, StatusBar, FlatList, TouchableOpacity, StyleSheet,Dimensions } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
const { width, height } = Dimensions.get('screen');
import Ionicons  from 'react-native-vector-icons/Ionicons'; 
import { styles } from "../constants/styles";
import { LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//import { useFocusEffect } from "@react-navigation/core";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';
import axiosInstance from "../../services/APIService";
import {useAppDispatch,useAppSelector} from '../redux/hooks'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const ManagefamilyMembers = ({ navigation }) => {
    const loginid = useAppSelector(state => state.loginId.loginId);
    const setstate = useAppSelector(state => state.loginId.setstate); 
    const [myState,setMyState] = React.useState(setstate);
    const [loading, setLoading] = React.useState(false);
    const startLoading = () => {
        setLoading(!loading);
      };
    //const {navigate} = useIsFocused();
    const [familyMembersdetail, setFamilyMembers] = React.useState([]);
    const data = [
        {
          firstName:"Vijaya",
          middleName:"Kumari",
          lastName:"Sunku",
          gender:"female",
          relation:"mother",
          dob:"10/10/1992",
          relationship:"SELF"
        },
        {
            firstName:"lekha",
            middleName:null,
            lastName:"Sunku",
            gender:"female",
            relation:"mother",
            dob:"10/10/1992",
            relationship:"SELF"
          }
    ];
    
    React.useEffect(() => {
        debugger;
        const url = require('../../../assets/url.json');
        startLoading();
        axiosInstance.get(url.getManageAccount+loginid).then(response => {
            setLoading(false);
            console.log('member'+response.data)
            if( response != null &&response.data != null && response.data['familyMembers'].length >0)
            {
                setFamilyMembers(response.data['familyMembers']);
            }
        }).catch(error =>{
            setLoading(false);
            console.log(error);
        })
      
    },[setstate]);
    function familyDetails() {
        return(
            <View style={{flexDirection: width>600 ?'row':'column', flexWrap:'wrap'}}>
              {
                            familyMembersdetail.length >0 ? familyMembersdetail.map((item,index)=>(
                                <View  key={index} style={{ flexDirection : "row", marginTop: 10.0,backgroundColor:'white',borderRadius:10, height:'2.5%',marginLeft:10, marginRight:10, width: width>600 ?350:width-20}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{paddingLeft:30, width:width >600 ? width/5:width/3.5}}>
                                            <Ionicons name="person" size={50} color="#2F4F4F" />
                                        </View>
                        
                                            <View  style={{paddingTop:15}}>
                                                <Text style={[stylessheet.headerfontsize,stylessheet.textColor,stylessheet.textformat,{textTransform:'uppercase', paddingBottom:5,flexWrap:'wrap', fontWeight:'bold'}]}>{item.firstName +" "+(item.middleName != null ?item.middleName :"")+" "+ item.lastName }</Text>
                                                <View style={{    backgroundColor: "#DBDBDB",height: 0.80, width:180}}>
                                                </View> 
                                            
                                                <View style={{  marginTop: 3, flexWrap:'wrap', width:width-90, paddingRight:10}}>
                                                
                                                    <Text style={[stylessheet.textColor,stylessheet.textformat]}>
                                                        {"RelationShip : "+item.relationship}
                                                    </Text>
                                            
                                                    <Text style={[stylessheet.textColor,stylessheet.textformat]}>
                                                        {"Dob : "+ item.dob} 
                                                    </Text>
                                                
                                                    <Text style={[stylessheet.textColor,stylessheet.textformat]}>
                                                        {"Gender : "+item.gender} 
                                                    </Text>
                                                </View>
                                            </View>
                                    
                        
                                    </View>
                                </View>
                                
                            )) : <View></View>
              }
            </View>


        )
    }

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#F5F5F5' }}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
                />
                <ScrollView>
                    {familyDetails()}

                </ScrollView>
            


            
            <View style={{height:'12%', backgroundColor:'white', alignItems:'center'}}>
                <TouchableOpacity 
                    style={[stylessheet.buttonstylecss]}
                    onPress={() => navigation.navigate('AddMembers')} >
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={[stylessheet.buttonTextformat,{color:'white'}]}>Add Members</Text>
                                    </View>
                                
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

ManagefamilyMembers.navigationOptions = {
    title:'Manage family Members',
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
    buttonTextformat:{
        fontSize:16,
        lineHeight:16,
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
        borderRadius:25, 
        height:40, 
        marginTop:10,
        alignItems:'center',
        paddingTop:10,
        width:'50%'
      }
});

export default ManagefamilyMembers;

