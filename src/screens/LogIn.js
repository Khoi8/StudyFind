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
    Alert,
    navigation
} from 'react-native';
import { db, auth } from '../config';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import TextField from '../components/TextField';
import Buttons from '../components/Buttons';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';

let init = false
let minit = false
let dbRef = db.ref('/users')
dbRef.on('value', handleData, errData)

function handleData(values) {
    let input = values.val();
    let keys = Object.keys(input);
    for (var i = 0; i < keys.length; i++) {
        let key = keys[i]
        try {
            if (key == auth.currentUser.uid) {
                init = input[key].personal_info.init
                minit = input[key].medical_info.init
            }
        } catch (e) {
            console.log(e)
        }
    }
}

function errData(err) {
    console.log(err)
}

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

export default class LogIn extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        visible: false
    }

    handleChange(type) {
        return (text) => {
            this.setState({
                [type]: text
            })
        }
    }

    handleSubmit = () => {
        auth.signInWithEmailAndPassword(this.state.username, this.state.password).then(cred => {
            if (auth.currentUser.emailVerified == true) {
                console.log(init, minit)
                if (init) {
                    if (minit) {
                        this.props.navigation.navigate('Home')
                    } else {
                        this.props.navigation.navigate('AccountInfo')
                    }
                } else {
                    this.props.navigation.navigate('Info')
                }
            } else {
                alert('Please validate email')
            }
        }).catch(error => {
            alert(error)
        })
    }

    openModal = () => {
        this.setState({visible: true})
    }

    closeModal = () => {
        this.setState({visible: false})
    }

    sendEmail = () => {
        auth.sendPasswordResetEmail(this.state.email).then(a => {
            this.setState({visible: false})
            alert('Email has been sent')
        }).catch(err => {
            alert(err)
        })
    }
    render() {
        return( <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View><Text style={styles.title}>StudyFind</Text></View>
                <View><Text style={styles.title2}>Login To Your Account</Text></View>
                <TextField placeholder='Email' secureTextEntry={false} onChangeText={this.handleChange('username')}></TextField>
                <TextField placeholder='Password' secureTextEntry={true} onChangeText={this.handleChange('password')}></TextField>
                <Buttons title= "Log In" onPress={this.handleSubmit}></Buttons>
                <Buttons title= "Create an Account" onPress={() => this.props.navigation.navigate('SignUp')}></Buttons>
                <Buttons title= "Forgot Password?" onPress={this.openModal}></Buttons>
                <Modal style = {{backgroundColor:'white', maxHeight:Dimensions.get('window').height / 2}}
                isVisible={this.state.visible} onBackdropPress={this.closeModal}>
                <View style={{flex: 1, justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>Please enter the email you signed up with</Text>
                    <TextField placeholder='Email' onChangeText={this.handleChange('email')}></TextField>
                    <Buttons title= 'Send Verification Email' onPress={this.sendEmail}></Buttons>
                </View>
                </Modal>
                </KeyboardAvoidingView>

        );
    };
};

