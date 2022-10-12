import React,{ useEffect, useCallback } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { Text, View, StyleSheet, TextInput, Image, FlatList, ScrollView,KeyboardAvoidingView,StatusBar, TouchableOpacity, Dimensions,Pressable } from "react-native";
const { width,height } = Dimensions.get('screen');
//import { styles } from "../constants/styles";
import { LogBox } from "react-native";
import { useForm } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axiosInstance from '../../services/APIService';
import Spinner from 'react-native-loading-spinner-overlay';
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import {setsignupsuccessmessage} from '../redux/slices/login'
import DatePicker from 'react-native-date-picker'
import { textColor } from "../constants/styles";

// import CalendarPicker from 'react-native-calendar-picker';
// import { MaskedTextInput} from "react-native-mask-text";
// import { TextInputMask } from 'react-native-masked-text'
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const Signup = ({ navigation }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [value, setGenderValue] = React.useState(null);
    const [selectedStartDate, setselectedStartDate] = React.useState(null);
    const [isHidden, setHidden] = React.useState(false);
    const [continueisHidden, setContinueHidden] = React.useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [validationMessage, setValidationMessage] = React.useState(require('../../../assets/validation.json'));
    const registerdata=['firstName','middleName','lastName','dob','gender','password','emailAddress','mobileNumber'];
    const [loading, setLoading] = React.useState(false);
    const [validationsuccess, setValidationstatus] = React.useState(false);
    const [date, setDate] = React.useState(new Date())
    const dispatch = useAppDispatch();
    const startLoading = () => {
      setLoading(!loading);
    };
    const gender = [
        { label: 'FEMALE', value: '1' },
        { label: 'MALE', value: '2' },
        { label: 'OTHER', value: '3' }
      ];
    function validatedata(formData){
      let count=0;
      if(formData['firstName'] === undefined || formData['firstName'] === '' || formData['firstName'] === null)
      {
        
        validationMessage["firstName"]["validate"]=false ;
        count =count+1;
      }
      if(formData['lastName'] == undefined || formData['lastName'] === '' || formData['lastName'] === null){
        validationMessage['lastName']['validate']=false ;
        count =count+1;
      }
      if(formData['dob'] == undefined || formData['dob'] === '' || formData['dob'] === null){
        validationMessage['dob']['validate']=false ;
        count =count+1;
      }
      if(formData['gender'] == undefined || formData['gender'] === '' || formData['gender'] === null){
        validationMessage['gender']['validate']=false;
        count =count+1;
      }
      if(formData['emailAddress'] == undefined || formData['emailAddress'] === '' || formData['emailAddress'] === null){
        validationMessage['emailAddress']['validate']=false;
        count =count+1;
      }
      if(formData['mobileNumber'] == undefined || formData['mobileNumber'] === '' || formData['mobileNumber'] === null){
        validationMessage['mobileNumber']['validate']=false;
        count =count+1;
      }
      if(formData['password'] == undefined || formData['password'] === '' || formData['password'] === null){
        validationMessage['password']['validate']=false ;
        count =count+1;
      }
      if(count == 0){
        setValidationstatus(true);
        // if(validationsuccess === true)
        // {
          const url = require('../../../assets/url.json');
          console.log(url.signup)
          setLoading(true)
          setContinueHidden(false)
          axiosInstance.put(url.signup, formData).then(response => {
            dispatch(setsignupsuccessmessage('true'));
            setContinueHidden(true)
            console.log('responsesignupdetail',response);
            setLoading(false);
            navigation.navigate('Login');
        }).catch(error =>{
          setContinueHidden(true)
          setLoading(false);
            console.log(error);
        })
          
        // } 
      }
      else{
        setValidationstatus(true);
      }
    }
    const onSubmit = useCallback(formData => {
      
      if(formData['middleName'] === undefined)
      {
        formData['middleName']=null
      }
      console.log(formData)
      validatedata(formData);
      //validation for form
     
    }, []);

    function onDateChange(date)
    {
      const dateFormatted=(date.toISOString().slice(0,10)).replace('-','/').replace('-','/');
      setselectedStartDate(dateFormatted)
      setValue('dob', dateFormatted);
      setHidden(false)
    }
    const onChangeField = useCallback(
        name => text => {
                if(name === 'dob')
                {
                 // setHidden(true)
                 setDatePickerVisibility(true);
                  setselectedStartDate(text);
                  setValue(name, text);
                  validationMessage[name]['validate']="true" ;
                }
                else if(name === 'gender'){
                  setValue(name, text);
                  setGenderValue(text);
                }
                else{
                  setValue(name, text);
                  validationMessage['emailAddress']['validate']="true" ;
                }
            
        },
        []
      );
      function loginButton() {
        return (
            <View style={{ marginLeft:10, marginRight:10}}>
                <TouchableOpacity activeOpacity={0.9}
                    onPress={() => navigation.navigate('Login')}
                    style={[styles.buttonstylecss]}
                >

                        <Text style={[styles.textformat]}>
                            {'Login'}
                        </Text>
                </TouchableOpacity>
            </View>

        )
    }
      useEffect(() => {
        try{
          registerdata.map((item,index)=>( 
            register(item) 
        ));
        }
        catch(error){
          console.log(error);
        }

      }, [isDatePickerVisible]);

      const hideDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
      };
    
      const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        onDateChange(date);
        hideDatePicker();
      };
    function familyDetails() {
      //const startDate = selectedStartDate ? selectedStartDate.toISOString().slice(0,10) : '';
        return(
            <View style={{  marginTop: 15.0,backgroundColor:'white', borderRadius:10,marginLeft:15, marginRight:15,flexWrap:'wrap', height:height }}>

            <View style={{ marginLeft:20}}>
                <TextInput
                placeholder="First Name"
                placeholderTextColor="#2F4F4F" 
                style={[styles.textformat,styles.textColor,styles.textinputstyle]}
                onChangeText={onChangeField('firstName')}
                />
                {
                  validationMessage["firstName"]["validate"] === false ? <Text style={[styles.validatetextcolor]}>{validationMessage["firstName"]["message"]}</Text>: <Text></Text>
                }
                <TextInput
                    placeholder="Middle name"
                    placeholderTextColor="black" 
                    style={[styles.textformat,styles.textColor,styles.textinputstyle]}
                    onChangeText={onChangeField('middleName')}
                />
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="black" 
                    style={[styles.textformat,styles.textColor,styles.textinputstyle]}
                    onChangeText={onChangeField('lastName')}
                />
                {
                  validationMessage["lastName"]["validate"] === false ? <Text style={[styles.validatetextcolor]}>{validationMessage["lastName"]["message"]}</Text>: <Text></Text>
                }
               <View style={{flexDirection:'row'}}>
                <Text style={[styles.textformat,styles.textColor,{ marginTop:15,fontWeight:'bold', marginRight:20, fontSize:15, paddingTop:5 }]}>
                    Date Of Birth
                </Text>
                <TouchableOpacity onPress={()=>{openDatePickerModel()}}>
                <TextInput
                    placeholder="yyyy/mm/dd"
                    placeholderTextColor="black" 
                    value={selectedStartDate}
                    style={[styles.textformat,styles.textColor,{width:width/2, height:60, borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F'}]}
                    onChangeText={onChangeField('dob')}
                    //onSubmitEditing={showDatePicker}
                />
                </TouchableOpacity>
                </View>
                {
                  validationMessage["dob"]["validate"] === false ? <Text style={[styles.validatetextcolor]}>{validationMessage["dob"]["message"]}</Text>: <Text></Text>
                }
                
                {

                
                  <DatePicker
                  modal
                  open={isDatePickerVisible}
                  date={date}
                  mode="date"
                   onDateChange={(date)=>onDateChange(date)}
                   onConfirm={handleConfirm}
                   onCancel={hideDatePicker}
                />
                /* <TextInputMask
                    type={'datetime'}
                    options={{
                      format: 'YYYY/MM/DD'
                    }}
                    placeholder="yyyy/mm/dd"
                    value={selectedStartDate}
                    onChangeText={onChangeField('dob')}
                    style={[styles.textformat,{width:width/1.2,height:60, borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F',color:"#2F4F4F"}]}
                  /> */}
                {/* <MaskedTextInput
                    mask="9999/19/99"
                    placeholder="yyyy/mm/dd"
                    style={[styles.textformat,{width:width/1.2,height:60, borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F',color:"#2F4F4F"}]}
                    onChangeText={onChangeField('dob')}
                    keyboardType="numeric"
                  /> */}
                {/* <TextInput
                    placeholder="yyyy/mm/dd"
                    value={selectedStartDate}
                    style={[styles.textformat,{width:width/1.2,height:60, borderRadius:1,borderBottomWidth:2, borderBottomColor:'#2F4F4F',color:"#2F4F4F"}]}
                    onChangeText={onChangeField('dob')}
                /> */}
                {/* {
               isHidden?<View style={{width:width-50}}>
                    <CalendarPicker
                  
                  onDateChange={(date)=>onDateChange(date)}
                />

               </View> 
             : <View>
              <Text></Text>
             </View>
                } */}
   
                 <View style={{ flexDirection: 'row', alignItems: 'center', width:width }}>
                    <Text style={[styles.textformat, styles.textColor,{fontWeight:'bold'}]}>
                     Gender
                    </Text>
                    <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            //itemTextStyle={{textColor:'blue'}}
                            itemTextStyle={{fontWeight:'600', color:'black'}}
                            textColor="black"
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
                        />
                 </View>
                 {
                  validationMessage["gender"]["validate"] === false ? <Text style={[styles.validatetextcolor]}>{validationMessage["gender"]["message"]}</Text>: <Text></Text>
                }
                 <TextInput
                    placeholder="Email"
                    placeholderTextColor="black" 
                    style={[styles.textformat,styles.textColor,styles.textinputstyle]}
                    onChangeText={onChangeField('emailAddress')}
                />
                {
                  validationMessage["emailAddress"]["validate"] === false ? <Text style={[styles.validatetextcolor]}>{validationMessage["emailAddress"]["message"]}</Text>: <Text></Text>
                }
                <TextInput
                    placeholder="Mobile Number"
                    placeholderTextColor="black" 
                    style={[styles.textformat,styles.textColor,styles.textinputstyle]}
                    onChangeText={onChangeField('mobileNumber')}
                />
                {
                  validationMessage["mobileNumber"]["validate"] === false ? <Text style={[styles.validatetextcolor]}>{validationMessage["mobileNumber"]["message"]}</Text>: <Text></Text>
                }
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="black" 
                    secureTextEntry={true}
                    style={[styles.textformat,styles.textColor,styles.textinputstyle]}
                    onChangeText={onChangeField('password')}
                />
                {
                  validationMessage["password"]["validate"] === false ? <Text style={[styles.validatetextcolor]}>{validationMessage["password"]["message"]}</Text>: <Text></Text>
                }
                 {/* <TouchableOpacity activeOpacity={0.9} style={{width:width/1.2}}
                    onPress={handleSubmit(onSubmit)}
                >

                        <Text style={[styles.textformat, styles.textColor]} >
                            Countinue
                        </Text>
                    
                </TouchableOpacity> */}
                <View style={{ marginLeft:10, marginRight:10}}>
                <TouchableOpacity activeOpacity={0.9}
                    onPress={handleSubmit(onSubmit)}
                    style={[styles.buttonstylecss]}
                >

                        <Text style={[styles.textformat]}>
                            {'Sign up'}
                        </Text>
                </TouchableOpacity>
            </View>
                {loginButton()}
             {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}


            </View>

            {/* <View style={styles.dividerStyle}>
            </View> */}
        </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(214, 229, 243)'}}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerTextStyle}
        />
        <ScrollView scrollEventThrottle={16} >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {familyDetails()} 
        </KeyboardAvoidingView>
                        
        </ScrollView>
       
    </SafeAreaView>
    )
}

Signup.navigationOptions = {
    title: 'Signup',
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
  textinputstyle:{
    width:width/1.2,
    height:60, 
    borderRadius:1,
    borderBottomWidth:2, 
    borderBottomColor:'#2F4F4F'
  },
  textColor:{
    color:'#2F4F4F' 
},
spinnerTextStyle: {
  color: '#FFF',
},
validatetextcolor:{
  color:'#FF392B'
},
buttonstylecss:{
  backgroundColor:'#316BBE',
  alignItems:'center',
  borderRadius:25, 
  height:50, 
  marginTop:10,
  alignItems:'center',
  paddingTop:12,
  width:'80%'
}

  });
export default Signup;

