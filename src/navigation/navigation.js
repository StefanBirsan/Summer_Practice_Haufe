import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileCardScreen from "../screens/ProfileAddScreen";
import HomeScreen from "../screens/HomeScreen";


const Stack = createStackNavigator();

export const AppNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName={'Login'}
        >
            <Stack.Screen name="Login"
                          component={LoginScreen}
                          options={{ headerShown: false }}
            />

            <Stack.Screen name="Register"
                          component={RegisterScreen}
                          options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Profile"
                component={ProfileCardScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    </NavigationContainer>
);