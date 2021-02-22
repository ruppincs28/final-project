import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoriesView from '../CategoriesView';
import JobSearch from '../JobSearch';
import JobFavorites from '../JobFavorites';
import Profile from '../Profile';

const FourthScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Fourth!</Text>
        </View>
    );
}

const DashboardTabScreen = createBottomTabNavigator(
    {
        JobSearch: {
            screen: JobSearch,
            navigationOptions: {
                tabBarLabel: 'Job Search',
                tabBarIcon: ({ tintColor }) => {
                    return <MaterialCommunityIcons name="magnify" color={tintColor} size={25} />;
                }
            }
        },
        JobFavorites: {
            screen: JobFavorites,
            navigationOptions: {
                tabBarLabel: 'Favorites',
                tabBarIcon: ({ tintColor }) => {
                    return <MaterialCommunityIcons name="heart" color={tintColor} size={25} />;
                }
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({ tintColor }) => {
                    return <MaterialCommunityIcons name="account" color={tintColor} size={25} />;
                }
            }
        },
        Fourth: {
            screen: FourthScreen,
            navigationOptions: {
                tabBarLabel: 'About',
                tabBarIcon: ({ tintColor }) => {
                    return <MaterialCommunityIcons name="cloud-question" color={tintColor} size={25} />;
                }
            }
        }
    },
    {
        initialRouteName: 'Profile',
        tabBarOptions: {
            activeTintColor: '#e91e63',
            showIcon: true
        }
    }
);

export default DashboardTabScreen;