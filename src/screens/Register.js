import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'

import { sha1 } from 'react-native-sha1';
import stringsoflanguages from './stringsoflanguages';
import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager, } from 'react-native-fbsdk';



class Register extends React.Component {
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



    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    label: `${stringsoflanguages.p94}`,
                    value: "email",
                },
                {
                    label: `${stringsoflanguages.p104}`,
                    value: "phone",

                },
            ],
            seleceted_value: "",
            username: "",
            password: "",
            password_1: "",
            fake_value: "",
            isLoading: true,
            idxx: ''
        }
        this.onPress()
        this.check_regis()
    }

    async check_regis() {
        const value = await AsyncStorage.getItem('register');
        if (value !== null) {
            // We have data!!
            //this.props.navigation.navigate("Register_otp")
            console.log(value);
        }

    }

    check_password(selectedButton) {

        console.log('check')
        //console.log(this.state.selected_value.value)
        if (this.state.password !== this.state.password_1) {
            //alert something
            console.log('!=')
        } else {
            sha1(this.state.password).then(hash => {
                console.log(hash);
                const password = hash
                this.do_register(password, selectedButton)
            })

        }

    }

    async fb_regis(id, email, fname, lname) {
        let UserID = id.toString()
        let UserEmail = email
        let UserFirstname = fname
        let UserLastname = lname
        console.log('XER :' + UserID + '::' + UserEmail + '::' + UserFirstname + '::' + UserLastname)

        let data = new FormData();
        data.append("id_facebook", id);
        data.append("username", UserEmail);
        data.append("first_name", UserFirstname);
        data.append("last_name", UserLastname);

        axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=login_from_facebook', data)
            .then(async respons => {
                console.log('XER :', respons.data)
                await AsyncStorage.setItem("member_id", respons.data.member_id)
                this.props.navigation.navigate("Navigation", { id: respons.data.member_id })
            })
    }


    async do_register(password, selectedButton) {

        console.log('do_register : ' + password)
        console.log(this.state.data)

        var data = new FormData();
        data.append("username_type", selectedButton);
        data.append("username", this.state.username);
        data.append("password", password);


        axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_register', data)
            .then(async respons => {
                console.log('test =>', respons.data)
                if (respons.data.status == 'register successfully') {
                    if (selectedButton == 'email') {
                        let mem_id = respons.data.member_id
                        let otp = respons.data.otp
                        let ref_code = respons.data.ref_code
                        global.otp = otp
                        global.ref_code = ref_code
                        global.regis = mem_id
                        await AsyncStorage.setItem("register", mem_id);
                        this.props.navigation.navigate("Register_confirm", { otp: otp, ref_code: ref_code })
                        console.log('done = email')
                        // alert(this.state.isLoading)

                    } else {
                        let mem_id = respons.data.member_id
                        let otp = respons.data.otp
                        let ref_code = respons.data.ref_code
                        global.regis = mem_id
                        await AsyncStorage.setItem("register", mem_id);
                        console.log('otp : ', otp)
                        this.props.navigation.navigate("Register_otp", { otp: otp, ref_code: ref_code })
                        console.log('done = phone')
                    }

                } else {
                    // alert error
                    console.log('error')
                }
            })

    }



    // update state
    onPress = (data) => { this.setState({ data }); }


    onLogin() {
        this.props.navigation.navigate("Login")
    }
    onConfirmRegister() {
        this.props.navigation.navigate("Register_confirm")
    }

    render() {
        let selectedButton = this.state.data.find(e => e.selected == true);
        //this.state.seleceted_value = selectedButton
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].value;
        return (
            <View>
                <View style={{
                          backgroundColor: '#F06823',
                          height: hp(9),
                          width: '100%',
                          top: 0,
                          // position: 'absolute',
                          opacity: 1,
                          flexDirection : 'row',
                          justifyContent : 'space-between',
                          //flex : 1
                        }}
                >
                <View style={{flexDirection : 'row' , marginTop : hp('1%')}}>           
                    <TouchableHighlight
                        underlayColor={"#C5C6D0"}
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                        height: 25,
                        width: 50,
                        top: 15,
                        alignItems: 'center',
                        }}>
                        <Image
                        resizeMode='contain'
                        style={{
                            width: 50,
                            height: 22,
                            alignItems: 'center',
                        }}
                        source={require("../imgs/leftarrow.png")}></Image>
                    </TouchableHighlight>

                    <Text
                        style={{

                        color: 'white',
                        fontSize: 18,
                        textAlign: 'auto',
                        top: 12,
                        fontFamily: 'Prompt-Bold'
                        }}>{stringsoflanguages.p14}</Text>
                </View>
            </View>
            <ScrollView >
                <View style={{ backgroundColor: 'white', flex: 1, height: hp(100) }}>

                    

                    <View style={{ flex: 1, top: 45 }}>

                        {/* <Text >
                    Value = {selectedButton}
                </Text> */}



                        <RadioGroup
                            radioButtons={this.state.data}
                            onPress={this.onPress}
                            flexDirection='row'
                        />



                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 30, paddingRight: 30, paddingTop: 8 }}>

                            <View
                                resizeMode='contain'
                                style={{
                                    width: 70,
                                    height: 49,
                                    top: 10,
                                    backgroundColor: '#F06823',
                                    alignSelf: 'flex-start',
                                    left: 1,
                                    borderBottomLeftRadius: 14,
                                    borderTopLeftRadius: 14
                                }}>
                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width: 50,
                                        height: 25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        left: 10,
                                        top: 13
                                    }}
                                    source={require("../imgs/user_icon.jpg")}></Image>


                            </View>


                            <TextInput
                                onChangeText={(text) => this.setState({ username: text })}
                                autoCapitalize={'words'}
                                autoCorrect={false}
                                style={{
                                    height: 50,
                                    width: '100%',
                                    bottom: 40,
                                    paddingLeft: 60,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: 15,
                                    borderWidth: 2,
                                    paddingTop: 12,
                                    borderColor: '#f06823',
                                    fontFamily: 'Prompt-Light'
                                }}

                                placeholder={stringsoflanguages.p11}
                            />
                        </View>

                        <View style={{
                            height: 0.5,
                            width: '100%',
                            backgroundColor: '#C2C2C2',
                            bottom: hp(9)
                        }} />

                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingLeft: 30,
                            paddingRight: 30,
                            bottom: hp(5)

                        }}>
                            <View
                                resizeMode='contain'
                                style={{
                                    width: 70,
                                    height: 49,
                                    top: 10,
                                    backgroundColor: '#F06823',
                                    alignSelf: 'flex-start',
                                    left: 1,
                                    borderBottomLeftRadius: 14,
                                    borderTopLeftRadius: 14


                                }}
                            >
                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width: 50,
                                        height: 25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        left: 10,
                                        top: 13
                                    }}
                                    source={require("../imgs/pass_icon.jpg")}></Image>


                            </View>
                            <TextInput
                                onChangeText={(text) => this.setState({ password: text })}
                                autoCapitalize={'words'}
                                autoCorrect={false}
                                style={{
                                    height: 50,
                                    width: '100%',
                                    bottom: 40,
                                    paddingLeft: 60,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: 15,
                                    borderWidth: 2,
                                    paddingTop: 12,
                                    borderColor: '#f06823',
                                    fontFamily: 'Prompt-Light'
                                }}

                                placeholder={stringsoflanguages.p12}
                            />
                        </View>





                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingLeft: 30,
                            paddingRight: 30,
                            bottom: hp(13)


                        }}>
                            <View
                                resizeMode='contain'
                                style={{
                                    width: 70,
                                    height: 49,
                                    top: 10,
                                    backgroundColor: '#F06823',
                                    alignSelf: 'flex-start',
                                    left: 1,
                                    borderBottomLeftRadius: 14,
                                    borderTopLeftRadius: 14


                                }}
                            >
                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width: 50,
                                        height: 25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        left: 10,
                                        top: 13
                                    }}
                                    source={require("../imgs/pass_icon.jpg")}></Image>

                            </View>
                            <TextInput
                                onChangeText={(text) => this.setState({ password_1: text })}
                                autoCapitalize={'words'}
                                autoCorrect={false}
                                style={{
                                    height: 50,
                                    width: '100%',
                                    bottom: 40,
                                    paddingLeft: 60,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    fontSize: 15,
                                    borderWidth: 2,
                                    paddingTop: 12,
                                    borderColor: '#f06823',
                                    fontFamily: 'Prompt-Light'
                                }}

                                placeholder={stringsoflanguages.p55}
                            />
                        </View>






                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingLeft: 30,
                            paddingRight: 30,
                            bottom: hp(14)
                        }}>
                            <TouchableHighlight
                                onPress={() => this.check_password(selectedButton)}
                                style={{
                                    height: 50,
                                    backgroundColor: '#f06823',
                                    alignSelf: 'stretch',
                                    bottom: 25,
                                    borderRadius: 15,
                                    justifyContent: 'center'
                                }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#FFF',
                                    alignSelf: 'center',
                                    fontFamily: 'Prompt-Light'
                                }}>
                                    {stringsoflanguages.p56}
                                </Text>
                            </TouchableHighlight>

                            <Text style={{ fontSize: 17, bottom: 10, fontFamily: 'Prompt-Light' }}>หรือ</Text>


                            {/* <TouchableHighlight
                                onPress={() => this._fb_register()}
                                style={{
                                    height: 50,
                                    backgroundColor: '#4267b2',
                                    alignSelf: 'stretch',
                                    top: 3,
                                    borderRadius: 15,
                                    justifyContent: 'center'
                                }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#FFF',
                                    alignSelf: 'center',
                                    fontFamily: 'Prompt-Light'
                                }}>
                                    {stringsoflanguages.p57}
                                </Text>
                            </TouchableHighlight> */}
                            <LoginButton
                                // publishPermissions={["public_profile"]}
                                readPermissions={['public_profile']}
                                onLoginFinished={
                                    (error, result) => {
                                        if (error) {
                                            alert("login has error: " + result.error);
                                        } else if (result.isCancelled) {
                                            alert("login is cancelled.");
                                        } else {
                                            AccessToken.getCurrentAccessToken().then(
                                                (data) => {
                                                    const infoRequest = new GraphRequest(
                                                        'me?fields=id,email,first_name,last_name',
                                                        null,
                                                        this._responseInfoCallback,
                                                    )
                                                    // Start the graph request.
                                                    new GraphRequestManager().addRequest(infoRequest).start();
                                                }
                                            )
                                        }
                                    }
                                }
                                onLogoutFinished={() => alert("logout.")}
                            />
                        </View>

                    </View>

                </View>
            </ScrollView>
            </View>
        );
    }
    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('ERR_DATA: ' + error.toString());
        } else {

            let id = result.id
            let email = result.email
            let fname = result.first_name
            let lname = result.last_name



            this.fb_regis(id, email, fname, lname);


        }
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
    scrollView: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 65
    },
    container3: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        bottom: 45
    },
    container1: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        bottom: 90

    },
    container2: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    banner: {
        height: 90,
        width: '100%'
    },
    input: {
        height: 65,
        width: '100%',
        marginTop: 10,
        paddingLeft: 60,
        borderRadius: 15,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
        borderWidth: 2,
        borderColor: '#f06823'
    },
    loginButton: {
        height: 60,
        backgroundColor: '#f06823',
        alignSelf: 'stretch',
        bottom: 25,
        borderRadius: 15,
        justifyContent: 'center'
    },
    registerButton: {
        height: 50,
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    loginButtonText: {
        fontSize: 15,
        color: '#FFF',
        alignSelf: 'center'
    },
    registerButtonText: {
        fontSize: 15,
        color: '#0007',
        alignSelf: 'center'
    },
    registerButtonText1: {
        fontSize: 15,
        color: '#0007',
        alignSelf: 'center'
    },
    heading: {
        fontSize: 30,
        marginBottom: 40
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    success: {
        color: 'green',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    },
    ipIcon: {
        position: 'absolute',
        top: 30,
        left: 37
    },
    registerButtonText2: {
        fontSize: 40,
        color: '#0007',

    },

});





export default Register;