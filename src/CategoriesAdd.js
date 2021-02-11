import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, IconButton, TextInput, FAB } from 'react-native-paper';
import Header from './layout/Header';
import { v4 as uuidv4 } from 'uuid';

function CategoriesAdd({ navigation }) {
    const [categoryTitle, setCategoryTitle] = useState('')

    function onSaveCategory() {
        navigation.state.params.addCategory({ ID: uuidv4(), Name: categoryTitle, Counter: 0 })
        navigation.goBack()
    }

    return (
        <>
            <Header titleText='Add a New Category' />
            <IconButton
                icon="close"
                size={25}
                color='white'
                onPress={() => navigation.goBack()}
                style={styles.iconButton}
            />

            <View style={styles.container}>
                <TextInput
                    label="Add Category name here"
                    value={categoryTitle}
                    mode='outlined'
                    onChangeText={setCategoryTitle}
                    style={styles.title}
                />
                <FAB
                    style={styles.fab}
                    small
                    icon="check"
                    disabled={categoryTitle == '' ? true : false}
                    onPress={() => onSaveCategory()}
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
        fontSize: 24,
        marginBottom: 16
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#219653'
    }

})

export default CategoriesAdd