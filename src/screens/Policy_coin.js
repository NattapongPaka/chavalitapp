import React, { Component } from 'react';
import { SafeAreaView,View, Text, Image, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';

class Policy_coin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_text: ''
        };
    }
    componentDidMount() {
        this.test1()

    }

    test1() {
        fetch('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_coin_condition_text')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    data_text: responseJson
                }, function () {
                    console.log(this.state.data_text)
                });
            })

            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (
            <SafeAreaView style={{
                backgroundColor: '#F06823',
                flex: 1,
        
              }}>

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
                <View style={{flexDirection : 'row'}}>
                    
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
                    }}>{stringsoflanguages.p24}</Text>
                </View>
            </View>


            <View style={{flex : 1 , backgroundColor : '#fff'}}>
                <Text style={{ fontSize: 18, margin: 20, fontFamily:'Prompt-Light' }}>  
                    {this.state.data_text.coin_condition_text}
                </Text>            
            </View>



            </SafeAreaView>



                



        

        );
    }
}

export default Policy_coin;
