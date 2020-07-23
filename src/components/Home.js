import React, { Component } from 'react';
import { FlatList, StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import { Expandable } from './Expandable';
import { db, auth } from '../config';
import TextField from '../components/TextField';
import Buttons from '../components/Buttons'

export default class Home extends Component {
    state = {
        state_data: [],
        studies: [],
        pay: '',
        duration: ''
    }

    componentDidMount = () => {
        let dbRef = db.ref()
        dbRef.on('value', this.handleStudies, this.errData)
    }

    handleStudies = (values) => {
        let input = values.val();
        let keys = Object.keys(input);
        let studies = input[keys[0]]
        let users = input[keys[1]]
        let user = users[auth.currentUser.uid]
        let new_data = []
        for (var i = 0; i < Object.keys(studies).length; i++) {
            let key = Object.keys(studies)[i]
            let study = studies[key]
            let add = true
            if (!this.filter_study(study, user)) {
                add = false
            }
            if (add) {
                new_data.push(study)
            }
        }
        this.setState({
            studies: new_data,
            state_data: new_data
        })
    }

    filter = () => {
        let new_data = []
        for (var i = 0; i < this.state.studies.length; i++) {
            let add = true
            if (this.state.duration != '' && this.state.duration < this.state.studies[i].Duration) {
                add = false
            } else if (this.state.pay != '' && this.state.pay > this.state.studies[i].Pay) {
                add = false
            } else if (add) {
                new_data.push(this.state.studies[i])
            }
        }
        this.setState({
            state_data: new_data
        })
    }

    filter_study = (study, user) => {
        if (study.blood_type != undefined) {
            if (study.blood_type != user.medical_info.blood_type) {
                return false
            }
        } else if (study.requiredSex != undefined) {
            if (study.requiredSex != user.medical_info.sex) {
                return false
            }
        } else if (study.alcohol != undefined) {
            if (study.alcohol != user.medical_info.alcohol) {
                return false
            }
        } else if (study.smoke != undefined) {
            if (study.smoke != user.medical_info.smoke) {
                return false
            }
        }
        return true
    }

    errData = (err) => {
        console.log(err)
    }

    handleChange(type) {
        return (text) => {
            this.setState({
                [type]: text
            })
        }
    }
    
    renderItem = ({item}) => <Expandable fromAccount = {false} navigation = {this.props.navigation} item = {item}/>;

    render() {
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style= {styles.container}>
                <Buttons title="My Account" onPress={() => this.props.navigation.navigate('Account')} />
                <TextField placeholder='Minimum Pay' keyboardType = {'numeric'} onChangeText={this.handleChange('pay')}></TextField>
                <TextField placeholder='Max Duration (minutes)' keyboardType = {'numeric'} onChangeText={this.handleChange('duration')}></TextField>
                <Buttons title='Filter' onPress={this.filter} />
                <FlatList data = {this.state.state_data} renderItem = {this.renderItem} keyExtractor = {(item) => item.Title}/>
            </View>
            </KeyboardAvoidingView>
        )
            }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50
    }
});