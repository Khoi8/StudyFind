import React, { Component } from 'react';
import { View , Text, StyleSheet,TouchableOpacity, navigation} from 'react-native';
import { selected_study } from '../components/Expandable'
import { fromAccount } from '../components/Expandable'
import { db, auth } from '../config'

export default class studyScreen extends Component {

    state = {
        fromAccount: false
    }

    componentDidMount = () => {
        this.setState({
            fromAccount: fromAccount
        })
    }

    join_study = () => {
        db.ref('Studies/' + selected_study.Title + '/participants/' + auth.currentUser.uid).set({
            email: auth.currentUser.email
        })
        this.props.navigation.navigate('Account')
        alert('study added to account page')
    }

    back = () => {
        if (this.state.fromAccount) {
            this.props.navigation.navigate('Account')
        } else {
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style = {styles.title}>{selected_study.Title}</Text>
                <View style={styles.container2}>
                    <Text style = {styles.destitle}>{selected_study.Description}</Text>
                    <Text style = {styles.des}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                    <Text style = {styles.destitle2}>{'Pay: ' + selected_study.Pay}</Text>
                    <Text style = {styles.destitle2}>{'Duration: '  + selected_study.Duration}</Text>
                    <Text style = {styles.destitle2}>{'Location: ' + selected_study.Location}</Text>
                    <Text style = {styles.destitle2}>{'Date: ' + selected_study.Date}</Text>
                    <Text style = {styles.destitle2}>{'Time: ' + selected_study.Time}</Text>
                    <View style = {styles.container3}>
                        <TouchableOpacity style={styles.buttonBack} onPress={this.back} underlayColor='#fff'><Text style={styles.buttonTextBack}>Back</Text></TouchableOpacity>
                        <TouchableOpacity  style={styles.button} onPress={this.join_study} underlayColor='#fff'><Text style={styles.buttonText}>Join</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#377dff',
    },
    container2: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        width: 420,
        height: 850,
        borderRadius: 50,
        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: 'grey',
        shadowOpacity: .5,
    },
    container3: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 200,
        paddingTop: 100,
        marginBottom: 100,
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 50,
        width: 200,
        marginTop: 100,
        marginBottom: 10,
        marginRight: 155,
    },
    destitle: {
        fontSize:25,
        fontWeight: 'bold',
        color: '#377dff',
        marginBottom:10,
        marginRight: 100,
    },
    destitle2: {
        fontSize:25,
        fontWeight: 'bold',
        color: '#377dff',
        marginBottom:10,
        marginRight: 250,
    },
    des: {
        fontSize:20,
        color: '#377dff',
        paddingBottom: 25,
        marginRight: 20,
        marginLeft: 20,
    },
    button: {
        flex: 0,
        borderWidth: 3,
        borderColor: '#377dff',
        borderRadius: 10,
        backgroundColor: '#377dff',
        width: 100,
        height: 50,
        marginRight: 60,
        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: 'grey',
        shadowOpacity: .5,
    },
    buttonBack: {
        flex: 0,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
        backgroundColor: 'white',
        width: 100,
        height: 50,
        marginRight: 10,
        shadowOffset:{  width: 2,  height: 2,  },
        shadowColor: 'grey',
        shadowOpacity: .5,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 40,
        color: 'white',
    },
    buttonTextBack: {
        textAlign: "center",
        fontSize: 40,
        color: '#377dff',
    }
});