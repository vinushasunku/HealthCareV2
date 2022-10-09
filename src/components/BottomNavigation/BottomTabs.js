import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer ,createDrawerNavigator} from 'react-navigation';
import ManageAccount from "../ManageAccount/ManageAccount";
import LabSearch from "../LabSearch/LabSearch"
import HomeConsultation from '../HomeConsultation/HomeConsultation'
// import SearchMain  from "../search/SearchMain";

import { Ionicons } from 'react-native-vector-icons/Ionicons';
import SearchInfo from '../SearchInfo/SearchInfo'
import { Fontisto } from 'react-native-vector-icons/Fontisto'; 
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
const TabNavigator = createAppContainer(
    createBottomTabNavigator(
        {
            // Chat: {
            //     screen: Chat,
            //     navigationOptions: {
            //         tabBarLabel: 'Chat',
            //         tabBarIcon: ({ tintColor, focused }) => (
            //             focused ?
            //                 <TouchableOpacity style={styles.circleStyle}>
            //                     <MaterialIcons name="chat" size={24} color={tintColor} />
            //                 </TouchableOpacity>
            //                 : <MaterialIcons name="chat" size={24} color={tintColor} />
            //         ),
            //     }
            // },
            Manage: {
                screen: ManageAccount,
                navigationOptions: {
                    header: () => null,
                    tabBarLabel: 'Manage',
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Ionicons name="person" size={24} color={'#2F4F4F'} />
                            </TouchableOpacity>
                            : <Ionicons name="person" size={24} color={'#2F4F4F'} />
                    ),
                }
            },
            Lab: {
                screen: LabSearch,
                navigationOptions: {
                    header: () => null,
                    tabBarLabel: 'Tests',
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Fontisto name="blood-test" size={24} color={'#2F4F4F'}/>                              
                            </TouchableOpacity>
                            :  <Fontisto name="blood-test" size={24} color={'#2F4F4F'}/>
                    ),
                }
            },
            Search: {
                screen: HomeConsultation,
                navigationOptions: {
                    header: () => null,
                    title:'Consultation',
                    tabBarLabel: 'Consultation',
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <MaterialCommunityIcons name="video-plus-outline" size={24} color={'#2F4F4F'} />
                                {/* <Ionicons name="search" size={24} color={tintColor} /> */}
                            </TouchableOpacity>
                            : <MaterialCommunityIcons name="video-plus-outline" size={24} color={'#2F4F4F'} />
                    ),
                }
            },
        },
        {
            initialRouteName: "Search",
            barStyle: { backgroundColor: 'white', borderTopWidth:2 },
            tabBarOptions: {
                showLabel: true,
                activeTintColor: '#2F4F4F',
                style: { height: 70.0, elevation: 0.0, borderTopWidth: 1,borderColor:'#eee', paddingTop:5,
                fontSize:16,
                lineHeight:22,
                fontWeight:'500' },
            },
        },
    )
);

export default TabNavigator;

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

