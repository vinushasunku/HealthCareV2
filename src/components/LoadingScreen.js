
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'Red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
