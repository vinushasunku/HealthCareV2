import React, { useEffect, useCallback } from "react";
import { Text, View,TextInput, Button,Image, StatusBar, FlatList, KeyboardAvoidingView,TouchableOpacity, StyleSheet,ScrollView,Dimensions } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
const { width, height } = Dimensions.get('screen');
import { useForm } from 'react-hook-form';
import { LogBox } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
//import CalendarPicker from 'react-native-calendar-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import { setStateId } from "../redux/slices/login";
import Spinner from 'react-native-loading-spinner-overlay';
import axiosInstance from "../../services/APIService";
const AddMembers = ({ navigation }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [value, setGenderValue] = React.useState(null);
    const [relationvalue, setRelationshipValue] = React.useState(null);
    const loginid = useAppSelector(state => state.loginId.loginId);
    const [selectedStartDate, setselectedStartDate] = React.useState(null);
    const [isHidden, setHidden] = React.useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.warn("A date has been picked: ", date);
      onDateChange(date);
      hideDatePicker();
    };
    const gender = [
        { label: 'FEMALE', value: '1' },
        { label: 'MALE', value: '2' },
        { label: 'OTHERS', value: '3' }
      ];
      const relationship = [
        { label: 'SELF', value: '1' },
        { label: 'WIFE', value: '2' },
        { label: 'FATHER', value: '3' },
        { label: 'MOTHER', value: '4' },
        { label: 'FATHER_IN_LAW', value: '5' },
        { label: 'MOTHER_IN_LAW', value: '6' },
        { label: 'OTHERS', value: '7' }
      ];
    const onSubmit = useCallback(formData => {
      const url = require('../../../assets/url.json');
      axiosInstance.post(url.addmember, formData).then(response => {
        console.log('responsesignupdetail' +response.data);
        dispatch(setStateId(1));
        navigation.navigate('ManagefamilyMembers')
    }).catch(error =>{
        console.log(error);
    })
  
      
    }, []);
    const onChangeField = useCallback(
        name => text => {
          if(name === 'dob')
          {
            setHidden(true)
            setDatePickerVisibility(true);
          }
          else{
            setValue(name, text);
          }
            
        },
        []
      );
      function onDateChange(date)
      {
        console.log(new Date(date).toISOString().slice(0,10).toString().replace('-','/').replace('-','/'))
        const dateFormatted=(date.toISOString().slice(0,10)).replace('-','/').replace('-','/');
        setselectedStartDate(dateFormatted)
        setValue('dob', dateFormatted);
        setHidden(false)
      }

      useEffect(() => {
        register('firstName');
        register('lastName');
        register('dob');
        register('gender');
        register('relationship');
      }, [register]);
    function familyDetails() {
        return(

            <View style={{ justifyContent: 'center',backgroundColor:'white', paddingTop:10   }}>
            <View style={{ marginLeft:10}}>
                <Text style={[styles.textformat,{ fontWeight:'bold', marginRight:20,color:"#2F4F4F", fontSize:15, paddingTop:5 }]}>
                     First Name
                </Text>
                <TextInput
                placeholder="First Name"
                style={{width:width-50,height:50, borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F'}}
                onChangeText={onChangeField('firstName')}
                />
                  <Text style={[styles.textformat,{ fontWeight:'bold',marginTop:10, marginRight:20,color:"#2F4F4F", fontSize:15, paddingTop:5 }]}>
                     Last Name
                </Text>
                <TextInput
                    placeholder="Last Name"
                    style={{width:width-50,height:50, borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F',color:"#2F4F4F"}}
                    onChangeText={onChangeField('lastName')}
                />
                <View>
                <Text style={[styles.textformat,{ marginTop:15,fontWeight:'bold', marginRight:20,color:"#2F4F4F", fontSize:15, paddingTop:5 }]}>
                    Date Of Birth
                </Text>
                <TextInput
                    placeholder="yyyy/mm/dd"
                    value={selectedStartDate}
                    style={{width:width-50,height:60, borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F',color:"#2F4F4F"}}
                    onChangeText={onChangeField('dob')}
                    //onSubmitEditing={showDatePicker}
                />

                </View>

                {
                  <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  //onDateChange={(date)=>onDateChange(date)}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  />
                }
                 <View style={{ flexDirection: 'row', alignItems: 'center', width:width }}>
                    <Text style={[styles.label,  { color: 'blue', marginRight:40,color:"#2F4F4F", fontSize:13, fontWeight:'600' }]}>
                    Gender
                    </Text>
                    <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            
                            data={gender}
                            //search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={item => {
                                setValue('gender',item.label);
                            }}
                            // renderLeftIcon={() => (
                            // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                            // )}
                        />
                 </View>

                 <View style={{ flexDirection: 'row', alignItems: 'center', width:width }}>
                    <Text style={[styles.label,  { color: 'blue', marginRight:20,color:"#2F4F4F", fontSize:13, fontWeight:'600' }]}>
                    Relationship
                    </Text>
                    <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            
                            data={relationship}
                            //search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={item => {
                                setValue('relationship',item.label);
                            }}
                            // renderLeftIcon={() => (
                            // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                            // )}
                        />
                 </View>
                 <View style={{height:'12%', backgroundColor:'white', alignItems:'center', marginBottom:20, borderTopWidth:1, borderColor:'#eee'}}>
                <TouchableOpacity 
                    style={[styles.buttonstylecss]}
                    onPress={handleSubmit(onSubmit)} >
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={[styles.textformat,{color:'white'}]}>Add</Text>
                                    </View>
                                
                    </TouchableOpacity>
            </View>
                 {/* <TouchableOpacity 
                    onPress={handleSubmit(onSubmit)} style={[StyleSheet.buttonstylecss]}
                >

                        <Text >
                            Continue
                        </Text>
                 
                </TouchableOpacity> */}
            </View>
           </View>
        )
    }

    return (
         <View style={{backgroundColor:'#F5F5F5', marginTop:10, marginLeft:10, marginRight:10}}>
           <ScrollView >
              <KeyboardAvoidingView behavior="padding">
              {familyDetails()} 
              </KeyboardAvoidingView>
                              
            </ScrollView>
         </View>
        // <SafeAreaView style={{ flex: 1, backgroundColor:'#B3b3B3' }}>
        //     <Spinner
        //         visible={loading}
        //         textStyle={styles.spinnerTextStyle}
        //         />
           
           
        // </SafeAreaView>
    )
}


AddMembers.navigationOptions = {
  title:'Add Members',
  headerTintColor: 'black',
  headerTitleAlign: 'center',
  headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor:'rgb(214, 229, 243)'
  }
 
 
}
const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      width:250,
      paddingLeft:40,
      borderBottomColor: 'gray',
      borderBottomWidth:2, 
      borderBottomColor:'#2F4F4F',
      color:"#2F4F4F"
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
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
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
    borderRadius:25, 
    height:40, 
    marginTop:10,
    alignItems:'center',
    paddingTop:10,
    width:'50%'
  }
  });
export default AddMembers;

