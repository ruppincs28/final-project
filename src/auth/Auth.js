import React, { useState, useEffect } from 'react';
import Login from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Auth(props) {
    const [loggedInAs, setLoggedInAs] = useState("")

    useEffect(() => {
        getAsyncLocalStorage().then(data => {
            if (data !== "") {
                // Let the splash screen show for a while
                setTimeout(() => props.navigation.navigate('DashboardTab'), 2000);
            }
        });
    }, [])

    const getAsyncLocalStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('loggedInAs');
            console.log(value);
            if (value !== null) {
                return value;
            } else {
                return "";
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Login navigation={props.navigation} />
    )
}

export default Auth