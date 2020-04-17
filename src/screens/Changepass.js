import React, { Component } from 'react';
import {
    SafeAreaView,KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    AsyncStorage,
    Alert,
    Text,
    Image,
    View,
    ScrollView
} from 'react-native';
import { ViewPagerAndroid } from 'react-native-gesture-handler';
import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'
import { sha1 } from 'react-native-sha1';

class Forgetpass extends Component {

    static navigationOptions = {
        // title: 'เปลี่ยนรหัสผ่าน',
    };

    constructor(props) {
        super(props)
        this.state = {
            oldpassword: "",
            newpassword: "",
            confirmpassword: "",
            show: false,
            pass_sha: '',
        }
    }

    async Changepass() {

        const value = await AsyncStorage.getItem('member_id');

        let opass = this.state.oldpassword
        if (opass) {
            opass = await sha1(this.state.oldpassword);
        }
        // let opass = await sha1(this.state.oldpassword);
        let newPass = await sha1(this.state.newpassword);
        // console.log('REE' + olsPass + newPass)

        var data = new FormData();
        data.append("member_id", value);
        data.append("current_password", opass);
        data.append("new_password", newPass);
        console.log('TT' + value + '::' + opass + '::' + newPass)


        axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_change_password_member', data)
            .then(respons => {
                // alert(respons.data.status);
                this.props.navigation.goBack();
                console.log('TT' + respons.data.status)


            }).catch((error) => {
                console.error(error);
            });
        //   this.props.navigation.navigate("Contact")
    }


    async get_member_data() {
        const value = await AsyncStorage.getItem('member_id');

        // var data = new FormData();
        // data.append("member_id", value);
        axios.get('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_data_member&member_id=' + value)
            .then(respons => {
                console.log(respons)

            })

    }

    // onOK() {
    //     const { oldpassword,newpassword, confirmpassword } = this.state


    //     if (oldpassword && newpassword && confirmpassword ) {
    //         Alert.alert("Old:" + oldpassword, "New:"+ newpassword ,"Comfirm:" + confirmpassword)
    //         this.props.navigation.navigate("Forgetpass")
    //     } else {
    //         Alert.alert("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว ท่านสามารถใช้รหัสผ่านใหม่ เพื่อเข้าสู่ระบบได้ทันที")
    //     }


    // }

    handleOpen = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
        this.props.navigation.navigate("Login")
    }

    // onLogin() {
    //     this.props.navigation.navigate("Login")
    //   }


    render() {
        return (

            <ScrollView style={styles.scrollView}>

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
                }}>{stringsoflanguages.p46}</Text>
            </View>
            
          

          <View>
            {this.props.logoutReducers.member_id != null ? //show data member


            <View style={{ marginTop : hp('2%'),marginRight : 5 , flexDirection : 'column',}}>
                <Text
                style={{

                    textAlign: 'center',
                    color: 'white',
                    fontSize: 12,
                    
                    fontFamily: 'Prompt-Light'
                }}>{stringsoflanguages.p9} : คุณ {this.props.logoutReducers.first_name}</Text>

                <View style = {{ flexDirection : 'row' , justifyContent : 'space-between'}}>
                <Text
                    style={{

                    textAlign: 'center',
                    color: 'white', 
                    fontSize: 12,
                    //left: wp(62),
                    //position: 'absolute',
                    //top: hp(6),
                    //marginBottom: 5,
                    fontFamily: 'Prompt-Light'
                    }}>{stringsoflanguages.p5} : {this.props.logoutReducers.summary_point} </Text>
                    
                <Image
                    // resizeMode='contain'
                    style={{
                    marginLeft : 5,
                    width: 15,
                    height: 15,
                    top : 2
                    //left: wp(77),
                    //top: hp(6),
                    //marginBottom: 5,

                    }}
                    source={require("../imgs/coin.png")}></Image>
                
                <Text
                    style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 12,
                    // marginRight: 15,
                    //left: wp(87),
                    //position: 'absolute',
                    //top: hp(6),
                    //marginBottom: 5,
                    fontFamily: 'Prompt-Light'
                    }}> {this.props.logoutReducers.summary_coin}</Text>

                </View>

            </View>
            : null}

          </View>
        </View>




                <View style={styles.container}>

                    <View
                        resizeMode='contain'
                        style={{
                            width: 70,
                            height: 62.5,
                            top: 74,
                            backgroundColor: '#F06823',
                            alignSelf: 'flex-start',
                            left: 2,
                            borderBottomLeftRadius: 14,
                            borderTopLeftRadius: 14

                        }}
                    >
                        <Image
                            resizeMode='contain'
                            style={{
                                width: 50,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                left: 10,
                                top: 13
                            }}
                            source={require("../imgs/pass_icon.jpg")}></Image>

                    </View>


                    <TextInput
                        onChangeText={(text) => this.setState({ oldpassword: text })}
                        autoCapitalize={'words'}
                        autoCorrect={false}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder={stringsoflanguages.p48}

                    />

                </View>

                <View style={styles.container3}>

                    <View
                        resizeMode='contain'
                        style={{
                            width: 70,
                            height: 62,
                            top: 73,
                            backgroundColor: '#F06823',
                            alignSelf: 'flex-start',
                            left: 2,
                            borderBottomLeftRadius: 14,
                            borderTopLeftRadius: 14


                        }}
                    >
                        <Image
                            resizeMode='contain'
                            style={{
                                width: 50,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                left: 10,
                                top: 13
                            }}
                            source={require("../imgs/pass_icon.jpg")}></Image></View>
                    <TextInput
                        onChangeText={(text) => this.setState({ newpassword: text })}
                        autoCapitalize={'words'}
                        autoCorrect={false}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder={stringsoflanguages.p49}
                    />

                </View>

                <View style={styles.container1}>
                    <View
                        resizeMode='contain'
                        style={{
                            width: 70,
                            height: 62,
                            top: 73,
                            backgroundColor: '#F06823',
                            alignSelf: 'flex-start',
                            left: 2,
                            borderBottomLeftRadius: 14,
                            borderTopLeftRadius: 14

                        }}
                    >
                        <Image
                            resizeMode='contain'
                            style={{
                                width: 50,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                left: 10,
                                top: 13
                            }}
                            source={require("../imgs/pass_icon.jpg")}></Image></View>
                    <TextInput
                        onChangeText={(text) => this.setState({ confirmpassword: text })}
                        autoCapitalize={'words'}
                        autoCorrect={false}
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder={stringsoflanguages.p50}
                    />
                </View>

                <SCLAlert
                    show={this.state.show}
                    onRequestClose={this.handleClose}
                    theme="success"
                    title={stringsoflanguages.p91}
                    subtitle="เปลี่ยนรหัสผ่านเรียบร้อยแล้ว ท่านสามารถใช้รหัสผ่านใหม่ เพื่อเข้าสู่ระบบได้ทันที"

                >
                    <SCLAlertButton theme="success" onPress={this.handleClose}>Login Now</SCLAlertButton>
                    {/* <SCLAlertButton theme="default" onPress={this.handleClose}>Cancel</SCLAlertButton> */}
                </SCLAlert>
                <View style={styles.container2}>
                    <TouchableHighlight
                        onPress={() => this.Changepass()}
                        style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>
                            {stringsoflanguages.p46}
                        </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}




const styles = StyleSheet.create({
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
        paddingTop: 55
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
        borderColor: '#f06823',
        fontFamily: 'Prompt-Light'
    },
    loginButton: {
        height: 60,
        backgroundColor: '#f06823',
        alignSelf: 'stretch',
        bottom: 25,
        borderRadius: 15,
        justifyContent: 'center',
        fontFamily: 'Prompt-Light',
        fontSize: 18
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
        alignSelf: 'center',
        fontFamily: 'Prompt-Light'
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

const mapStateToProps = (state) => ({
    logoutReducers: state.logoutReducers
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Forgetpass)

// export default Forgetpass;
