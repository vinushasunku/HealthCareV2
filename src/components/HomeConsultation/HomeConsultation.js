import React from "react";
import { ListItem,Avatar } from "react-native-elements";
import CalendarStrip from 'react-native-calendar-strip';
// import { styles } from "../constants/styles";
import { Text, View, TouchableOpacity, StatusBar, Image, FlatList, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import Spinner from 'react-native-loading-spinner-overlay';
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import { setType } from "../redux/slices/login";
const { width,height } = Dimensions.get('screen');

const HomeConsultation = ({ navigation }) => {

    const dispatch = useAppDispatch();
    const loginid = useAppSelector(state => state.loginId.loginId);
    const [loading, setLoading] = React.useState(false);
    const type="Consultation";
    const staticImage = require("../../Image/Medicines.jpg");
    const labImage=require('../../../assets/Lab.jpg');
    const startLoading = () => {
        setLoading(!loading);
      };

    React.useEffect(() => {
        dispatch(setType(type));
    })
    function header() {
        
        return (
            <View style={[{alignItems:'center', paddingTop:40}]}>

           
            <Text style={[styles.textformat,{fontWeight:'bold'}]}>{"Get started finding the care you're looking for"}</Text>
        </View>
        )
    }
    function specialties(){
        
        return(
            <View style={[{backgroundColor:'white', width:width-20, marginLeft:10, marginRight:10,marginTop:20,  paddingLeft:15, paddingTop:30, paddingBottom:30}]}>
              
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>

                    <View style={{borderWidth:1, borderColor:'#eee', alignItems:'center',  marginTop:20}}>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchInfo')}>
                            <Avatar   source={{uri:'https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/Video+Consultation-1920w.png'}} style={{height:100 , width: 120,paddingLeft:20,paddingRight:20, borderRadius: 75.0, paddingTop:10}}  />
                            {/* <MaterialCommunityIcons name="video-account" size={24} color="black" /> */}
                            <Text style={[styles.textformat]}>{'Consultation'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderWidth:1, borderColor:'#eee', alignItems:'center', marginTop:20, marginLeft:20}}>
                        <TouchableOpacity>
                           {/* <Image source={staticImage} style={{height:100 , width: 120,paddingLeft:20,paddingTop:10, borderRadius: 75.0, marginRight:20, }} /> */}
                            <Avatar rounded={false} source={staticImage}  style={{height:100 , width: 120,paddingLeft:20,paddingTop:10, borderRadius: 75.0, marginRight:20, }}  />
                            <Text style={[styles.textformat,{paddingLeft:20, paddingTop:5, paddingBottom:10}]}>{'Medicines'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderWidth:1, borderColor:'#eee', alignItems:'center',  marginTop:20}}>
                        <TouchableOpacity onPress={() => navigation.navigate('LabSearch')}>
                            <Avatar   source={labImage} style={{height:100 , width: 120,paddingLeft:20, borderRadius: 75.0, marginRight:20}}  />
                            <Text style={[styles.textformat,{paddingLeft:20, paddingTop:5, paddingBottom:10}]}>{'Lab Tests'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>    


            </View>
        )
    }
    function note(){
        return(
            <View style={{marginLeft:10, marginRight:10,marginTop:20,  paddingLeft:15, paddingTop:30}}>
                <Text style={[styles.textformat,{fontWeight:'bold', fontSize:22}]}>{'What is IYU-HealthCare ?'}</Text>
                <Text style={[styles.textformat,{fontWeight:'bold', paddingTop:20}]}>{'Get care anytime, anywhere'}</Text>
                <Text style={[styles.textformat,{ flexWrap:'wrap',paddingTop:10,  width:width-100}]}>{'Book appointments online and see the same great doctors from home with a video visit.'}</Text>
            </View>
        )
    }
    function divider() {
        return (
            <View style={styles.dividerStyle}>
            </View>
        )
    }

    return (
        <SafeAreaView  style={{ flex: 1, }} backgroundColor="#F5F5F5">
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
                />
        <StatusBar />
            {
                
               <ScrollView>
                 {header()}
                 {specialties()}
                 {note()}
               </ScrollView>
              
            }
        </SafeAreaView>

        )
}

HomeConsultation.navigationOptions = {
    title: "Get started finding the care you're looking for",
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'rgb(214, 229, 243)'
        //fontFamily:'sharp-sans-bold, fallback-font, Arial, sans-serif'
        
    }
}

const styles = StyleSheet.create({
    textformat:{
        fontSize:16,
        lineHeight:22,
        color: 'black',
        //letterSpacing:0,
        fontWeight:'500',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 5
    },
    dividerStyle: {
        backgroundColor: "#DBDBDB",
        height: 0.80,
        marginTop: 10* 2.0,
        marginHorizontal: 10* 2.0
    }
})


export default HomeConsultation;