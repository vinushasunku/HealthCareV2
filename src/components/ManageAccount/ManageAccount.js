import React from "react";
import { Text, View, Image, StatusBar, FlatList, TouchableOpacity, StyleSheet,Dimensions ,ScrollView} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
const { width, height } = Dimensions.get('screen');
import Ionicons  from 'react-native-vector-icons/Ionicons'; 
import { styles } from "../constants/styles";
import { LogBox } from "react-native";
import  SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons'; 
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import Spinner from 'react-native-loading-spinner-overlay';
import axiosInstance from "../../services/APIService";
import { setLoginId } from "../redux/slices/login";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const ManageAccount = ({ navigation }) => {
    const loginid = useAppSelector(state => state.loginId.loginId);
    const [loading, setLoading] = React.useState(false);
    const [loggedUserInfo, setLogin] = React.useState([]);
    const dispatch = useAppDispatch();
    // const loggedUserDetail =  {
    //     name:"Vijaya Kumari Sunku",
    //     gender:"Female",
    //     UID:"124125657126",
    //     phoneNumber:"9949244306",
    //     age:50
    // };
    
    React.useEffect(() => {
        const url = require('../../../assets/url.json');
        setLoading(true);
        axiosInstance.get(url.getManageAccount+loginid).then(response => {
            setLoading(false);
            console.log('member'+response.data)
            if( response != null &&response.data != null && response.data['accountOwner'] != null)
            {
                setLogin(response.data['accountOwner']);
            }
        }).catch(error =>{
            setLoading(false);
            console.log(error);
        })
        
    },[]);
    function signOutApplication(){
          dispatch(setLoginId(''));
          navigation.navigate('Login')
    }
    function personInfo() {
        return(
            <View style={{backgroundColor:'white', marginBottom:10, marginLeft:10, marginRight:10, marginTop:10, height:height-20,paddingLeft:10}}>
            <View style={{alignItems:'center', paddingTop:10}}>
                 <Ionicons name="person" size={200} color="#2F4F4F" />
                 <Text style={[stylessheet.textformat,stylessheet.headerfontsize, stylessheet.textColor,{textTransform:'uppercase'}]}>{loggedUserInfo.firstName +' '+ loggedUserInfo.lastName}</Text>
            </View>
            <View style={[styles.divider]}>
                  
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center',height:50,paddingTop:20}}>
                    <Text style={[stylessheet.textformat,stylessheet.textColor,,{  marginLeft:15 }]}>{"Phone Number :"}</Text>
                    <Text style={[stylessheet.textformat,stylessheet.textColor,{marginLeft:15 }]}>{loggedUserInfo.phoneNumber}</Text>
            </View> */}
            {/* <View style={[styles.divider]}>
                  
            </View> */}

            <View style={{ flexDirection: 'row', alignItems: 'center', height:60, paddingTop:10}}>
                <Ionicons name="person" size={24} style={{paddingLeft:10}} color="#2F4F4F" />
                <TouchableOpacity 
                style={{paddingLeft:10 }}
                onPress={() => navigation.navigate('ManagefamilyMembers' ,{ loginid:loginid})}>
                               <View style={{flexDirection: 'row'}}>
                               <View style={{flexDirection: 'row', alignItems: 'center',width:'90%'}}>
                                    <Text style={[stylessheet.textformat,stylessheet.textColor]}>Family Members</Text>
                                   
                                </View>
                                <View style={{alignItems:'center', paddingTop:15}}>
                                   <SimpleLineIcons name="arrow-right"  size={10} color="#2F4F4F" />
                                </View>

                               </View>
       
                </TouchableOpacity>
            </View>
            <View style={[styles.divider]}>
                  
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height:60, paddingTop:10}}>
                <Ionicons name="person" size={24} style={{paddingLeft:10}} color="#2F4F4F" />
                <TouchableOpacity 
                style={{paddingLeft:10 }}
                onPress={() => navigation.navigate('BookingList')}>
                             <View style={{flexDirection: 'row'}}>
                               <View style={{flexDirection: 'row', alignItems: 'center',width:'90%'}}>
                                    <Text style={[stylessheet.textformat,stylessheet.textColor]}>Booking</Text>
                                   
                                </View>
                                <View style={{alignItems:'center', paddingTop:15}}>
                                   <SimpleLineIcons name="arrow-right"  size={10} color="#2F4F4F" />
                                </View>
                               </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.divider]}>
                  
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height:60, paddingTop:10}}>
                <Ionicons name="person" size={24} style={{paddingLeft:10}} color="#2F4F4F" />
                <TouchableOpacity 
                style={{paddingLeft:10 }}
                onPress={() => signOutApplication()}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={[stylessheet.textformat,stylessheet.textColor]}>SignOut</Text>
                                </View>
                </TouchableOpacity>
            </View>
       </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1,  backgroundColor:'#F5F5F5' }}>
            <StatusBar translucent={false} backgroundColor="black" />
                <ScrollView scrollEventThrottle={16}>
                    {personInfo()}
                </ScrollView>
          
        </SafeAreaView>
    )
}

ManageAccount.navigationOptions = {
    title: '',
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
export default ManageAccount;

