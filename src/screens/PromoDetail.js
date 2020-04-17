import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';

class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_text: '',
            pic:''
        };
    }
    componentWillMount() {
        this.get_data()
    }

    get_data() {
        const id_pro = this.props.navigation.getParam('id')
        // console.log('promotion_id :' + id_pro)
        // var data = new FormData();
        // data.append("id", id_pro);
        axios.get('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_data_promotion&promotion_id=' + id_pro)
            .then(respons => {
                //console.log(respons)
                this.setState({
                    data_text: respons.data,
                    pic:respons.data.thumbnail_pic
                })
                console.log('MM=>',this.state.pic)

            })
    }
    render() {
        // const img_data = this.props.navigation.getParam('img')
        return (

            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{
                    backgroundColor: '#F06823',
                    height: hp(9),
                    width: '100%',

                }}>

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
                            source={require('../imgs/leftarrow.png')}></Image>
                    </TouchableHighlight>
                    <Text
                        style={{

                            color: 'white',
                            fontSize: 18,
                            textAlign: 'auto',
                            left: 45,
                            fontFamily:'Prompt-Bold'
                        }}>{stringsoflanguages.p2}</Text>

                 

                </View>

                <View >
                    <Image
                        resizeMode='stretch'
                        style={{ width: wp('97.5%'), height: hp(30), marginLeft: 5, top: 5 }}
                        source={{uri:this.state.pic}}
                />

                    <ScrollView style={{ margin: 5, marginBottom: 280, top: 5 }}>
                        <View >
                            {/* <ScrollView style={{margin:10 }}> */}
                            <Text style={{ fontSize: 20, margin: 10, color: '#F06823', fontFamily:'Prompt-Bold' }}>
                                {this.state.data_text.promotion_name}
                            </Text>
                            <Text style={{ fontSize: 15, margin: 10, fontFamily:'Prompt-Light' }}>
                                {this.state.data_text.description}
                            </Text>
                        </View>
                    </ScrollView>

                </View>

            </View>
        );
    }
}

export default Promotion;
