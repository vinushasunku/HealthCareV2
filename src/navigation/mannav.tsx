import React,{useEffect} from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageAccount from "../components/ManageAccount/ManageAccount";
import LabSearch from "../components/LabSearch/LabSearch"
import LabDetail from '../components/LapDetail/LabDetail'
import FamilyMember from '../components/FamilyMember/FamilyMember'
import HomeConsultation from '../components/HomeConsultation/HomeConsultation';
import SearchInfo from '../components/SearchInfo/SearchInfo';
import DoctorProfile from '../components/Doctors/DoctorProfile';
import AppointmentBooking from '../components/AppointmentBooking/AppointmentBooking';
import Payment from '../components/Payment/Payment';
import ConfirmOrder from '../components/ConfirmOrder/ConfirmOrder'
import TimeSlots from '../components/Doctors/TimeSlots'
import ManagefamilyMembers from '../components/ManageAccount/ManagefamilyMembers'
import AddMembers from '../components/ManageAccount/AddMembers'
import Signup from '../components/LoginAuthentication/Signup'
import BookingList from '../components/Booking/BookingList'

import BookDetail from '../components/Booking/BookDetail';
import Login from '../components/LoginAuthentication/Login';
import Icon from "react-native-vector-icons/Ionicons";
import Fontisto  from 'react-native-vector-icons/Fontisto'; 
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, StyleSheet } from "react-native";
import {NavigationContainer, getFocusedRouteNameFromRoute,Route, TabRouter}  from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import {useAppSelector} from '../components/redux/hooks';

Icon.loadFont()
const MainStack=createNativeStackNavigator();
const HomeStack=createNativeStackNavigator();
const ManageStack=createNativeStackNavigator();
const TestStack=createNativeStackNavigator();
const SearchStack=createNativeStackNavigator();
function HomeStackNav(){

    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Consultation" component={HomeConsultation} 
            options={({route}) => ({headerTitle:'Consultation',headerBackVisible:false,headerTitleAlign:'center'})}   />
              <HomeStack.Screen name="SearchInfo" component={SearchInfo} 
            options={({route}) => ({headerTitle:'',headerTitleAlign:'center'})}   />
             <HomeStack.Screen name="DoctorProfile" component={DoctorProfile} 
            options={({route}) => ({headerTitle:'Doctor Details',headerTitleAlign:'center'})}   />
             <HomeStack.Screen name="AppointmentBooking" component={AppointmentBooking} 
            options={({route}) => ({headerTitle:'Booking Information',headerTitleAlign:'center'})}   />
            <HomeStack.Screen name="Payment" component={Payment} 
            options={({route}) => ({headerTitle:'Payment details',headerTitleAlign:'center'})}   />
            <HomeStack.Screen name="TimeSlots" component={TimeSlots} 
            options={({route}) => ({headerTitle:'Please select slot',headerTitleAlign:'center'})}   />
            <HomeStack.Screen name="ConfirmOrder" component={ConfirmOrder} 
            options={({route}) => ({headerTitle:'Conform Order',headerTitleAlign:'center'})}   />
            <TestStack.Screen name="LabSearch" component={LabSearch} 
            options={({route}) => ({headerTitle:'Select test',headerBackVisible:false,headerTitleAlign:'center'})}   />
                        <TestStack.Screen name="LabDetail" component={LabDetail} 
            options={({route}) => ({headerTitle:'Test package detail',headerBackTitle:'Back', headerTitleAlign:'center'})}   />
            <TestStack.Screen name="FamilyMember" component={FamilyMember} 
            options={({route}) => ({headerTitle:'Select family member and slots',headerBackTitle:'Back',headerTitleAlign:'center'})}   />
        </HomeStack.Navigator>
    )

}

function SearchStackNav(){

    return(
        <SearchStack.Navigator>
            <SearchStack.Screen name="SearchInfo" component={SearchInfo} 
            options={({route}) => ({headerTitle:'',headerTitleAlign:'center'})}   />
             <SearchStack.Screen name="DoctorProfile" component={DoctorProfile} 
            options={({route}) => ({headerTitle:'Doctor Details',headerTitleAlign:'center'})}   />
             <SearchStack.Screen name="AppointmentBooking" component={AppointmentBooking} 
            options={({route}) => ({headerTitle:'Booking Information',headerTitleAlign:'center'})}   />
            <SearchStack.Screen name="Payment" component={Payment} 
            options={({route}) => ({headerTitle:'Payment details',headerTitleAlign:'center'})}   />
            <SearchStack.Screen name="TimeSlots" component={TimeSlots} 
            options={({route}) => ({headerTitle:'Please select slot',headerTitleAlign:'center'})}   />
            <SearchStack.Screen name="ConfirmOrder" component={ConfirmOrder} 
            options={({route}) => ({headerTitle:'Conform Order',headerTitleAlign:'center'})}   />
        </SearchStack.Navigator>
    )

}

function ManageStackNav(){

    return(
        <ManageStack.Navigator>
            <ManageStack.Screen name="Manage" component={ManageAccount} 
            options={({route}) => ({headerTitle:'Profile',headerBackVisible:false,headerTitleAlign:'center'})}   />
                        <ManageStack.Screen name="ManagefamilyMembers" component={ManagefamilyMembers} 
            options={({route}) => ({headerTitle:'Manage family members',headerTitleAlign:'center'})}   />
                        <ManageStack.Screen name="AddMembers" component={AddMembers} 
            options={({route}) => ({headerTitle:'Add Members',headerTitleAlign:'center'})}   />
                  <ManageStack.Screen name="BookingList" component={BookingList} 
            options={({route}) => ({headerTitle:'Book History',headerTitleAlign:'center'})}   />
                     <ManageStack.Screen name="BookDetail" component={BookDetail} 
            options={({route}) => ({headerTitle:'View Booking Details',headerTitleAlign:'center'})}   />
                     <ManageStack.Screen name="TimeSlots" component={TimeSlots} 
            options={({route}) => ({headerTitle:'Please select slot',headerTitleAlign:'center'})}   />
                    <ManageStack.Screen name="Login" component={Login} 
            options={({route}) => ({headerTitle:'Login',headerTitleAlign:'center'})}   />
             {/* <HomeStack.Screen name="Details" component={HomeConsultation} 
            options={({route}) => ({headerTitle:'Doctor Details',headerTitleAlign:'center'})}   /> */}

        </ManageStack.Navigator>
    )

}

function TestStackNav(){

    return(
        <TestStack.Navigator>
            <TestStack.Screen name="LabSearch" component={LabSearch} 
            options={({route}) => ({headerTitle:'Select test',headerBackVisible:false,headerTitleAlign:'center'})}   />
            <TestStack.Screen name="LabDetail" component={LabDetail} 
            options={({route}) => ({headerTitle:'Test package detail',headerBackTitle:'Back', headerTitleAlign:'center'})}   />
            <TestStack.Screen name="FamilyMember" component={FamilyMember} 
            options={({route}) => ({headerTitle:'Select family member and slots',headerBackTitle:'Back',headerTitleAlign:'center'})}   />
            <TestStack.Screen name="Payment" component={Payment} 
            options={({route}) => ({headerTitle:'Payment details',headerTitleAlign:'center'})}   />
             {/* <HomeStack.Screen name="Details" component={HomeConsultation} 
            options={({route}) => ({headerTitle:'Doctor Details',headerTitleAlign:'center'})}   /> */}

        </TestStack.Navigator>
    )

}

const Tab= createBottomTabNavigator();
const screenOptions = {
    tabBarStyle:{
      backgroundColor:'white',
      height:100,
    },
    tabBarItemStyle:{
      backgroundColor:'white',
      margin:5,
      borderRadius:10,
    }
  };
function MainTab(){
    return(
        <Tab.Navigator {...{screenOptions}} >
            <Tab.Screen name="HomeStack" component={HomeStackNav} 
            options={
                {
                    headerShown:false,title:'Home',
                    tabBarIcon: ({  focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Icon name="home" size={24} color={'#2F4F4F'} />
                                {/* <Ionicons name="search" size={24} color={tintColor} /> */}
                            </TouchableOpacity>
                            : <Icon name="home" size={24} color={'#2F4F4F'} />
                   
                    ),
                }
            }
            />
        <Tab.Screen name="SearchStackNav" component={SearchStackNav} 
            options={
                {
                    headerShown:false,title:'Consulation',
                    tabBarIcon: ({  focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <MaterialCommunityIcons name="account-search" size={24} color={'#2F4F4F'} />
                                {/* <Ionicons name="search" size={24} color={tintColor} /> */}
                            </TouchableOpacity>
                            : <MaterialCommunityIcons name="account-search" size={24} color={'#2F4F4F'} />
                   
                    ),
                }
            }
            />

        <Tab.Screen name="TestStack" component={TestStackNav} 
            options={
                {
                    headerShown:false,title:'Tests',
                     tabBarIcon: ({ focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Fontisto name="blood-test" size={24} color={'#2F4F4F'}/>                              
                            </TouchableOpacity>
                            :  <Fontisto name="blood-test" size={24} color={'#2F4F4F'}/>
                    ),
                }
            }
            />

            <Tab.Screen name="ManageStack" component={ManageStackNav} 
            options={
                {
                    headerShown:false,title:'Manage',
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Icon name="person" size={24} color={'#2F4F4F'} />
                            </TouchableOpacity>
                            : <Icon name="person" size={24} color={'#2F4F4F'} />
                    ),
                }
            }
            />

        </Tab.Navigator>
    )
}

export function MainNav(){
    const loginid = useAppSelector(state => state.loginId.loginId);
    console.log("loginidmannav"+loginid)
    return(
        <>
           <NavigationContainer>
               <MainStack.Navigator initialRouteName="Login">
                {
                    loginid === undefined  || loginid === ''?    
                    <>
                        <MainStack.Screen name="Login" component={Login}  options={{headerShown:false}}/>
                        <MainStack.Screen name="Signup" component={Signup}  options={{headerShown:false,headerBackVisible:true}}/>
                    </>

                    :<MainStack.Screen name="Main" component={MainTab}  options={{headerShown:false}}/>
                }
           
                 

               </MainStack.Navigator>
           </NavigationContainer>
        </>
    )
}

export default MainNav;

const styles = StyleSheet.create({
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
});