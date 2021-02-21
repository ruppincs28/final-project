import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-paper';
import { JOBS_API } from './services/ApiService';
import { PROD_API } from './services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar } from 'react-native-paper';
import * as Location from 'expo-location';

class JobFavorites extends Component {
    state = {
        jobs: []
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            console.log("RAN THIS")
            this.getJobs();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getJobs() {
        this.asyncGetUserNameFromLocalStorage().then(username => {
            fetch(`${PROD_API}/jobs/username/${username}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8'
                })
            })
                .then(resp => resp.json(), error => console.log(error))
                .then(data => this.setState({ jobs: data }), error => console.log(error))
        })
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

    renderJobs() {
        return this.state.jobs.map(job => {
            const {
                Url,
                Title,
                Id,
                Company,
                CreatedAt,
                CompanyLogo
            } = job;

            return (
                <Card title={Title} key={Id}>
                    <View style={{ height: 220 }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image source={{ uri: CompanyLogo }} style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                resizeMode: 'center',
                                height: 100,
                                width: 200
                            }} />
                        </View>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{Company}</Text>
                            <Text style={styles.italics}>{this.formatDate(CreatedAt)}</Text>
                        </View>
                        <Button color="#03A9F4" icon="briefcase" mode="contained" onPress={() => Linking.openURL(Url)}>
                            Apply Now!
                        </Button>
                        <Button style={{ marginTop: 7 }} color="pink" icon="cards-heart" mode="contained" onPress={() => Linking.openURL(Url)}>
                            Add to favorites!
                        </Button>
                    </View>
                </Card>
            );
        });
    }

    render() {
        return this.state.jobs.length !== 0 ?
            <>
                <ScrollView style={{ marginTop: 20 }}>
                    {this.renderJobs()}
                </ScrollView>
            </>
            :
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Fetching favorite jobs...</Text>
            </View>
    }
}

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
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

export default withNavigation(JobFavorites);