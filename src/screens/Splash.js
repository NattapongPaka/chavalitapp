import React from 'react';
import { View, Image, Text, AsyncStorage, FlatList,Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';
import axios from 'axios';
// import { FlatList } from 'react-native-gesture-handler';


// const rows = [
//     { id: 0, text: 'View' },
//     { id: 1, text: 'Text' },
//     { id: 2, text: 'Image' },
//     { id: 3, text: 'ScrollView' },
//     { id: 4, text: 'ListView' },
// ]

// const extractKey = ({ id }) => id

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name_quiz: "",
            quiz: [],
            coin_quiz:''
        }
    }

  

  async  send_question(item){
 
        // Alert.alert(item);
        const value = await AsyncStorage.getItem('member_id');
        var data = new FormData();
        data.append("member_id",value);
        data.append("choice_id", item);
        //data.append("password", this.state.password);

        console.log('mem_id : ' + value + ', otp :' + item)
        axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_answer_question', data)
        .then(respons => {
            console.log('RER=>',respons)
            this.setState({
                coin_quiz: respons.data.amount_coin_register            
              })
            //   console.log('RER=>',respons.data.amount_coin_register)
            if(respons.data.amount_coin_register > 0){

                alert("RWERWRWERWE")
                // this.props.navigation.navigate("Navigation")

            }
           
        })
           
 
    }


    close() {
        this.props.navigation.navigate("Navigation")
    }

    componentWillMount() {
        this.get_question()
    }


    async get_question() {
        const value = await AsyncStorage.getItem('member_id');
        axios.get('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_quest&member_id=' + value)
            .then(respons => {
                console.log('LOL', respons)
                let choice = respons.data.choices
                let sus = Object.keys(choice).map(key => choice[key])

                // console.log('SUS=>', sus)

                this.setState({
                    name_quiz: respons.data.question,
                    quiz:sus                   
                })
               
                console.log('SUS01=>', this.state.quiz)

            })

    }

    renderItem = ({ item }) => {
        return (
            
            <Text style={{
                padding: 15,
                marginBottom: 5,
                backgroundColor: 'white',
                textAlign:'center'
            }}
           onPress={this.Getquiz.bind(this, item.id)}
           >
                {item.choices}
            </Text>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: '#F06823', width: wp('100%'), height: ('100%') }}>




                <View style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    width: wp('90%'),
                    height: ('65%'),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: hp('15%'),
                    borderRadius: 15,
                    position: 'absolute'
                }}>

                    <View style={{ bottom: 120 }}>

                        {/* <Text style={{ fontSize: 18, color: 'white' }}>{this.state.name_quiz}</Text> */}

                        <View style={{ top: 140 }}>
                            <Text style={{ fontSize: 18, color: 'white', padding: 15 }}>{this.state.name_quiz}</Text>
                            {/* <Text> ERWERRE </Text> */}
                            <FlatList
                                data={this.state.quiz}
                                renderItem={this.renderItem}
                               
                            // keyExtractor={extractKey}
                            />

                            <Text
                                style={{
                                    marginBottom: 40,
                                    textAlign: 'center',
                                    textDecorationLine: 'underline',
                                    fontFamily: 'Prompt-Light',
                                    fontSize: 18,
                                    color: 'white'
                                }}
                                onPress={() => this.close()}
                            >
                                {stringsoflanguages.p110}
                            </Text>
                        </View>

                    </View>


                </View>






            </View>

        )
    }
}