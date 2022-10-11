import React from "react";
import {Text, View, Image, Platform,ImageBackground, StatusBar,KeyboardAvoidingView, SafeAreaView,TextInput, Dimensions,TouchableOpacity,StyleSheet,Animated} from "react-native";
import IntlPhoneInput from 'react-native-intl-phone-input';
import {loginModel} from '../../models/loginModel'
const { width, height } = Dimensions.get('screen');
import { LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axiosInstance from '../../services/APIService'
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import {useAppDispatch,useAppSelector} from '../redux/hooks'
import { setLoginId } from "../redux/slices/login";
//import appStyle from "../constants/styles"
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const Login = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const[validationmessage, setValidation]=React.useState('');
    const[imageurl, setImageurl]=React.useState(require('../../../assets/doctor.jpg'));
    const[emailinput, setEmail]=React.useState('');
    const[passwordinput, setPassword]=React.useState('');
    const anim = React.useRef(new Animated.Value(0));
    //const successmessage = navigation.getParam('successMessage');
    const successmessage= useAppSelector(state =>state.loginId.signupsuccessmessage);
    const [loading, setLoading] = React.useState(false);


    const startLoading = () => {
      setLoading(!loading);
    };
    React.useEffect(() => {
        try{
            const url=require('../../../assets/doctor.jpg');
            setImageurl(url);
            console.log(successmessage)
        }
        catch(error){
            console.log(error)
        }

    })

    function validation(phoneNumber)
    {
        if(phoneNumber.length  > 10)
        {
            setValidation('');
        }
        else
        {
            setValidation('Please Enter Valid Phone number'); 
        }
        setPhoneNumber(phoneNumber)
    }
    function login()
    {
        try{
            if(passwordinput === '' || emailinput === '' )
            {
               shake()
            }
            else{
                const url = require('../../../assets/url.json');
                const data=new loginModel(emailinput, passwordinput);  
                startLoading();   
                axiosInstance.post(url.loginurl, data).then(response => {
                    setLoading(false);
                    console.log('responselogindetail',response.statuscode);
                    dispatch(setLoginId(response.data["id"]));
                    // if(Platform.OS != 'web')
                    // {
                    //     setLoading(false);
                    //     navigation.navigate('BottomTabs', {
                    //         loginid:response.data["id"]
                    //     });
        
                    // }
                    // else{
                    //     setLoading(false);
                    //     navigation.navigate('SearchInfo', {
                    //         loginid:response.data["id"]
                    //     });
                    // }
        
                }).catch(error =>{
                    shake();
                    setLoading(false);
                    console.log(error);
                })
            }
        }
        catch(error){
            console.log(error);
        }

      
    }
    function continueButton() {
        return (
            <View style={{ marginLeft:10, marginRight:10}}>
                <TouchableOpacity activeOpacity={0.9}
                    onPress={() => login()}
                    style={[styles.buttonstylecss,{width:Platform.OS !='web'? width-20 : 500, }]}
                >

                        <Text style={[styles.textformat]}>
                            Login
                        </Text>
                 
                </TouchableOpacity>
            </View>

        )
    }
    function signupButton() {
        return (
            <View style={{ marginLeft:10, marginRight:10}}>
                <TouchableOpacity activeOpacity={0.9}
                    onPress={() => navigation.navigate('Signup')}
                    style={[styles.buttonstylecss,{width:Platform.OS !='web'? width-20 : 500, }]}
                >

                        <Text style={[styles.textformat]}>
                            Sign Up
                        </Text>
                </TouchableOpacity>
            </View>

        )
    }
    function mobileNumber() {
        return (
            <View style={{paddingTop:height/4, marginLeft:10, marginRight:10}}>
                <IntlPhoneInput
                    
                    phoneInputStyle={{ flex: 1, marginLeft: 30,  color: 'black', fontSize: 16.0 }}
                    onChangeText={({ phoneNumber }) =>validation(phoneNumber) }
                    dialCodeTextStyle={{  color: 'black'}}
                    defaultCountry="IN"
                    placeholder="Enter Mobile Number"
                />

                <Text style={{marginTop:10, color:"red"}}>{validationmessage}</Text>
            </View>

        )
    }
    function password() {
        return (
            <View style={{
                borderRadius: 25
            }}>
                <Animated.View style={{ transform:[{ translateX: anim.current }]}}>
                    <TextInput
                        placeholder='Password'
                        style={{ color: 'black', 
                        fontSize: 16.0 , 
                        backgroundColor:"white",
                        height:50 ,
                        width:Platform.OS !='web'? width-20 : 500, 
                        marginLeft:10, 
                        borderRadius:10, paddingLeft:20}}
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        onChangeText={(data)=>setPassword(data)}
                    />

                </Animated.View>

            </View>
        )
    }
    function email() {
        return (
            <View style={{ borderRadius: 25,  marginBottom:20}}>
                 <Animated.View style={{ transform: [{ translateX: anim.current }] }}>
                    <TextInput
                        placeholder='Email'
                        style={[{ color: 'black', 
                        //fontSize: 16.0 , 
                        backgroundColor:"white",
                        height:50 ,
                        width:Platform.OS !='web'? width-20 : 500, 
                        marginLeft:10, 
                        borderRadius:10, paddingLeft:20},styles.textformat]}
                        
                        placeholderTextColor="black"
                        onChangeText={(data)=>setEmail(data)}
                    />
                 </Animated.View>

            </View>
        )
    }

    function headertext() {
        return (
              <View style={{marginTop:height/6, marginLeft:20, marginBottom:20}}>
                    
                    {
                        successmessage == 'true'?
                        <Text style={[styles.textHeadersize,{paddingTop:20}]}>
                        {'Successfully created account. please login.'}
                    </Text> :    <Text style={[styles.textHeadersize,{paddingTop:20}]}>
                        {'Please login to IYU healthcare to book vedio appointment.'}
                    </Text>
                    }
                       
                    
              </View>
        )
    }



    const shake = React.useCallback(() => {
        // makes the sequence loop
        Animated.loop(
          // runs the animation array in sequence
          Animated.sequence([
            // shift element to the left by 2 units
            Animated.timing(anim.current, {
              toValue: -2,
              duration: 50,
              useNativeDriver: true 
            }),
            // shift element to the right by 2 units
            Animated.timing(anim.current, {
              toValue: 2,
              duration: 50,
              useNativeDriver: true 
            }),
            // bring the element back to its original position
            Animated.timing(anim.current, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true 
            }),
          ]),
          // loops the above animation config 2 times
          { iterations: 2 }
        ).start();
      }, []);


    return (
        
        <SafeAreaView style={{ flex: 1, }}>
            {/* <StatusBar translucent backgroundColor="rgba(0,0,0,0)" /> */}
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                //textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
                />
                <ImageBackground 
                    source={imageurl}
                    style={{ height: Platform.OS !='web'? height : ''}}
                 >
                  
                <ScrollView scrollEventThrottle={16}>
                    {/* {mobileNumber()} */}
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <View >
                            {headertext()}
                            {email()}
                            {password()}
                            {continueButton()}
                            {signupButton()}

                        </View>

                    </KeyboardAvoidingView>
                      
                   
                   
                </ScrollView>
                  
                

            </ImageBackground >
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    phoneNumberContainerStyle: {
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 25,
        marginTop: 19,
    },
    textformat:{
        fontSize:16,
        lineHeight:22,
        //letterSpacing:0,
        fontWeight:'500'
    },
    textHeadersize:{
        fontWeight:'bold',
        fontSize:25,
        lineHeight:35,

    },
    buttonstylecss:{
        backgroundColor:'#316BBE',
        alignItems:'center',
        borderRadius:25, 
        height:50, 
        marginTop:10,
        alignItems:'center',
        paddingTop:12
      }
    
})

Login.navigationOption =  {
    // return {       
    //     header: () => null
    // }
    title: 'Login',
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor:'#343a40'
    }
}

export default Login;

