import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesView from '../CategoriesView'
import CategoriesAdd from '../CategoriesAdd'
import NotesView from '../NotesView'
import NotesAdd from '../NotesAdd'
import Login from '../auth/Login'
import Splash from '../layout/Splash'
import Register from '../auth/Register'
import Auth from '../auth/Auth';

const StackNavigator = createStackNavigator(
    {
        CategoriesView: {
            screen: CategoriesView
        },
        CategoriesAdd: {
            screen: CategoriesAdd
        },
        NotesView: {
            screen: NotesView
        },
        // NotesAdd: {
        //     screen: NotesAdd
        // },
        Splash: {
            screen: Splash
        },
        Auth: {
            screen: Auth
        },
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        }
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none',
        mode: 'modal'
    }
)

export default createAppContainer(StackNavigator)