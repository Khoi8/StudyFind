import React, { Component } from 'react';
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';

export var selected_study = ''
export var fromAccount = false

const propTypes = {
    item: PropTypes.object,
    navigation: PropTypes.object,
    fromAccount: PropTypes.bool
};

class Expandable extends React.Component {

    more_info = () => {
        if (this.props.fromAccount) {
            fromAccount = true
            selected_study = this.props.item
            this.props.navigation.navigate('studyScreen')
        } else {
            fromAccount = false
            selected_study = this.props.item
            this.props.navigation.navigate('studyScreen')
        }
    }

    render() {
        return(
            <View style = {styles.container}>
                <TouchableWithoutFeedback>
                    <View style = {styles.titleContainer}>
                        <Text style = {styles.title}>{this.props.item.Title}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.more_info} underlayColor='#fff'><Text style={styles.button}>More Info</Text></TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

Expandable.propType = propTypes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#377dff',
        borderRadius: 10,
        margin: 10,
        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: 'grey',
        shadowOpacity: .5,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 20
    },
    title: {
        flex: 1,
        fontSize: 30,
        color: 'white'
    },
    description: {
        flex: 1,
        fontSize: 22,
        color: 'white',
        paddingLeft: 20,
        paddingTop: 10
    },
    image: {
        width: 20,
        height: 20
    },
    button: {
        flex: 0,
        fontSize: 30,
        borderWidth: 3,
        borderColor: 'white',
        color: '#377dff',
        borderRadius: 10,
        backgroundColor: 'white',
    }
});

export {Expandable};