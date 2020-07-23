import React, { Component } from "react";
import {Dropdown} from 'react-native-material-dropdown'

let states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

function create_data() {
    for (var i = 0; i < states.length; i++) {
        states[i] = {value: states[i]}
    }
}

create_data()

export default class StateDropDown extends Component {
    render() {
        return (
            <Dropdown label='State' data = {states} onChangeText = {this.props.onChangeText} />
          );
    }
}