import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { Text, View, StyleSheet, TextInput, Image,Platform, FlatList, StatusBar, TouchableOpacity, Dimensions } from "react-native";
import {SearchBar,ListItem,Avatar} from "react-native-elements";

const { width } = Dimensions.get('screen');
import { styles } from "../constants/styles";
import { LogBox } from "react-native";
import axiosInstance from '../../services/APIService'
import Spinner from 'react-native-loading-spinner-overlay';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import { setDoctorId,setSelectDoctorName,setDoctorExperience,setfee, setOrderStatus, setUpdate, setImageUrl,setType } from "../redux/slices/login";

const SearchInfo = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const [searchtext, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);
    const [masterDataSource, setMasterDataSource] = React.useState([]);
    const [platformtype, setplatformtype] = React.useState(false);
    const dispatch = useAppDispatch();
    const loginid = useAppSelector(state => state.loginId.loginId);
    const doctorId = useAppSelector(state => state.loginId.doctorId);
    const profileImage=require('../../../assets/doctorprofile.jpg');
    React.useEffect(() => {
        dispatch(setType("CONSULTATION"));
        if(Platform.OS === 'ios' || Platform.OS === 'android' )
        {
            setplatformtype(true)
        }
        const url = require('../../../assets/url.json');
        setLoading(true);
        axiosInstance.get(url.doctorAccountUrl+'list?pageSize=10').then(response => {
         if( response != null &&response.data != null && response.data != undefined)
            {
              

                setMasterDataSource(response.data["doctors"]);
                setFilteredDataSource(response.data["doctors"]);
                setLoading(false);
            }
        }).catch(error =>{
            console.log(error);
            setLoading(false);
        })
        // setFilteredDataSource(doctorsList);
        // setMasterDataSource(doctorsList);
     },[]);
      const searchFilterFunction = (text) => {
        if (text) {
          const newData = masterDataSource.filter(
            function (item) {
              const itemData = item.firstName
                ? item.firstName.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };
    function header() {
        
        return (
            <View style={[styles.headerContainerStyle,{backgroundColor:'white', borderBottomWidth:1, borderBottomColor:'#2F4F4F'}]}>

           
            <Text style={{ fontSize: 20.0, marginLeft: 10 * 2.0 }}>{"Header"}</Text>
        </View>
        )
    }

    function search() {
        return (
            <View style={styles.headerSearchStyle}>
                <View style={{ flex:1}}>
                <SearchBar
                    round
                    inputContainerStyle={{backgroundColor:'white', borderWidth:1,borderBottomWidth:1, width:width-80, borderColor:'#2F4F4F'}}
                    containerStyle={{backgroundColor:'white', borderBottomColor:'white', borderTopColor:'white'}}
                    cancelIcon={false}
                    searchIcon={{size: 24}}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Search Doctors By Name"
                    value={searchtext}
                    />
                </View>
            </View>
        )
    }
    function selectDoctor(id, type,imageurl)
    {
        //const doctorid =id;
        dispatch(setDoctorId(id));
        dispatch(setImageUrl(imageurl))
        if(type === 'TimeSlots')
        {
            const newData = masterDataSource.filter(
                function (item) {
                  const itemData = item.id
                    ? item.id.toUpperCase()
                    : ''.toUpperCase();
                  const textData = id.toUpperCase();
                  return itemData.indexOf(textData) > -1;
              });
            dispatch(setSelectDoctorName(newData[0].firstName+ ' '+newData[0].lastName));
            dispatch(setDoctorExperience(new Date().getFullYear() -newData[0].practicingFrom));
            dispatch(setfee(newData[0].consultationFee));
            dispatch(setOrderStatus(''));
            dispatch(setUpdate(false));
            navigation.navigate('TimeSlots');
        }
        else{
            // setTimeout(
            //     function(){
                    navigation.navigate('DoctorProfile');
            //     },
            //     1000
            // )
           
        }
 
    }
    function doctors() {

        const renderItem = ({ item }) => {
            return (
                <View style={{ justifyContent: 'center',
                                marginTop: 15.0,  
                                // alignItems: 'center', 
                                width: platformtype ===true ? width:400, 
                                borderWidth:platformtype ===true? 0:1,
                                borderRadius:platformtype ===true? 0:10,
                                marginLeft :platformtype ===true? 0:10,
                                marginRight :platformtype ===true? 0:10,
                                height :platformtype ===true?200:200
                              
                            }}>
                    <View style={{ flexDirection: 'row'}}>
                        {/* <Ionicons name="person-circle-outline" size={160} color="#337ab7" /> */}
                        {/* <Avatar rounded source={profileImage}  style={{height:100 ,borderRadius:100/2, width: 100,paddingLeft:20,paddingTop:10,  marginRight:20,borderWidth:1, borderColor:"#eee" }}  /> */}
                        <View style={styles.doctorImageContainerStyle}>
                                    <Avatar source={profileImage} style={{height:110 , width: 110, borderRadius: 75.0,overflow: 'hidden'}} rounded />
                                {/* <Avatar rounded source={profileImage}  style={{height:100 ,borderRadius:100/2, width: 100,paddingLeft:20,paddingTop:10,  marginRight:20,borderWidth:1, borderColor:"#eee" }}  /> */}

                        </View>
                        <View>
                        <TouchableOpacity onPress={() => selectDoctor(item.id,'Doctor',profileImage)}>
                            <View style={{paddingTop:20}}>
                                <Text style={[stylessheet.textformat,stylessheet.textcolor,{ fontSize: 16.0, textTransform:'uppercase' }]}>{item.firstName +' '+item.lastName}</Text>
                                <Text style={[stylessheet.textformat,stylessheet.textcolor,{ fontSize: 16.0, marginTop: 3 }]}>
                                {new Date().getFullYear() -item.practicingFrom}  Years Experience
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectDoctor( item.id,'TimeSlots')} style={[stylessheet.buttonstylecss,{marginRight:10}]}>

                                    <Text  style={[stylessheet.textformat, {color:'white'}]}>
                                        Book Consultation
                                    </Text>
                               
                        </TouchableOpacity>
                        </View>


                    </View>



                    {
                        platformtype ===true? <View style={[styles.dividerStyle ,{width:width}]}>
                        </View> :<Text></Text>
                    }
                   
                </View>
            )
        }
       if(platformtype ===true)
       {
        return (

            <FlatList
                data={filteredDataSource}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10* 2.0 }}
            />
        )
       }
       else{
        return (
                <FlatList
                data={filteredDataSource}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10* 2.0 ,flexDirection : "row"}}
                
            />

        )
       }

    }


    return (
        <SafeAreaView  style={{ flex: 1, }} backgroundColor="#F5F5F5">
            <Spinner
                visible={loading}
                textStyle={styles.spinnerTextStyle}
                />
        <StatusBar backgroundColor="#6979F8" />
            <View style={{ flex: 1, backgroundColor: 'white', marginLeft:10, marginRight:10, marginBottom:20, marginTop:10 }}>
                {platformtype ===true?<Text></Text> :header()}
                {/* {header()} */}
                {search()}
                {doctors()}
            </View>
    </SafeAreaView>
    )
}


SearchInfo.navigationOptions = {
    title: 'Search Doctors',
    headerTitleAlign: 'center',
    headerTintColor: 'black',
    // headerLeft :
    //     <Avatar source={{ uri: 'https://www.iyuorganics.com/img/logo/IYU-Organics.png'}} style={{height:110 , width: 110, borderRadius: 75.0, marginRight:20, overflow: 'hidden'}}  />

    // ,
    
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'rgb(214, 229, 243)'
    }
}

export default SearchInfo;

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
    textcolor:{
        color:'#333333'
    },
    buttonstylecss:{
        backgroundColor:'#316BBE',
        alignItems:'center',
        borderRadius:25, 
        height:50, 
        marginTop:10,
        alignItems:'center',
        paddingTop:12,
        paddingLeft:10,
        paddingRight:10
      }
});