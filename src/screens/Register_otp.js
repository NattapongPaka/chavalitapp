import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';

import axios from 'axios';
class Register_otp extends React.Component {
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
            otp: "",
            ref_code: '',
            mem_id: null,
            num: 0

        }
        this.check_regis()
        this.call_otp_again()
    }




    async check_regis() {
        const value = await AsyncStorage.getItem('register');

        if (value !== null) {
            // We have data!!
            this.setState({ mem_id: value })

            console.log('regis :' + this.state.mem_id)
            //this.props.navigation.navigate("Register_otp")
            console.log(value);
        }

    }




    call_otp_again() {
        var data = new FormData();
        data.append("member_id", this.state.mem_id);
        console.log('member' + this.state.mem_id)
        axios.post('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_new_otp', data)
            .then(async respons => {
                console.log('call', respons.data)

                if (respons.data.status == 'successfully') {
                    // go to next page
                    this.setState({ otp: respons.data.otp, num: 10 })
                    this.setState({ ref_code: respons.data.ref_code })
                    console.log('otp : done' + 'mem_id : ' + respons.data.member_id)

                    this.test_a()

                } else {
                    // alert error
                    console.log('error')
                }
            })
    }
    // test_b(){
    //     var otp = this.props.navigation.getParam("otp");
    //     if(this.state.num > 0){
    //         return this.state.otp
    //     }else{
    //         return otp
    //     }
       
    // }
    test_c(){
        var ref_code = this.props.navigation.getParam("ref_code");
        if(this.state.num > 0){
            return this.state.ref_code
        }else{
            return ref_code
        }
    }

    // test_a() {
    //     //alert.alert(data);
    //     // var otp = this.props.navigation.getParam("otp");
    //     // global.old_otp = otp
    //     // var ref_code = this.props.navigation.getParam("ref_code");
    //     // alert(this.state.num);
    //     //this.setState({ otp : data})
    //     let num = this.state.num
    //     if (num < 0) {
    //         return (<View><TextInput
    //             onChangeText={(text) => this.setState({ otp: text })}
    //             autoCapitalize={'words'}
    //             autoCorrect={false}
    //             style={{
    //                 height: 50,
    //                 width: 300,
    //                 borderRadius: 15,
    //                 alignItems: 'center',
    //                 textAlign: 'center',
    //                 fontSize: 15,
    //                 borderWidth: 2,
    //                 borderColor: '#f06823',
    //                 fontFamily: 'Prompt-Light',
    //                 margin: 5
    //             }}

    //         // placeholder={stringsoflanguages.p59}
    //         >ggggggg </TextInput>
    //         <Text style={{ margin: 15, fontFamily: 'Prompt-Light' }}>Ref.Code : </Text>
    //         <Text style={{ margin: 15, bottom: 48, left: 70, fontFamily: 'Prompt-Light' }}>{global.ref_code}</Text>
    //         </View>
    //         )
    //     } else {
    //         return (<View><TextInput
    //             onChangeText={(text) => this.setState({ otp: text })}
    //             autoCapitalize={'words'}
    //             autoCorrect={false}
    //             style={{
    //                 height: 50,
    //                 width: 300,
    //                 borderRadius: 15,
    //                 alignItems: 'center',
    //                 textAlign: 'center',
    //                 fontSize: 15,
    //                 borderWidth: 2,
    //                 borderColor: '#f06823',
    //                 fontFamily: 'Prompt-Light',
    //                 margin: 5
    //             }}

    //         // placeholder={stringsoflanguages.p59}
    //         > {this.state.otp} </TextInput>
    //         <Text style={{ margin: 15, fontFamily: 'Prompt-Light' }}>Ref.Code : </Text>
    //         <Text style={{ margin: 15, bottom: 48, left: 70, fontFamily: 'Prompt-Light' }}>{this.state.ref_code}</Text>
    //         </View>)
    //     }

    // } 

    async check_otp() {
        //const member_id = this.props.navigation.getParam('mem_id')
        const otp = this.props.navigation.getParam("otp");

        var data = new FormData();
        data.append("member_id", global.regis);
        data.append("otp", otp);
        //data.append("password", this.state.password);

        console.log('mem_id : ' + this.state.mem_id + ', otp :' + this.state.otp)
        axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_confrim_otp', data)
            .then(async respons => {
                console.log('test' + respons.data)

                if (respons.data.status == 'confrim register successfully') {
                    // go to next page
                    console.log('otp : done')
                    //await AsyncStorage.setItem("member_id", this.state.mem_id);
                    await AsyncStorage.removeItem("register");
                    this.props.navigation.navigate("Register_confirm")

                } else {
                    // alert error
                    console.log('error')
                }
            })
    }

    onConfirmRegister() {
        this.props.navigation.navigate("Register_confirm")
    }

    render() {
        var otp = this.props.navigation.getParam("otp");
        if (otp == null) {
            otp = this.state.otp
        }
        var ref_code = this.props.navigation.getParam("ref_code");
        if (ref_code == null) {
            ref_code = this.state.ref_code
        }
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#F5FCFF', }}>
                <View style={{ backgroundColor: 'white', flex: 1, height: hp(100) }}>

                    <View style={{
                        backgroundColor: '#F06823',
                        height: hp(9),
                        width: '100%',
                        top: 0,
                        position: 'absolute',
                        opacity: 1
                    }} />

                    <TouchableHighlight
                        underlayColor={"#C5C6D0"}
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            height: 25,
                            width: 50,
                            top: 25,
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
                            left: 45,
                            fontFamily: 'Prompt-Bold'

                        }}>{stringsoflanguages.p100}</Text>

                    <View style={{ flex: 1, top: 45 }}>




                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingTop: 50
                        }}>
                            <Text style={{ fontFamily: 'Prompt-Light', fontSize: 16 }}> {stringsoflanguages.p58}</Text>
                            <Text style={{ fontFamily: 'Prompt-Light', fontSize: 16 }}> {stringsoflanguages.p101}</Text>

                            <View style={{ flex: 1, margin: 20 }}>
                                {/* {this.test_a()} */}
                                <TextInput
                                    onChangeText={(text) => this.setState({ otp: text })}
                                    autoCapitalize={'words'}
                                    autoCorrect={false}
                                    style={{
                                        height: 50,
                                        width: 300,
                                        borderRadius: 15,
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        fontSize: 15,
                                        borderWidth: 2,
                                        borderColor: '#f06823',
                                        fontFamily: 'Prompt-Light',
                                        margin:5
                                    }}

                                placeholder={stringsoflanguages.p59}
                                // {this.test_b()}
                                >  </TextInput>

                                <Text style={{ margin: 15, fontFamily: 'Prompt-Light' }}>Ref.Code : </Text>
                                <Text style={{ margin: 15, bottom: 48, left: 70, fontFamily: 'Prompt-Light' }}>{this.test_c()} </Text>

                                <TouchableHighlight
                                    onPress={this.check_otp.bind(this)}
                                    style={{
                                        height: 50,
                                        backgroundColor: '#f06823',
                                        alignSelf: 'stretch',
                                        top: hp(2),
                                        borderRadius: 15,
                                        justifyContent: 'center'
                                    }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: '#FFF',
                                        alignSelf: 'center',
                                        fontFamily: 'Prompt-Light'
                                    }}>
                                        {stringsoflanguages.p56} </Text>
                                </TouchableHighlight>

                                <Text
                                    style={{
                                        top: hp(4),
                                        textAlign: 'center',
                                        textDecorationLine: 'underline',
                                        fontFamily: 'Prompt-Light'
                                    }}
                                    onPress={() => this.call_otp_again()}
                                >
                                    {stringsoflanguages.p60}
                                </Text>
                            </View>



                        </View>

                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default Register_otp;