import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, StatusBar, Dimensions, SafeAreaView, StyleSheet } from "react-native";


// import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

const ProfileScreen = ({ navigation }) => {
    return <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <StatusBar translucent={false}  />
    <ScrollView>
        <TouchableOpacity activeOpacity={0.9}>
        </TouchableOpacity>

    </ScrollView>
</SafeAreaView>
}

ProfileScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}
export default ProfileScreen;