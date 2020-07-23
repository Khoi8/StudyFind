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
import CityDropDown from '../components/CityDropDown'
import StateDropDown from '../components/StateDropDown'

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

export default class Info extends Component {
    state = {
        fname: '',
        lname: '',
        addy: '',
        city: '',
        state: '',
        zip: ''
    }

    handle_cancel = () => {
        if (init) {
            if (minit) {
                this.props.navigation.navigate('Account')
            } else {
                this.props.navigation.navigate('AccountInfo')
            }
        } else {
            console.log('Please initiliaze data')
        }
    }

    handleChange(type) {
        return (text) => {
            this.setState({
                [type]: text
            })
        }
    }

    check_data = () => {
        if (this.state.fname == '' || this.state.lname == '' || this.state.addy == '' || this.state.city == '' || this.state.state == '' || this.state.zip == '') {
            return false
        } else {
            return true
        }
    }

    save_info = () => {
        if (this.check_data()) {
            db.ref('users/' + auth.currentUser.uid + '/personal_info').set({
                firstName: this.state.fname,
                lastName: this.state.lname,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                init: true
            })
            if (minit != undefined && minit) {
                this.props.navigation.navigate('Account')
            } else {
                this.props.navigation.navigate('AccountInfo')
            }
            alert('information successfully updated')
        } else {
            alert('please input valid data')
        }
    }


    render() {
        return( <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View><Text style={styles.title2}>Update Account Information</Text></View>
                <TextField placeholder='First Name' secureTextEntry={false} onChangeText = {this.handleChange('fname')}></TextField>
                <TextField placeholder='Last Name' secureTextEntry={false} onChangeText = {this.handleChange('lname')}></TextField>
                <TextField placeholder='Address Line 1' secureTextEntry={false} onChangeText = {this.handleChange('addy')}></TextField>
                <CityDropDown onChangeText = {this.handleChange('city')}></CityDropDown>
                <StateDropDown onChangeText = {this.handleChange('state')}></StateDropDown>
                <TextField placeholder='Zipcode' keyboardType = {'numeric'} secureTextEntry={false} onChangeText = {this.handleChange('zip')}></TextField>
                <Buttons title= "Save Information" onPress={this.save_info}></Buttons>
                <Buttons title= "Cancel" onPress={this.handle_cancel}></Buttons>
                </KeyboardAvoidingView>

        );
    };
};