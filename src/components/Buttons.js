import React, { Component } from 'react';
import { Button } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

export default class Buttons extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title={this.props.title} onPress={this.props.onPress}/>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-around',
      paddingBottom: 20
    },
  });