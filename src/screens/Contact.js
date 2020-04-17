import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableHighlight, screenWidth, Linking, TouchableOpacity, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'

class Gallery extends React.Component {
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
        super(props);
        this.state = {
            dataSource: ''
        };
    }


    componentDidMount() {

        return fetch(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_contact')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    openDetail() {
        this.props.navigation.navigate("GalleryDetail")
    }

    onContact() {
        this.props.navigation.navigate("Contact")
    }

    contactPhone(arg) {
        let tel = 'tel:' + (arg ? arg : '0917769047')
        Linking.openURL(tel)
    }


    render() {

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
            <View style={{flexDirection : 'row', marginTop : hp('1%')}}>           
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
                }}>{stringsoflanguages.p82}</Text>
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

            <ScrollView >
                <View >

                    <View>
                        <Swiper style={{ padding: 92 }} showsButtons>
                            <View style={styles.slide1}>
                                <Image
                                    resizeMode='contain'
                                    style={{ height: hp('98%'), width: wp('100%') }}
                                    source={require("../imgs/contact.jpg")} />
                            </View>
                            <View style={styles.slide2}>
                                <Image
                                    resizeMode='contain'
                                    style={{ height: hp('98%'), width: wp('100%') }}
                                    source={require("../imgs/contact_2.jpg")} />
                            </View>
                            <View style={styles.slide3}>
                                <Image
                                    resizeMode='contain'
                                    style={{ height: hp('98%'), width: wp('100%') }}
                                    source={require("../imgs/contact_3.jpg")} />
                            </View>
                            <View style={styles.slide3}>
                                <Image
                                    resizeMode='contain'
                                    style={{ height: hp('98%'), width: wp('100%') }}
                                    source={require("../imgs/contact_4.jpg")} />
                            </View>
                        </Swiper>
                    </View>

                    <View
                        style={{
                            backgroundColor: '#dddddd',
                            height: hp(7),
                            width: wp(100),

                        }}>
                        <Image
                            resizeMode='contain'
                            style={{
                                width: '97.5%',
                                height: '85%',
                                position: 'absolute',
                                margin: 3,
                                left: 5,
                                right: 5,
                                alignItems: 'center'
                            }}
                            source={require("../imgs/contact_logo.jpg")} />
                    </View>

                    <View style={{ margin: 25, }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'Prompt-Light',


                            }}>
                            {this.state.dataSource.address}</Text>


                        <Text
                            style={{
                                // padding: 15,
                                fontSize: 16,

                                fontFamily: 'Prompt-Light'
                            }}>
                            {this.state.dataSource.phone}</Text>

                        <Text
                            style={{
                                // paddingTop:10,
                                fontSize: 18,
                                // bottom: hp(1),
                                fontFamily: 'Prompt-Light'


                            }}>
                            {this.state.dataSource.email}</Text>
                    </View>



                    <View style={{ marginLeft: 25 }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Prompt-Bold' }}>{stringsoflanguages.p83}</Text>
                    </View>





                    <View style={{ flexDirection: 'row', top: hp(2) }} >
                        <TouchableOpacity
                            onPress={() => { Linking.openURL(this.state.dataSource.facebook_link) }}
                            style={{
                                height: hp('7%'),
                                width: wp('12%'),
                                borderRadius: 10,
                                marginLeft: 20
                            }}>
                            <Image
                                resizeMode='contain'
                                style={{
                                    height: hp('7%'),
                                    width: wp('14%'),
                                    borderRadius: 10,

                                }}
                                source={require("../imgs/fb_icon.jpg")}
                            ></Image>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => { Linking.openURL(this.state.dataSource.ig_link) }}
                            style={{
                                height: hp('7%'),
                                width: wp('12%'),
                                borderRadius: 10,
                                // right:wp('12%'),
                                marginLeft: 23

                            }}>
                            <Image
                                resizeMode='contain'
                                style={{
                                    height: hp('7%'),
                                    width: wp('14%'),

                                }}
                                source={require("../imgs/ig.png")}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { Linking.openURL(this.state.dataSource.youtube_link) }}
                            style={{
                                height: hp('7%'),
                                width: wp('12%'),
                                // right:wp('15%'),
                                borderRadius: 10,
                                marginLeft: 23

                            }}>
                            <Image
                                resizeMode='contain'
                                style={{
                                    height: hp('7%'),
                                    width: wp('14%'),
                                }}
                                source={require("../imgs/youtube.png")}></Image>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => { Linking.openURL(this.state.dataSource.line_link) }}
                            style={{
                                height: hp('7%'),
                                width: wp('12%'),
                                // left:wp('30%'),
                                borderRadius: 10,
                                marginLeft: 23

                            }}>
                            <Image
                                resizeMode='contain'
                                style={{
                                    height: hp('7%'),
                                    width: wp('14%'),
                                }}
                                source={require("../imgs/line.png")}></Image>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => { Linking.openURL(this.state.dataSource.website_link) }}
                            style={{
                                height: hp('7%'),
                                width: wp('12%'),
                                // left:wp('37%'),
                                borderRadius: 10,
                                marginLeft: 23

                            }}>
                            <Image
                                resizeMode='contain'
                                style={{
                                    height: hp('7%'),
                                    width: wp('14%'),
                                }}
                                source={require("../imgs/web.png")}></Image>
                        </TouchableOpacity>

                    </View>



                    <View >
                        <TouchableHighlight
                            // onPress={() => { Linking.openURL('https://www.google.com/maps/dir//Chavalit+Optic+by+Optometrist+%E0%B8%8A%E0%B8%A7%E0%B8%A5%E0%B8%B4%E0%B8%95+%E0%B8%AD%E0%B8%AD%E0%B8%9E%E0%B8%95%E0%B8%B4%E0%B8%84+%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B8%99%E0%B8%AA%E0%B9%8C%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B8%AA%E0%B8%8B%E0%B8%B5%E0%B8%9F+%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%95%E0%B8%B2+2147+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A7+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87+%E0%B8%AA%E0%B8%B0%E0%B8%9E%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B8%AD%E0%B8%87+%E0%B9%80%E0%B8%82%E0%B8%95+%E0%B8%A7%E0%B8%B1%E0%B8%87%E0%B8%97%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%87+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10310/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29dc22f36c929:0x11a9b7b5ca47436e?ved=0ahUKEwicg6zPx-rgAhU0huYKHfXpBPcQ48ADCCk') }}
                            onPress={() => { Linking.openURL(this.state.dataSource.gps) }}
                            style={{
                                height: 45,
                                backgroundColor: '#F06823',
                                margin: 20,
                                top: 13,
                                borderRadius: 10,
                            }}>
                            <Text style={{
                                fontSize: 17,
                                color: '#FFF',
                                alignSelf: 'center',
                                padding: 10,
                                fontFamily: 'Prompt-Light'
                            }}>
                                {stringsoflanguages.p93}
                            </Text>
                        </TouchableHighlight>



                        <TouchableHighlight
                            // onPress={() => { Linking.openURL(this.state.dataSource.website_link) }}
                            onPress={() => { this.contactPhone(this.state.dataSource.tel) }}
                            style={{
                                height: 45,
                                backgroundColor: '#F06823',
                                alignSelf: 'auto',
                                borderRadius: 10,
                                justifyContent: 'center',
                                margin: 20,
                                bottom: 10,
                            }}>
                            <Text style={{
                                fontSize: 17,
                                color: '#FFF',
                                alignSelf: 'center',
                                padding: 50,
                                fontFamily: 'Prompt-Light'
                            }}>
                                {stringsoflanguages.p92} {this.state.dataSource.tel}
                            </Text>
                        </TouchableHighlight>
                    </View>


                </View>

            </ScrollView>
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
        height: hp('10%')
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



const styles = {
    wrapper: {

    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}
const mapStateToProps = (state) => ({
    logoutReducers: state.logoutReducers
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)

// export default Gallery;
