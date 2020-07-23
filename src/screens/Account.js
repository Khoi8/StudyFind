import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ScrollView, Button, FlatList } from "react-native";
import {auth} from '../config';
import Buttons from '../components/Buttons';
import { Expandable } from '../components/Expandable';

import { db } from '../config';

export default class Account extends Component {

  state = {
    state_data: [],
    fname: '',
    lname: '',
    fromAccount: true
  }

    logOut = () => {
        auth.signOut().then(a => {
            this.props.navigation.navigate('Login')
            alert('Logged Out')
        }).catch(err => {
            alert('err')
        })
    }

    componentDidMount = () => {
      let dbRef = db.ref('/users')
      dbRef.on('value', this.handleUsers, this.errData)
      let dbRef1 = db.ref('/Studies')
      dbRef1.on('value', this.handleStudies, this.errData2)
    }

    errData = (err) => {
      console.log(err)
    }

    errData2 = (err) => {
      console.log(err)
    }

    handleStudies = (values) => {
      let input = values.val();
      let keys = Object.keys(input);
      let new_data = []
      for (var i = 0; i < keys.length; i++) {
          let add = false
          var key = keys[i]
          if (input[key].participants != undefined) {
            if (input[key].participants[auth.currentUser.uid] != undefined) {
              if (!this.state.state_data.includes(input[key])) {
                add = true
              }
            }
          }
          if (add) {
            new_data.push(input[key])
          }
      }
      this.setState({
        state_data: new_data,
      })
    }

    handleUsers = (values) => {
      let input = values.val();
      console.log(input[auth.currentUser.uid])
      let fname = input[auth.currentUser.uid].personal_info.firstName
      let lname = input[auth.currentUser.uid].personal_info.lastName
      this.setState({
        fname: fname,
        lname: lname
      })
    }

    renderItem = ({item}) => <Expandable fromAccount = {true} item = {item} navigation = {this.props.navigation}/>;
    
    render() {

        return (
            <ScrollView style={styles.container}>
              <Image
                source={require("../../img/account.png")}
                resizeMode="contain"
                style={styles.image}
              ></Image>
              <Text style={styles.accountName4}>{this.state.fname + ' ' + this.state.lname}</Text>
        <Text style={styles.accountEmailHere}>{auth.currentUser.email}</Text>
              <Buttons title= "View All Studies" onPress={() => this.props.navigation.navigate('Home')}></Buttons>
              <Buttons title= "Update Account Information" onPress={() => this.props.navigation.navigate('AccountInfo')}></Buttons>
              <Buttons title= "Update Profile" onPress={() => this.props.navigation.navigate('Info')}></Buttons>
              <View style={styles.paymentOptionsRow}>
                <Button
                  title="Logout"
                  style={styles.materialButtonPrimary}
                  onPress={this.logOut}
                ></Button>
              </View>
              <Text style={styles.yourStudies}>Your Studies</Text>
              <View>
                <FlatList data = {this.state.state_data} extraData={this.state} renderItem = {this.renderItem} keyExtractor = {(item) => item.Title} />
                </View>
            </ScrollView>
          );
    }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    image: {
      width: 96,
      height: 98,
      borderRadius: 90,
      marginTop: 92,
      alignSelf: "center"
    },
    accountName4: {
      color: "#121212",
      fontSize: 28,
      marginTop: 23,
      alignSelf: "center"
    },
    accountEmailHere: {
      color: "#121212",
      fontSize: 20,
      marginTop: 18,
      paddingBottom:30,
      alignSelf: "center"
    },
    yourStudies: {
      color: "#121212",
      fontSize: 26,
      marginTop: 50,
      alignSelf: "center"
    },
    paymentOptions: {
      color: "#121212",
      fontSize: 18,
      marginTop: 9
    },
    materialButtonPrimary: {
      width: 100,
      height: 36,
      marginLeft: 8,
      alignSelf: "center"
    },
    paymentOptionsRow: {
      height: 36,
      flexDirection: "row",
      alignSelf: 'center',
      marginTop: 20
    },
    scrollArea: {
      width: 334,
      height: 350,
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 25,
      borderColor: "#000000",
      borderWidth: 0,
      marginTop: 78,
      marginLeft: 21
    },
    scrollArea_contentContainerStyle: {
      width: 334,
      height: 1750
    }
  });