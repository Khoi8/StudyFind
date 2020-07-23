/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

import { db, auth } from '../config';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import { Container } from 'reactstrap';
import TextField from '../components/TextField';
import Buttons from '../components/Buttons';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 0,
        justifyContent: 'center',
        height: 650 
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        paddingBottom: 30,
        color:'#377dff',
        fontWeight: 'bold',
    },
    title2: {
        textAlign: 'left',
        fontSize: 20,
        paddingTop: 30,
        paddingBottom: 30,
        color:'#708090',
        fontWeight: 'bold',
    }
});

export default class SignUp extends Component {
    state = {
        username: '',
        password: '',
        cpass: ''
    }

    handleChange(type) {
        return (text) => {
            this.setState({
                [type]: text
            })
        }
    }

    handleSubmit = () => {
        if (this.state.password == this.state.cpass) {
            auth.createUserWithEmailAndPassword(this.state.username, this.state.password).then(cred => {
                auth.currentUser.sendEmailVerification().then(val => {
                    alert('A verification email has been sent to you')
                    console.log(auth.currentUser.uid)
                }).catch(err => {
                    alert(err)
                })
                this.props.navigation.navigate('Info')
            }).catch(error => {
                console.log(error)
                alert(error)
            })
        } else {
            alert('Passwords do not match')
        }
    }

    render() {
        return( <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View><Text style={styles.title}>StudyFind</Text></View>
                <View><Text style={styles.title2}>Create Your Account</Text></View>
                <TextField placeholder='Email' secureTextEntry={false} onChangeText={this.handleChange('username')}></TextField>
                <TextField placeholder='Password' secureTextEntry={true} onChangeText={this.handleChange('password')}></TextField>
                <TextField placeholder='Confirm Password' secureTextEntry={true} onChangeText={this.handleChange('cpass')}></TextField>
                <Buttons title= "Create an Account" onPress={this.handleSubmit}></Buttons>
                <Buttons title= "Already have an Account?" onPress={() => this.props.navigation.navigate('Login')}></Buttons>
                </KeyboardAvoidingView>
        );
    };
};
