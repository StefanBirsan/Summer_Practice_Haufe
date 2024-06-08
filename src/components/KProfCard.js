import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button , TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker';


const KProfCard = () => {

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');

    const selectImage = () => {
        const options = {
            noData: true,
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setImage(response);
            }
        }).then(r => console.log(r));
    };

    const handleUpload = () => {
        if (image && name) {
            // Upload the image and name to Firebase Realtime Database
            // This is a placeholder, replace it with your actual upload code
            console.log('Uploading image and name to Firebase Realtime Database...');
        } else {
            alert('Please select an image and enter a name.');
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={selectImage} title="Select Image" />

            <TextInput
                label="Name"
                value={name}
                onChangeText={text => setName(text)}
            />

            <TouchableOpacity onPress={handleUpload} title="Submit"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b123d',
        width: '80%',
        height: '80%'
    }
});


export default KProfCard;