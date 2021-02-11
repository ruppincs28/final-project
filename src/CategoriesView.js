import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, FAB, List } from 'react-native-paper';
import Header from './layout/Header';
import { PROD_API } from './services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CategoriesView({ navigation }) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = () => {
        fetch(`${PROD_API}/categories`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(resp => resp.json(), error => console.log(error))
            .then(data => setCategories(data), error => console.log(error))
    }

    const addCategory = category => {
        console.log(category)
        fetch(`${PROD_API}/categories`, {
            method: 'POST',
            body: JSON.stringify(category),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(resp => resp.json())
            .then(() => getCategories(), error => console.log(error))
    }

    const chooseCategory = (id) => {
        console.log(`chose ${id}`)
        navigation.navigate('NotesView', {
            refreshFunc: getCategories,
            chosenCategoryID: id
        })
    }

    const removeFew = async () => {
        const allKeys0 = await AsyncStorage.getAllKeys() 
        console.log(allKeys0)
        const keys = ['loggedInAs']
        try {
            await AsyncStorage.multiRemove(keys)
        } catch (e) {
            // remove error
        }
        console.log('Done')
        const allKeys = await AsyncStorage.getAllKeys() 
        console.log(allKeys)
    }

    return (
        <>
            <Header titleText='Categories' />
            <View style={styles.container}>
                {categories.length === 0 ? (
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>You do not have any categories</Text>
                    </View>
                ) : (
                        <FlatList
                            data={categories}
                            renderItem={({ item }) => (
                                <List.Item
                                    title={item.Name}
                                    titleStyle={styles.listTitle}
                                    right={props => <Text {...props} style={{ fontSize: 22, color: 'blue', marginTop: 5 }}>{item.Counter}</Text>}
                                    onPress={() => chooseCategory(item.ID)}
                                />
                            )}
                            keyExtractor={item => item.ID.toString()}
                        />
                    )}

                <FAB
                    style={styles.fab}
                    small
                    icon='plus'
                    label='Add a new Category'
                    onPress={async () => await removeFew()}
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
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 24
    },
    fab: {
        backgroundColor: '#219653',
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 10
    },
    listTitle: {
        fontSize: 24
    }

})

export default CategoriesView