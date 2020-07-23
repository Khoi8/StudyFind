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
import {Dropdown} from 'react-native-material-dropdown'

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

export default class AccountInfo extends Component {
    state = {
        sex: '',
        btype: '',
        use: '',
        smoke: ''
    }

    handleChange(type) {
        return (text) => {
            this.setState({
                [type]: text
            })
        }
    }

    check_info = () => {
        if ((this.state.btype || this.state.sex || this.state.smoke || this.state.use) == '') {
            return false
        }
        return true
    }

    handle_cancel = () => {
        if (minit) {
            this.props.navigation.navigate('Account')
        } else {
            console.log('please initialize data')
        }
    }

    save_info = () => {
        if (this.check_info()) {
            db.ref('users/' + auth.currentUser.uid + '/medical_info').set({
                sex: this.state.sex,
                blood_type: this.state.btype,
                alcohol: this.state.use,
                smoke: this.state.smoke,
                init: true
            })
            this.props.navigation.navigate('Account')
            alert('information successfully updated')
        } else {
            alert('please enter valid info')
        }
    }


    render() {
        let smoke = [{
            value: 'Never'
        }, {
            value: 'Once in a while'
        }, {
            value: 'Regularly'
        }];

        let alcohol = [{
            value: 'Never'
        }, {
            value: 'Once in a while'
        }, {
            value: 'Regularly'
        }];

        let sex = [{
            value: 'Male'
        }, {
            value: 'Female'
        }];

        let blood = [{
            value: 'A+'
        }, {
            value: 'A-'
        }, {
            value: 'B+'
        }, {
            value: 'B-'
        }, {
            value: 'O+'
        }, {
            value: 'O-'
        }, {
            value: 'AB+'
        }, {
            value: 'AB-'
        }];


        return( <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View><Text style={styles.title2}>Update Profile Information</Text></View>
                <Dropdown label='Sex' data={sex} onChangeText={this.handleChange('sex')}/>
                <Dropdown label='Blood Type' data={blood} onChangeText={this.handleChange('btype')}/>
                <Dropdown label='Alcohol Use' data={alcohol} onChangeText={this.handleChange('use')}/>
                <Dropdown label='Smoking' data={smoke} onChangeText={this.handleChange('smoke')}/>
                <Buttons title= "Save Information" onPress={this.save_info}></Buttons>
                <Buttons title= "Cancel" onPress= {this.handle_cancel}></Buttons>
                <Modal style = {{backgroundColor:'white', maxHeight:Dimensions.get('window').height / 2}}
                isVisible={this.state.visible} onBackdropPress={this.closeModal}>
                </Modal>
                </KeyboardAvoidingView>

        );
    };
};