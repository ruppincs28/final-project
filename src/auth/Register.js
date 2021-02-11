import React, { Component } from "react";
import { StyleSheet, Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

export default class Register extends Component {

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>
                                CODE
                                <Text style={styles.logoTextJob}>JOB</Text>
                            </Text>
                            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
                            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                            <TextInput placeholder="Verify Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                            <Button
                                buttonStyle={styles.loginButton}
                                onPress={() => this.onRegisterPress()}
                                title="Register"
                            />
                            <Button
                                buttonStyle={styles.fbLoginButton}
                                onPress={() => this.props.navigation.goBack()}
                                title="Back to Login"
                                color="#3897f1"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onRegisterPress() {

    }
}


const styles = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    logoTextJob: {
        color: "#16BDC5",
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginLeft: 75,
        marginRight: 75,
        marginTop: 10,
    },
    fbLoginButton: {
        height: 45,
        marginTop: 10,
        alignItems: 'center',
        marginLeft: 75,
        marginRight: 75,
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
})
