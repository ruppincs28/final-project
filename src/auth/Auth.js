import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, FAB, IconButton, List, Colors } from 'react-native-paper';
import Header from '../layout/Header';
import { PROD_API } from '../services/ApiService';
import Login from './Login';
import Register from './Register';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Auth(props) {
    const [loggedInAs, setLoggedInAs] = useState("")
    const [categoryId, setCategoryId] = useState("BARONTEN")
    // const [notes, setNotes] = useState([])

    useEffect(() => {
        getAsyncLocalStorage().then(data => {
            if (data !== "") {
                setTimeout(() => props.navigation.navigate('CategoriesView'), 2000);
            }
        });
    }, [])

    const checkAsyncStorageForAuth = () => {
        // IF ASYNC STORAGE HAS TOKEN => NAVIGATE TO APP MAIN SCREEN
        // ELSE SHOW LOGIN PAGE (WHICH HAS LINK TO REGISTER PAGE)



        // fetch(`${PROD_API}/notes/categoryId/${categoryId}`, {
        //     method: 'GET',
        //     headers: new Headers({
        //         'Content-Type': 'application/json; charset=UTF-8',
        //         'Accept': 'application/json; charset=UTF-8'
        //     })
        // })
        //     .then(resp => resp.json(), error => console.log(error))
        //     .then(data => setNotes(data), error => console.log(error))
    }

    const addNote = note => {
        // console.log(note)
        // fetch(`${PROD_API}/notes/categoryId/${categoryId}`, {
        //     method: 'POST',
        //     body: JSON.stringify(note),
        //     headers: new Headers({
        //         'Content-Type': 'application/json; charset=UTF-8',
        //         'Accept': 'application/json; charset=UTF-8'
        //     })
        // })
        //     .then(resp => resp.json())
        //     .then(() => getNotes(), error => console.log(error))
    }

    const deleteNote = note => {
        // console.log(note)
        // fetch(`${PROD_API}/notes/categoryId/${categoryId}`, {
        //     method: 'DELETE',
        //     body: JSON.stringify(note),
        //     headers: new Headers({
        //         'Content-Type': 'application/json; charset=UTF-8',
        //         'Accept': 'application/json; charset=UTF-8'
        //     })
        // })
        //     .then(resp => resp.json())
        //     .then(() => getNotes(), error => console.log(error))
    }

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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    iconButton: {
        elevation: 100,
        backgroundColor: 'blue',
        position: 'absolute',
        right: 0,
        top: 25,
        margin: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 20
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        backgroundColor: 'blue',
        margin: 20,
        right: 0,
        bottom: 10
    },
    listTitle: {
        fontSize: 20
    }

})

export default Auth