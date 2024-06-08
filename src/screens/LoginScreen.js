import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/Scrips/config";
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with: ', user.email)
                navigation.navigate('Home');
            })
            .catch(error => alert(error.message))
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <Text style={styles.titlez}>La ce ma uit?</Text>
            <View style={styles.inputcontainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.inpu}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.inpu}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.buttos}
                    >
                        <Text style={styles.buttontext}> Login </Text>
                    </TouchableOpacity>
                    <Text style={styles.textsme1}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")} // Using navigation object to navigate
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
        backgroundColor: '#2D3250'
    },
    inputcontainer: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
    },
    buttos: {
        backgroundColor: '#F6B17A',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        elevation: 100,
    },
    buttontext: {
        color: 'black',
        fontWeight: '700',
    },
    buttonContainer: {
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
        borderColor: '#7077A1',
        borderWidth: 4,
    },
    titlez: {
        color: 'white',
        fontFamily: 'Roboto',
        fontWeight: '40',
        fontSize: 50,
        lineHeight: 115.2,
        marginBottom: 60,
        marginRight: 25,
        marginLeft: 25,
    },
    textsme1: {
        fontSize: 13,
        fontFamily: 'Roboto',
        color: 'white',
        marginTop: 20,
    },
    textsme2: {
        fontSize: 13,
        fontFamily: 'Roboto',
        color: 'white',
    },
});

export default LoginScreen;