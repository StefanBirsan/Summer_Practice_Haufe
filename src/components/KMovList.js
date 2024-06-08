import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View, TextInput, Button, Image ,Alert } from 'react-native';

import { Rating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';
import { dbRef } from '../firebase/Scrips/config';
import {push, child, set} from 'firebase/database';
import { ref as sRef } from 'firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

const  CustomImage= ({source, title}) => {
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
            movieName: title,
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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={source} style={{ width: 100, height: 150 }} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View>
                    <TextInput
                        placeholder="Movie/Series Name"
                        value={movieName}
                        onChangeText={setMovieName}
                    />
                    <Button title="Pick Image" onPress={pickImage} />
                    <TextInput
                        placeholder="Review description"
                        value={location}
                        onChangeText={setLocation}
                    />
                    <Rating
                        showRating
                        onFinishRating={setRating}
                        style={{ paddingVertical: 10 }}
                    />
                    <Button title="Add Image" onPress={handleAddImage} />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </>
    );
};

export default CustomImage;


const styles = StyleSheet.create({
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
