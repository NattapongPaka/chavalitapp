import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight, Picker, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';
import stringsoflanguages from './stringsoflanguages';

class Register_confirm extends React.Component {
    static navigationOptions = {
        headermode: 'float',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../imgs/doctor.png')}
                style={[{ resizeMode: 'contain', width: 26, height: 26 }, { tintColor: tintColor }]}
            />
        ),
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            style: {
                backgroundColor: '#f06823',
            }
        }
    };



    // GetItem(item) {  Alert.alert(item);}


    constructor(props) {
        super(props);
        this.state = {
            PickerSelectedVal: '',
            date: "2016 / 05 / 15",
            param: ''
        };
    }

    getSelect = () => {
        Alert.alert("Selected XxxX: " + this.state.PickerSelectedVal);
    }


    onLogin() {
        this.props.navigation.navigate("Login")
    }


    render() {
        return (

            <View style={{ backgroundColor: 'white', flex: 1 }}>

                <View style={{
                    backgroundColor: '#F06823',
                    height: hp(9),
                    width: '100%',
                    top: 0,
                    position: 'absolute',
                    opacity: 1
                }} />



                <Text
                    style={{
                        color: 'white',
                        fontSize: 18,
                        padding: 15,
                        top: 7,
                        fontFamily:'Prompt-Bold'
                    }}>{stringsoflanguages.p63}</Text>

                <View style={{ alignItems: 'center' }}>

                    <Image
                        resizeMode='contain'
                        style={{
                            width: 75,
                            height: 75,
                            alignItems: 'center',
                            margin: 70,
                        }}
                        source={require("../imgs/success.png")}>
                    </Image>




                    <Text style={{ fontSize: 30, color: '#F06823', bottom: 23, fontFamily:'Prompt-Bold' }}> {stringsoflanguages.p97}</Text>
                    <Text style={{ fontSize: 18 , fontFamily:'Prompt-Light'}}> {stringsoflanguages.p98}</Text>
                    <Text style={{ fontSize: 18 , fontFamily:'Prompt-Light'}}> {stringsoflanguages.p99}</Text>


                    <TouchableHighlight
                        onPress={this.onLogin.bind(this)}
                        style={{
                            height: 45,
                            backgroundColor: '#F06823',
                            alignSelf: 'stretch',
                            top: 10,
                            borderRadius: 10,
                            justifyContent: 'center',
                            margin: 20
                        }}>
                        <Text style={{
                            fontSize: 17,
                            color: '#FFF',
                            alignSelf: 'center',
                             fontFamily:'Prompt-Light'
                        }}>
                            {stringsoflanguages.p1}
                         </Text>
                    </TouchableHighlight>
                </View>



            </View>










        );
    }
}

const styl = StyleSheet.create({
    textSecond: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 300,
    },
    rect: {
        backgroundColor: '#F06823',
        height: '11%'
    },
    MainContainer: {

        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        margin: 10

    },

    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },

});





export default Register_confirm;
