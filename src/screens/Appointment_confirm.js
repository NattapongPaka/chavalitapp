import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight, Picker, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'

class Appointment extends React.Component {
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


    onNavbar() {
        this.props.navigation.navigate("Navigation")
    }


    render() {
        return (

            <View style={{ backgroundColor: 'white', flex: 1 }}>

                {/* <View style={{
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

                    }}>{stringsoflanguages.p79}</Text>

<Text
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 12,
                        left: wp(66),
                        position: 'absolute',
                        top: hp(3),
                        fontFamily:'Prompt-Light'
                    }}>{stringsoflanguages.p9} : {this.props.logoutReducers.first_name}</Text>

                <Text
                    style={{

                        textAlign: 'center',
                        color: 'white',
                        fontSize: 12,
                        left: wp(62),
                        position: 'absolute',
                        top: hp(6),
                        fontFamily:'Prompt-Light'
                    }}>{stringsoflanguages.p5} :   </Text>

                <Text
                    style={{

                        textAlign: 'center',
                        color: 'white',
                        fontSize: 12,
                        left: wp(73),
                        position: 'absolute',
                        top: hp(6),
                        fontFamily:'Prompt-Light'
                    }}> {this.props.logoutReducers.summary_point}</Text>

                <Image
                    resizeMode='contain'
                    style={{
                        width: 50,
                        height: 15,
                        left: wp(77),
                        bottom: hp(2)
                    }}
                    source={require("../imgs/coin.png")}></Image>

                <Text
                    style={{

                        textAlign: 'center',
                        color: 'white',
                        fontSize: 12,
                        left: wp(87),
                        position: 'absolute',
                        top: hp(6),
                        fontFamily:'Prompt-Light'
                    }}> {this.props.logoutReducers.summary_coin}</Text> */}

                <View style={{ alignItems: 'center' , marginTop : hp(10)}}>

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




                    <Text style={{ fontSize: 30, color: '#F06823', bottom: 23, fontFamily:'Prompt-Bold' }}> {stringsoflanguages.p87}</Text>
                    <Text style={{ fontSize: 18, fontFamily:'Prompt-Light' }}> เราได้รับข้อมูลของท่านแล้ว</Text>
                    <Text style={{ fontSize: 18 , fontFamily:'Prompt-Light'}}> เราจะติดต่อกลับไปหาท่านโดยเร็วที่สุด</Text>


                    <TouchableHighlight
                        onPress={this.onNavbar.bind(this)}
                        style={{
                            height: 45,
                            backgroundColor: '#F06823',
                            alignSelf: 'stretch',
                           top:10,
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
                           {stringsoflanguages.p89}
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

const mapStateToProps = (state) => ({
    logoutReducers : state.logoutReducers
  })
  
  const mapDispatchToProps = (dispatch) => ({
    dispatch
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Appointment)



// export default Appointment;
