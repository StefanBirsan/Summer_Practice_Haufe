import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {auth, db} from "../firebase/Scrips/config";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {ref , set } from 'firebase/database';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const dataAddOn =  (userUID) => {
        console.log(userUID)
        set(ref(db, `${userUID}`), {


                reviews : "empty",
                friends : "empty",


            },
        )
            .then(
                response => {
                    console.log("Am ajuns aici")
                }
            )
            .catch((error) => console.error(error));
        console.log("Am ajuns si aci")
    };

    const handleSingUP =  async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then( async (userCredentials) => {
                const user = userCredentials.user;
                console.log(user.email);

                let id = userCredentials.user.uid;
                dataAddOn(id)
                console.log(id);

                // Save the user's ID to AsyncStorage
                try {
                    await AsyncStorage.setItem('userID', id);
                } catch (error) {
                    console.error(error);
                }

                navigation.navigate('Home');
            })
            .catch(error => alert(error.message))
    };

    return (
        <KeyboardAvoidingView

            style={styles.container}

            behavior='padding'

        >
            <View style={styles.inputcontainer}>


                <TextInput

                    placeholder="Email"

                    value={email}
                    onChangeText={text => setEmail(text)}

                    style={styles.inpu}
                    autoCapitalize="none"
                >
                </TextInput>

                <TextInput

                    placeholder="Password"

                    value={password}
                    onChangeText={text => setPassword(text) }

                    style={styles.inpu}
                    secureTextEntry={true}
                    autoCapitalize="none"
                >
                </TextInput>

                <View style={styles.buttonContainer}>



                    <TouchableOpacity
                        onPress={handleSingUP}
                        style={[styles.buttos, styles.buttonoutline]}
                    >

                        <Text style={styles.buttontext}> Register </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#332941'

    },

    inputcontainer: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
    },

    buttos : {

        backgroundColor: '#F6B17A',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',

    },

    buttontext : {

        color : 'black',
        fontWeight: '700',


    },

    buttonContainer : {

        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 32,

    },

    inpu: {

        paddingHorizontal: 15,
        backgroundColor: 'white',
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: 5,
        padding: 15,
        borderRadius: 10,

    },

    buttonoutline: {

        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#864AF9',
        borderWidth: 4,

    },

});


export default RegisterScreen