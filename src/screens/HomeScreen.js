import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AddRevButton from "../components/KaddRev";
import CustomImage from "../components/KMovList";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <CustomImage source={require('../movies/mayorofKingstown.jpg')} title={'Mayor of Kingstown'} />https://github.com/StefanBirsan/Summer_Practice_Haufe.githttps://github.com/StefanBirsan/Summer_Practice_Haufe.gitgikawnwekaklekalwjlkrjalrklarjawj
            </ScrollView>
            <AddRevButton style={styles.addButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e2f64',
    },
    scrollView: {
        alignItems: 'center',
        padding: 10,
        marginTop: 50, // Add this line
    },
    addButton: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
});

export default HomeScreen;