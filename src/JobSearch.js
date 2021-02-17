import React, { Component } from 'react';
import { Alert, View, Text, Image, ScrollView, Linking } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Button } from 'react-native-paper';
import MapView from 'react-native-maps';
import { JOBS_API } from './services/ApiService';
import { PROD_API } from './services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar } from 'react-native-paper';
import * as Location from 'expo-location';

export default class JobSearch extends Component {
    state = {
        search: '',
        location: '',
        jobs: []
    };

    async componentDidMount() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        this.setState({ location: location })

        this.getJobs();
    }

    getJobs() {
        console.log(`${JOBS_API}lat=${this.state.location.coords.latitude}&long=${this.state.location.coords.longitude}`)
        fetch(`${JOBS_API}lat=${this.state.location.coords.latitude}&long=${this.state.location.coords.longitude}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(resp => resp.json(), error => console.log(error))
            .then(data => this.setState({ jobs: data }), error => console.log(error))
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    async asyncGetUserNameFromLocalStorage() {
        try {
            const value = await AsyncStorage.getItem('loggedInAs');
            if (value !== null) {
                return value;
            } else {
                return "";
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleAddToFavorites(username, job) {
        fetch(`${PROD_API}/jobs/username/${username}`, {
            method: 'POST',
            body: JSON.stringify(job),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(resp => resp.json())
            .then(() => Alert.alert(
                'Job added to favorites successfully'
            ), error => console.log(error))
    }

    renderJobs() {
        return this.state.jobs.map(job => {
            const {
                url,
                title,
                id,
                company,
                created_at,
                how_to_apply,
                company_logo
            } = job;

            return (
                <Card title={title} key={id} jobId={id}>
                    <View style={{ height: 220 }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image source={{ uri: company_logo }} style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                resizeMode: 'center',
                                height: 100,
                                width: 200
                            }} />
                        </View>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{this.formatDate(created_at)}</Text>
                        </View>
                        <Button color="#03A9F4" icon="dots-horizontal-circle" mode="contained" onPress={() => Linking.openURL(url)}>
                            Show more
                        </Button>
                        <Button style={{ marginTop: 7 }} color="pink" icon="cards-heart" mode="contained"
                            onPress={() => this.asyncGetUserNameFromLocalStorage().then(username => this.handleAddToFavorites(username, {
                                Id: id,
                                Title: title,
                                Company: company,
                                CreatedAt: created_at,
                                Url: url,
                                CompanyLogo: company_logo
                            }))}>
                            Add to favorites!
                        </Button>
                    </View>
                </Card>
            );
        });
    }

    render() {
        const { search } = this.state;

        return this.state.jobs.length !== 0 ?
            <>
                <Searchbar
                    placeholder="Search for a position"
                    onChangeText={this.updateSearch}
                    value={search}
                    style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}
                />
                <ScrollView style={{ marginTop: 20 }}>
                    {this.renderJobs()}
                </ScrollView>
            </>
            :
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Searching for jobs in your area...</Text>
            </View>
    }
}

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 24
    },
    searchBar: {
        position: 'absolute',
        left: 10,
        top: 10,
        right: 10,
        height: 50,
        zIndex: 1,
        backgroundColor: 'white'
    }
};
