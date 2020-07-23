import React, { Component } from 'react';
import { TextInput } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
const styles = StyleSheet.create({
    welcome: {
        fontSize: 25,
        paddingTop: 10,
        paddingBottom: 20,
        color:'#377dff',
        fontWeight: 'bold',
        
    },
    input: {
        height: 40,
        backgroundColor:'rgba(255,255,255,0.0)',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderBottomColor: '#708090',
        borderBottomWidth: 2,
        color: 'black'
    },
});
export default class TextField extends Component {
    render() {
        return (
                <TextInput style={styles.input} keyboardType = {this.props.keyboardType} secureTextEntry={this.props.secureTextEntry} placeholder={this.props.placeholder} onChangeText={this.props.onChangeText}></TextInput>
        );
    }
}