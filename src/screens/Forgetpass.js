import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight ,ScrollView,Alert} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';

class Forget extends React.Component {
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


  state = {
    data: [
      {
        label:  `${stringsoflanguages.p94}`,
        value: "email",
      },
      {
        label:  `${stringsoflanguages.p104}`,
        value: "phone",

      },



    ],
    username : '',
    selected : '',
    show: false,
    selected : []
  };

  componentDidMount() {
    //let aa = this.state.data[0].value
    let selectedButton = this.state.data.find(e => e.selected == true);
    let selectedButton1 = selectedButton ? selectedButton.value : this.state.data[0].value;
    this.setState({ selected : selectedButton1 }) 
    console.log('gg',selectedButton1)
  }

  handleOpen = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
    this.props.navigation.navigate("Login")
  }
  // update state
  onPress = data => this.setState({ selected : data });

  onLogin() {
    this.props.navigation.navigate("Login")
  }

  send_data(i){
    console.log('gg : 1'+i)
    //this.props.navigation.navigate("Login")
    var data = new FormData();
    data.append("username_type", i);
    data.append("username", this.state.username);
    axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_forget_password', data)
    .then(respons => {
        console.log(respons)
          if(respons.data.status = 'phone number has already used'){
            Alert.alert('fail1111')
          }else{
           Alert.alert('success')
          }
        })
  }

  render() {
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.data[0].value;
    //this.state.selected = selectedButton
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#F5FCFF', }}>
      <View style={{ backgroundColor: 'white', flex: 1, height: hp(100) }}>

          <View style={{
              backgroundColor: '#F06823',
              height: hp(9),
              width: wp(100),
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
          }}>{stringsoflanguages.p13}</Text>

        <View style={{ flex: 1, top: 22 }}>


          <Text style={{ fontSize: 18, textAlign: 'center', margin: 20, marginTop: 80, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p51}</Text>



          <RadioGroup
            radioButtons={this.state.data}
            onPress={this.onPress}
            flexDirection='row'
            color='red' />

            {/* <Text>{selectedButton}</Text> */}



          <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 8
          }}>
            <View
              resizeMode='contain'
              style={{
                width: 70,
                height: 62,
                top: 23,
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
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: 10,
                  top: 13
                }}
                source={require("../imgs/user_icon.jpg")}></Image></View>



            <TextInput
              onChangeText={(text) => this.setState({ username: text })}
              autoCapitalize={'words'}
              autoCorrect={false}
              style={{
                height: 65,
                width: '100%',
                bottom: 40,
                paddingLeft: 60,
                borderRadius: 15,
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 15,
                borderWidth: 2,
                paddingTop: 20,
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
            bottom:hp(11)
          }}>
            <SCLAlert
              show={this.state.show}
              onRequestClose={this.handleClose}
              theme="success"
              title={stringsoflanguages.p91}
              subtitle={stringsoflanguages.p53}

            >
              <SCLAlertButton theme="success" onPress={this.handleClose}>{stringsoflanguages.p1}</SCLAlertButton>
              {/* <SCLAlertButton theme="default" onPress={this.handleClose}>Cancel</SCLAlertButton> */}
            </SCLAlert>

            <TouchableHighlight
              onPress={() =>this.send_data(selectedButton)}
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
              {stringsoflanguages.p52}
                         </Text>
            </TouchableHighlight>

          </View>












        </View>

      </View>
      </ScrollView>
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





export default Forget;



