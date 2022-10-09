import React from "react";
import { Text, View, Image, StatusBar, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

const Chat = ({ navigation }) => {
    function doctors() {
        return(
            <View>
                <Text>test chat component</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent={false} backgroundColor="black" />
            <View >
                <Text>Chats</Text>
            </View>
            {doctors()}
        </SafeAreaView>
    )
}

Chat.navigationOptions = {
    title: 'Chats',
}

export default Chat;

