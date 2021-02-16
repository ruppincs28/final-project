import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Button } from 'react-native-paper';
import MapView from 'react-native-maps';
import { JOBS_API } from './services/ApiService';
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

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location })

        this.getJobs();
    }

    getJobs() {
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
                <Card title={title} key={id}>
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
                        {/* <Button
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(link)}
                        /> */}
                        <Button color="blue" icon="briefcase" mode="contained" onPress={() => Linking.openURL(url)}>
                            Apply Now!
                        </Button>
                        <Button style={{ marginTop: 7 }} color="pink" icon="cards-heart" mode="contained" onPress={() => Linking.openURL(url)}>
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
                <Text style={styles.title}>No jobs were found</Text>
            </View>
            ;
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
