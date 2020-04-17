import React, { Component } from 'react';
import { KeyboardAvoidingView,SafeAreaView,View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'
import { Update } from '../myRedux/actions';

class Member extends React.Component {

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
      load: false,
      member_data: null,

      date: "",
      first_name: "",
      last_name: "",
      birtday: "2019-04-04",
      email: "",
      phone: "",
      gender: [
        {
          label: `${stringsoflanguages.p44}`,
          value: "male",
          
        },
        {
          label: `${stringsoflanguages.p45}`,
          value: "female",
         
        },
      ],
      gar: [],
      total_point: "",
      summary_point: "",
      summary_coin: "",
      level_member: "",
      gender_check: ""



    }

  }

  componentWillMount() {
    this.get_member_data()

  }



  UpdataMember(selectedButton) {
    // let a = this.state.email
    // console.log('gg'+a)

    this.props.dispatch(Update(this.state.first_name))


    var data = new FormData();
    data.append("member_id", global.get_member_id);
    data.append("first_name", this.state.first_name);
    data.append("last_name", this.state.last_name);
    data.append("birthday", this.state.date);
    data.append("email", this.state.email);
    data.append("phone", this.state.phone);
    data.append("gender", selectedButton);
    console.log(data)

    // alert(this.state.first_name);

    axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_update_data_member', data)
      .then(respons => {
        console.log('DATE' + respons.data)


        /*
        if(respons.data.status == 'update successfully'){
            // go to next page
            console.log('otp : done')
            // this.props.navigation.navigate("Register_confirm")
            
        }else{
            // alert error
            console.log('error')
        }*/
      })

    this.props.navigation.goBack();
  }
  get_member_data() {

    var data = new FormData();
    data.append("member_id", global.get_member_id);
    axios.post('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_data_member', data)
      .then(respons => {
        console.log('GET', respons.data)

        // let gender_g = gender
        this.setState({
          member_data: respons.data,
          email: respons.data.email,
          phone: respons.data.phone,
          first_name: respons.data.first_name,
          last_name: respons.data.last_name,
          date: respons.data.birthday,
          // gender:respons.data.gender,
          total_point: respons.data.total_point,
          summary_coin: respons.data.summary_coin,
          summary_point: respons.data.summary_point,
          level_member: respons.data.level_member

        })
        //this.check_gar(respons.data.gender)

        if(respons.data.gender == 'female'){
          this.state.gender[1].selected = true
          this.state.gender[0].selected = false
        }



        console.log(this.state.member_data.email)
        if (respons.status == 200) {
          this.setState({ load: true })
          //console.log(this.state.member_data.email)
        }
        /*
        if(respons.data.status == 'register successfully'){
            // go to next page
            let mem_id = respons.data.member_id
            this.props.navigation.navigate("Register_otp",{mem_id})
            console.log('done')
        }else{
            // alert error
            console.log('error')
        }
        */
      })

  }


  // update state
  // onPress = (data) => { this.setState({ gender: data }) };
  onPress = gender => this.setState({ gender });


  onChangepass() {
    this.props.navigation.navigate("Changepass")
  }







  render() {
    let selectedButton = this.state.gender.find(e => e.selected == true);
   
    selectedButton = selectedButton ? selectedButton.value : this.state.gender[0].value;
   
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F06823', }}>
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
                }}>{stringsoflanguages.p36}</Text>
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

        <ScrollView style={{ flex: 1, backgroundColor: '#F5FCFF', }}>
        <KeyboardAvoidingView behavior="padding" enabled>

        
        <View style={{ backgroundColor: 'white', flex: 1, height: hp(105) }}>

          <View style={{ backgroundColor: '#fff', height : 100, marginTop : 20 }}>

            <Text style={{ margin: 35, fontSize: 13, fontFamily: 'Prompt-Bold' }}>{stringsoflanguages.p37}</Text>
            {this.state.level_member == 'orange' ?
              <View >
                <Image
                  resizeMode='contain'
                  fadeDuration={0.5}
                  style={{
                    width: wp(10),
                    height: hp(10),
                    left: wp(40),
                    bottom: hp(13),
                  }}
                  source={require("../imgs/class_1.png")}></Image>

                <Text style={{ bottom: hp(14), color: '#000', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(5), fontSize: 12, }}>Orange</Text>

              </View> : null}

            {this.state.level_member == 'orange' ?
              <View style={{ bottom: hp(13), left: wp(22) }}>
                <Image
                  resizeMode='contain'
                  fadeDuration={0}
                  style={{
                    width: wp(7.5),
                    height: hp(7.5),
                    left: wp(38),
                    bottom: hp(10.5),
                  }}
                  source={require("../imgs/class.png")}></Image>
                <Text style={{ bottom: hp(11), color: '#ddd', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(8.5), fontSize: 12, }}>Gold</Text>

              </View> : null}

            {this.state.level_member == 'orange' ?
              <View style={{ bottom: hp(21), left: wp(42) }}>
                <Image
                  resizeMode='contain'
                  fadeDuration={0}
                  style={{
                    width: wp(7.5),
                    height: hp(7.5),
                    left: wp(38),
                    bottom: hp(12.5),
                  }}
                  source={require("../imgs/class.png")}></Image>
                <Text style={{ bottom: hp(13), color: '#ddd', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(8), fontSize: 12, }}>Platinum</Text>

              </View> : null}




            {this.state.level_member == 'gold' ?
              <View >
                <Image
                  resizeMode='contain'
                  fadeDuration={0.5}
                  style={{
                    width: wp(7.5),
                    height: hp(7.5),
                    left: wp(40),
                    bottom: hp(11),
                  }}
                  source={require("../imgs/class.png")}></Image>

                <Text style={{ bottom: hp(11), color: '#ddd', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(6.5), fontSize: 12, }}>Orange</Text>

              </View> : null}

            {this.state.level_member == 'gold' ?
              <View style={{ bottom: hp(10), left: wp(22) }}>
                <Image
                  resizeMode='contain'
                  fadeDuration={0}
                  style={{
                    width: wp(10),
                    height: hp(10),
                    left: wp(38),
                    bottom: hp(13),
                  }}
                  source={require("../imgs/class_2.png")}></Image>
                <Text style={{ bottom: hp(13.5), color: '#000', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(7), fontSize: 12, }}>Gold</Text>

              </View> : null}

            {this.state.level_member == 'gold' ?
              <View style={{ bottom: hp(18), left: wp(42) }}>
                <Image
                  resizeMode='contain'
                  fadeDuration={0}
                  style={{
                    width: wp(7.5),
                    height: hp(7.5),
                    left: wp(38),
                    bottom: hp(15),
                  }}
                  source={require("../imgs/class.png")}></Image>
                <Text style={{ bottom: hp(15), color: '#ddd', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(8), fontSize: 12, }}>Platinum</Text>

              </View> : null}






            {this.state.level_member == 'platinum' ?
              <View >
                <Image
                  resizeMode='contain'
                  fadeDuration={0.5}
                  style={{
                    width: wp(7.5),
                    height: hp(7.5),
                    left: wp(40),
                    bottom: hp(11),
                  }}
                  source={require("../imgs/class.png")}></Image>

                <Text style={{ bottom: hp(11), color: '#ddd', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(6.5), fontSize: 12, }}>Orange</Text>

              </View> : null}

            {this.state.level_member == 'platinum' ?
              <View style={{ bottom: hp(10), left: wp(22) }}>
                <Image
                  resizeMode='contain'
                  fadeDuration={0}
                  style={{
                    width: wp(7.5),
                    height: hp(7.5),
                    left: wp(38),
                    bottom: hp(11),
                  }}
                  source={require("../imgs/class.png")}></Image>
                <Text style={{ bottom: hp(11), color: '#ddd', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(8.5), fontSize: 12, }}>Gold</Text>

              </View> : null}

            {this.state.level_member == 'platinum' ?
              <View style={{ bottom: hp(18), left: wp(42) }}>
                <Image
                  resizeMode='contain'
                  fadeDuration={0}
                  style={{
                    width: wp(13),
                    height: hp(13),
                    left: wp(38),
                    bottom: hp(16),
                  }}
                  source={require("../imgs/class_3.png")}></Image>
                <Text style={{ bottom: hp(19), color: '#000', fontFamily: 'Prompt-Light', textAlign: 'center', right: wp(6), fontSize: 12, }}>Platinum</Text>

              </View> : null}
          </View>






          <View style={{ backgroundColor: '#ddd' , flexDirection : 'row',}}>
            <View style={{width : wp(31)}}>
              <Text style={{ padding : 25 ,  fontSize: 13, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p38}</Text>
            </View>
            <TextInput
              onChangeText={(text) => this.setState({ first_name: text })}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.state.first_name}
              style={{
                backgroundColor: '#eaeaea',
                // bottom: 43,
                width: wp(65),
                height: hp(5),
                alignSelf: 'center',
                // left: wp(14),
                fontSize: 12,
                borderRadius: 5,
                padding: 3,
                textAlign: 'justify',
                fontFamily: 'Prompt-Light'

              }}


            ></TextInput>
          </View>



          <View style={{ backgroundColor: '#ddd',  flexDirection : 'row', marginTop : 1}}>
            <View style={{width : wp(31)}}>
              <Text style={{ padding : 25, fontSize: 13, fontFamily: 'Prompt-Light' }} >{stringsoflanguages.p39}</Text>
            </View>
            <TextInput
              onChangeText={(text) => this.setState({ last_name: text })}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.state.last_name}
              style={{
                backgroundColor: '#eaeaea',
                // bottom: 41,
                width: wp(65),
                height: hp(5),
                alignSelf: 'center',
                // left: wp(14),
                fontSize: 12,
                borderRadius: 5,
                padding: 4,
                textAlign: 'justify',
                fontFamily: 'Prompt-Light'
              }}

            ></TextInput>


          </View>

          <View style={{ backgroundColor: '#ddd', marginTop:1, height: hp(9.5), }}>
            <View style={{width : wp(31)}}>
              <Text style={{ padding : 25, fontSize: 13, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p40}</Text>
            </View>

            <DatePicker
              style={{ width: wp(53), bottom: wp(12), left: wp(41) }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
                  format="YYYY-MM-DD"
              // placeholder={stringsoflanguages.p95}
              // format="YYYY-MM-DD"
              // minDate="2500-05-01"
              // maxDate="2562-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"

              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: wp(47),
                  // top: 4,
                  bottom: wp(3),
                  marginLeft: 0
                },
                dateInput: {
                  backgroundColor: '#eaeaea',
                  width: 150,
                  right: wp(10),
                  fontSize: 12,
                  borderRadius: 5,
                  height: wp(9.5),
                  bottom: wp(2),
                  borderColor: '#eaeaea',
                  textAlign: 'flex-start', fontFamily: 'Prompt-Light'
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ date: date }) }} />
          </View>







          <View style={{ backgroundColor: '#ddd', flexDirection : 'row', marginTop:1 }}>
            <View style={{width : wp(31)}}>
              <Text style={{ padding: 25, fontSize: 13, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p94}</Text>
            </View>

            <TextInput
              onChangeText={(text) => this.setState({ email: text })}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.state.email}
              style={{
                backgroundColor: '#eaeaea',
                // bottom: 41,
                width: wp(65),
                height: hp(5),
                alignSelf: 'center',
                // left: wp(14),
                fontSize: 12,
                borderRadius: 5,
                padding: 4,
                textAlign: 'justify',
                fontFamily: 'Prompt-Light'
              }}

            ></TextInput>
          </View>







          <View style={{ backgroundColor: '#ddd', flexDirection : 'row', marginTop:1}}>
            <View style={{width : wp(31)}}>
              <Text style={{ padding: 25, fontSize: 13, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p42}</Text>
            </View>
            <TextInput
              onChangeText={(text) => this.setState({ phone: text })}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.state.phone}
              style={{
                backgroundColor: '#eaeaea',
                // bottom: 41,
                width: wp(65),
                height: hp(5),
                alignSelf: 'center',
                // left: wp(14),
                fontSize: 12,
                borderRadius: 5,
                padding: 4,
                textAlign: 'justify',
                fontFamily: 'Prompt-Light'
              }}

            ></TextInput>
          </View>




          <View style={{ backgroundColor: '#ddd',marginTop:1 , flexDirection : 'row'}}>
            <Text style={{ padding : 25, fontSize: 13, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p43}</Text>
            
            <View style = {{padding : 20}}> 
              <RadioGroup
                radioButtons={this.state.gender}
                onPress={this.onPress}
                flexDirection='row'
              />
            </View>
              
          
          </View>

          <View style={{ backgroundColor: '#ddd', marginTop:1, flexDirection :'row' }}>
            <Text style={{ padding: 25, fontSize: 13, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p12}</Text>


            <TouchableHighlight
              underlayColor={"#C5C6D0"}
              onPress={this.onChangepass.bind(this)}
              style={{

                // bottom: 41,
                width: 275,
                alignSelf: 'center',
                // left: 56,
                fontSize: 12,
                borderRadius: 5,
                padding: 4,
                textAlign: 'justify',
                // height: 30
              }}
            >
              <Text style={{
                fontSize: 15,
                textDecorationLine: 'underline',
                fontFamily: 'Prompt-Light'


              }}>{stringsoflanguages.p46} </Text>

            </TouchableHighlight>




          </View>

          {/* </View>: null } */}





          <View style={{ backgroundColor: '#ddd', marginTop : 1 , height : '100%'}}>
            <View style={{padding : 10}}>
            <TouchableHighlight
              onPress={() => this.UpdataMember(selectedButton)}
              style={{
                height: hp(7),
                width: wp(60),
                backgroundColor: '#F06823',
                alignSelf: 'center',
                top: hp(1),
                borderRadius: 10,
                justifyContent: 'center',
                // padding: 25,
                // bottom: hp(60)

              }}>
              <Text style={{
                fontSize: 15,
                color: '#FFF',
                alignSelf: 'center',
                fontFamily: 'Prompt-Light'
              }}>
                {stringsoflanguages.p47}
              </Text>
            </TouchableHighlight>
            </View>
            


          </View>

        </View>
        
      </KeyboardAvoidingView>
      </ScrollView>
      
      </SafeAreaView>
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
  logoutReducers: state.logoutReducers
});
const mapDispatchToProps = (dispatch) => ({
  dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(Member)




