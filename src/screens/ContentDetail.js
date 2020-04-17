
import React, { Component } from 'react';
import { SafeAreaView,View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'

class ContentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_text: ''
        };
    }
    componentWillMount() {
        this.get_data()
    }

    get_data() {
        const id_con = this.props.navigation.getParam('id')
        console.log('article_id :' + id_con)
        var data = new FormData();
        data.append("id", id_con);
        axios.get('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_article_detail&article_id=' + id_con)
            .then(respons => {
                //console.log(respons)
                this.setState({
                    data_text: respons.data
                })
                console.log(this.state.data_text)

            })
    }

    onContentGallery() {
        console.log();
        const id_con = this.props.navigation.getParam('id')      
        this.props.navigation.navigate("ContentGallery", { id_gallery: id_con, name: this.state.data_text.title })
    }


    render() {
        const img_data = this.props.navigation.getParam('img')
        return (

            <SafeAreaView style={{ backgroundColor: '#F06823', flex: 1 }}>

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
                        }}>{stringsoflanguages.p80}</Text>
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
        
                <View style = {{ backgroundColor : '#fff'}}> 
                    <Image
                        resizeMode='contain'
                        style={{ width: wp('97.5%'), height: hp(30), marginLeft: 5, top: 13 }}
                        source={{ uri: img_data }}
                    />
                </View>
                <View style={{flex:1 , backgroundColor : '#fff'}}>
                    <Text style={{ fontSize: 20, margin: 10, color: '#F06823',textAlign:'center',paddingTop: 10 }}>
                        {this.state.data_text.title}
                    </Text>
                    <ScrollView style={{ padding: 20, backgroundColor : '#fff'}}>
                        <View >
                            {/* <ScrollView style={{margin:10 }}> */}

                            <Text style={{ fontSize: 15 }}>
                                {this.state.data_text.content} </Text>


                        </View>


                    </ScrollView>
                </View>

                <View style={{padding:20 , backgroundColor : '#fff'}}>

                    <TouchableHighlight
                        onPress={() => this.onContentGallery()}
                        style={{
                            height: hp('7%'),
                            width: wp('85%'),
                            backgroundColor: '#f06823',
                            // alignSelf: 'stretch',
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignSelf: 'center',

                           
                        }}>
                        <Text style={{
                            fontSize: 15,
                            color: '#FFF',
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontFamily: 'Prompt-Light'
                        }}>
                            {stringsoflanguages.p81}
                        </Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>





        );
    }
}

const mapStateToProps = (state) => ({
    logoutReducers: state.logoutReducers
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetail)

