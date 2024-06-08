import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import KProfCard from "../components/KProfCard";

const ProfileCardScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Profile Card Screen</Text>
            <KProfCard/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProfileCardScreen;