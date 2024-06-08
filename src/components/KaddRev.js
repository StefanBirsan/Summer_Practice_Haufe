import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View, TextInput, Button, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';
import { dbRef } from '../firebase/Scrips/config';
import {push, child, set} from 'firebase/database';
import { ref as sRef } from 'firebase/storage'

import AsyncStorage from "@react-native-async-storage/async-storage";

const AddRevButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(3);
    const [movieName, setMovieName] = useState('');

    const handleAddImage = async () => {
        let userID;
        try {
            userID = await AsyncStorage.getItem('userID');
        } catch (error) {
            console.error(error);
        }
        console.log('*****12', userID);
        console.log('*****13');
        const newMovieRef = push(child(dbRef, userID));
        console.log('*****');
        console.log(newMovieRef.key);

        set(child(dbRef, `${userID}/${newMovieRef.key}`), {
            movieName: movieName,
            imageName: imageUri,
            location: location,
            rating: rating,
        })
            .then(() => console.log('Data set.'))
            .catch((error) => console.error(error));
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 10],
            quality: 1,

        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="Movie/Series Name"
                            value={movieName}
                            onChangeText={setMovieName}
                            style={styles.modalText}
                        />
                        <Button title="Pick Image" onPress={pickImage} color="#800080" />
                        <TextInput
                            placeholder="Review description"
                            value={location}
                            onChangeText={setLocation}
                            style={styles.modalText}
                        />
                        <Rating
                            showRating
                            onFinishRating={setRating}
                            style={{ paddingVertical: 10 }}
                        />
                        <Button title="Add Image" onPress={handleAddImage} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    text: {
        color: 'white',
        fontSize: 36,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default AddRevButton;