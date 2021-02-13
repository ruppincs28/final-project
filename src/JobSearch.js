import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import { parse } from 'fast-xml-parser';
import { Card, Icon } from 'react-native-elements';
import { Button } from 'react-native-paper';
import MapView from 'react-native-maps';
import { JOBS_API } from './services/ApiService';
import { Searchbar } from 'react-native-paper';

export default class JobSearch extends Component {
    state = {
        search: '',
        jobs: []
    };

    componentDidMount() {
        fetch(`${JOBS_API}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(resp => resp.text(), error => console.log(error))
            .then(str => parse(str))
            .then(data => this.setState({ jobs: data.rss.channel.item }), error => console.log(error))
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    renderJobs() {
        return this.state.jobs.map(job => {
            const {
                link,
                title,
                guid,
                pubDate
            } = job;
            const company = job["a10:author"]["a10:name"];

            return (
                <Card title={title} key={guid}>
                    <View style={{ height: 220 }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image source={{ uri: "https://logo.uplead.com/takeaway.com" }} style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                resizeMode: 'center',
                                height: 100,
                                width: 200
                            }} />
                        </View>
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{pubDate.replace("Z", "")}</Text>
                        </View>
                        {/* <Button
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(link)}
                        /> */}
                        <Button color="blue" icon="briefcase" mode="contained" onPress={() => Linking.openURL(link)}>
                            Apply Now!
                        </Button>
                        <Button style={{ marginTop: 7 }} color="pink" icon="cards-heart" mode="contained" onPress={() => Linking.openURL(link)}>
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
