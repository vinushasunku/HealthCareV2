import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import ZegoUIKitPrebuiltCall from '@zegocloud/zego-uikit-prebuilt-call-rn';
import SafeAreaView from "react-native-safe-area-view";
import {useAppSelector} from '../redux/hooks'

const VideoCall = ({navigation}) => {
    const userInfo = {
        roomId: useAppSelector(state => state.loginId.orderId),
        userId:  useAppSelector(state => state.loginId.loginId),
        userName:  useAppSelector(state => state.loginId.userName),
        token:  useAppSelector(state => state.loginId.videoToken),
        streamId: "patient"
    }

    function endCall() {
        navigation.goBack();
    }

    return (
        <SafeAreaView>
        <View style={styles.container}>
            
            <ZegoUIKitPrebuiltCall
                appID={85581467}
                appSign='a119dbb1eb981bd34b08c2f986729a23bc73eb1d7fa7a62509ef39fc2f3af09c'
                userID={userInfo.userId}
                userName={userInfo.userName}
                callID={userInfo.roomId} 

                config={{
                    onHangUp: endCall,
                    bottomMenuBarConfig: {
                        buttons: [2,4],
                        hideAutomatically: false,
                        hideByClick: false,
                    }
                }}
            />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
});

export default VideoCall;