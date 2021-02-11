import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, FAB, IconButton, List, Colors } from 'react-native-paper';
import Header from './layout/Header';
import { PROD_API } from './services/ApiService';

function NotesView({ navigation }) {
    const [categoryId, setCategoryId] = useState(navigation.state.params.chosenCategoryID)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        fetch(`${PROD_API}/notes/categoryId/${categoryId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(resp => resp.json(), error => console.log(error))
            .then(data => setNotes(data), error => console.log(error))
    }

    const addNote = note => {
        console.log(note)
        fetch(`${PROD_API}/notes/categoryId/${categoryId}`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(resp => resp.json())
            .then(() => getNotes(), error => console.log(error))
    }

    const deleteNote = note => {
        console.log(note)
        fetch(`${PROD_API}/notes/categoryId/${categoryId}`, {
            method: 'DELETE',
            body: JSON.stringify(note),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(resp => resp.json())
            .then(() => getNotes(), error => console.log(error))
    }

    return (
        <>
            <Header titleText='Notes' />
            <IconButton
                icon="close"
                size={25}
                color='white'
                onPress={() => {
                    if (typeof navigation.state.params.refreshFunc === 'function') {
                        navigation.state.params.refreshFunc();
                    }
                    navigation.goBack();
                }}
                style={styles.iconButton}
            />

            <View style={styles.container}>
                {notes.length === 0 ? (
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>You do not have any Notes</Text>
                    </View>
                ) : (
                        <FlatList
                            data={notes}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.content}>
                                        <View style={styles.leftIcon}>
                                            <Image source={{ uri: item.Img }} style={{ width: 20, height: 20 }} />
                                        </View>
                                        <List.Item
                                            style={{ width: '100%' }}
                                            title={item.Name}
                                            description={item.Description}
                                            descriptionNumberOfLines={1}
                                            titleStyle={styles.listTitle}
                                            right={props => <TouchableOpacity onPress={() => deleteNote(item)}><List.Icon {...props} color={Colors.red500} icon="delete" /></TouchableOpacity>}
                                        />
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.ID.toString()}
                        />
                    )}

                <FAB
                    style={styles.fab}
                    small
                    icon='plus'
                    label='Add a new Note'
                    onPress={() => navigation.navigate('NotesAdd', {
                        addNote
                    })
                    }
                />
            </View>
        </>
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
        backgroundColor: '#219653',
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
        backgroundColor: '#219653',
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 10
    },
    listTitle: {
        fontSize: 20
    }

})

export default NotesView