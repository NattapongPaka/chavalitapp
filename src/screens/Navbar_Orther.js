import React from 'react';
import { Text, View, Image, StyleSheet, FlatList, Alert, ScrollView, TouchableHighlight, TabView } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements';
import Tabs from './Tabs';
import stringsoflanguages from './stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { setClear } from '../myRedux/actions';
import { LoginManager } from 'react-native-fbsdk';

class OtherScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/menu.png')}
        style={[{ resizeMode: 'contain', width: 25, height: 25 }, { tintColor: tintColor }]}
      />

    ),
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "grey",
      activeBackgroundColor: "#f06823",
      inactiveBackgroundColor: "#f06823",
      style: {
        backgroundColor: '#f06823',
      }
    }

  };

  constructor(props) {
    super(props);
    const lang = [
      { shortform: 'en', longform: 'English' },
      { shortform: 'th', longform: 'ภาษาไทย' },
    ];
    global.lang = lang;

  }


  settext(value) {
    console.log(value);
    stringsoflanguages.setLanguage(value);
    this.props.navigation.navigate('Navigation', { JSON_Clicked_Item: value, });
  }



  async onMember() {

    const value = await AsyncStorage.getItem('member_id');
    if (value !== null) {
      // We have data!!
      console.log(value);
      global.get_member_id = value;
      this.setState({ member_id: JSON.stringify(value) })
      console.log('global : ' + global.get_member_id)
      this.props.navigation.navigate("Member")

      var data = new FormData();
      data.append("member_id", global.get_member_id);
      axios.post('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_data_member', data)
        .then(respons => {
          console.log(respons)
          this.setState({
            data_mem: respons.data
          })
          console.log(this.state.data_mem)

        })
    } else {
      Alert.alert(
        'CHAVALIT',
        `${stringsoflanguages.p84}`,
        [

          { text: `${stringsoflanguages.p107}`, onPress: () => this.onLogout() },
        ],
        { cancelable: false },
      );
      console.log('Login error')
    }


  }



  onChangepass() {

    this.props.navigation.navigate("Changepass")
  }

  onGallery() {
    this.props.navigation.navigate("Gallery")
  }

  onAppoint() {
    this.props.navigation.navigate("Appoint")
  }

  onContent() {
    this.props.navigation.navigate("Content")
  }

  onContact() {
    this.props.navigation.navigate("Contact")
  }

  onChangeLang() {
    this.props.navigation.navigate("LanguageSelectionScreen")
  }

  onHome() {
    // let data = this.props.logoutReducers
    // alert(JSON.stringify(data))

    Alert.alert(
      'CHAVALIT',
      `${stringsoflanguages.p105}`,
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.onLogout() },
      ],
      { cancelable: false },
    );
  }



  async onLogout() {
    this.props.dispatch(setClear())
    LoginManager.logOut()
    await AsyncStorage.removeItem('member_id')
    // global.get_member_id = null
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      // <ScrollView style={{marginBottom:220}}>
      <View style={{ flex: 1 }}>
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
              }}>{stringsoflanguages.p8}</Text>
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
          <ScrollView style = {{ backgroundColor : '#fff'}}>

      {/* ========================= End Header ========================== */}
              <View style={{flex : 1 , flexDirection : 'row' , paddingTop : 20 , }}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: wp(6),
                    height: hp(6),
                    alignItems: 'center',

                    color: 'gray',
                    left: wp(5)
                  }}
                  source={require("../imgs/menu_profile.png")}>
                </Image>
                <TouchableHighlight
                  underlayColor={false}
                  onPress={this.onMember.bind(this)}
                  style={{
                    height: 50,
                    alignSelf: 'stretch',
                    // bottom: hp(6),
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 17,
                    color: '#0007',
                    paddingStart: 35,
                    fontFamily: 'Prompt-Light'
                  }}> {stringsoflanguages.p36} </Text>
              </TouchableHighlight>
          </View>


          <View style={{flex : 1 , flexDirection : 'row', paddingBottom : 10}}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: wp(6),
                    height: hp(6),
                    alignItems: 'center',

                    color: 'gray',
                    left: wp(5)
                  }}
                  source={require("../imgs/menu_pass.png")}>
                </Image>
                <TouchableHighlight
                  underlayColor={false}
                  onPress={this.onChangepass.bind(this)}
                  style={{
                    height: 50,
                    alignSelf: 'stretch',
                    // bottom: hp(6),
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 17,
                    color: '#0007',
                    paddingStart: 35,
                    fontFamily: 'Prompt-Light'
                  }}> {stringsoflanguages.p46} </Text>
              </TouchableHighlight>
          </View>
{/* Fix============================================================================ */}


          <View style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C2C2C2',
            // bottom: hp(11)
          }} />

          <View style={{flex : 1 , flexDirection : 'row', paddingTop: 20}}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: wp(6),
                    height: hp(6),
                    alignItems: 'center',

                    color: 'gray',
                    left: wp(5)
                  }}
                  source={require("../imgs/menu_gallery.png")}>
                </Image>
                <TouchableHighlight
                  underlayColor={false}
                  onPress={this.onGallery.bind(this)}
                  style={{
                    height: 50,
                    alignSelf: 'stretch',
                    // bottom: hp(6),
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 17,
                    color: '#0007',
                    paddingStart: 35,
                    fontFamily: 'Prompt-Light'
                  }}> {stringsoflanguages.p66} </Text>
              </TouchableHighlight>
          </View>
{/* Fix============================================================================ */}
          <View style={{flex : 1 , flexDirection : 'row'}}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: wp(6),
                    height: hp(6),
                    alignItems: 'center',

                    color: 'gray',
                    left: wp(5)
                  }}
                  source={require("../imgs/menu_appoint.png")}>
                </Image>
                <TouchableHighlight
                  underlayColor={false}
                  onPress={this.onAppoint.bind(this)}
                  style={{
                    height: 50,
                    alignSelf: 'stretch',
                    // bottom: hp(6),
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 17,
                    color: '#0007',
                    paddingStart: 35,
                    fontFamily: 'Prompt-Light'
                  }}> {stringsoflanguages.p68} </Text>
              </TouchableHighlight>
          </View>

{/* Fix============================================================================ */}
          <View style={{flex : 1 , flexDirection : 'row'}}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: wp(6),
                    height: hp(6),
                    alignItems: 'center',

                    color: 'gray',
                    left: wp(5)
                  }}
                  source={require("../imgs/menu_article.png")}>
                </Image>
                <TouchableHighlight
                  underlayColor={false}
                  onPress={this.onContent.bind(this)}
                  style={{
                    height: 50,
                    alignSelf: 'stretch',
                    // bottom: hp(6),
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 17,
                    color: '#0007',
                    paddingStart: 35,
                    fontFamily: 'Prompt-Light'
                  }}> {stringsoflanguages.p80} </Text>
              </TouchableHighlight>
          </View>

{/* Fix============================================================================ */}
          <View style={{flex : 1 , flexDirection : 'row' , paddingBottom : 20}}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: wp(6),
                    height: hp(6),
                    alignItems: 'center',

                    color: 'gray',
                    left: wp(5)
                  }}
                  source={require("../imgs/menu_contact.png")}>
                </Image>
                <TouchableHighlight
                  underlayColor={false}
                  onPress={this.onContact.bind(this)}
                  style={{
                    height: 50,
                    alignSelf: 'stretch',
                    // bottom: hp(6),
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 17,
                    color: '#0007',
                    paddingStart: 35,
                    fontFamily: 'Prompt-Light'
                  }}> {stringsoflanguages.p82} </Text>
              </TouchableHighlight>
          </View>

{/* Fix============================================================================ */}
          <View style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C2C2C2',
            // bottom: hp(28)
          }} />

          <View style={{flex : 1 , flexDirection : 'row' , paddingTop : 20}}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: wp(6),
                    height: hp(6),
                    alignItems: 'center',

                    color: 'gray',
                    left: wp(5)
                  }}
                  source={require("../imgs/menu_lang.png")}>
                </Image>
                <TouchableHighlight
                  underlayColor={false}
                  onPress={this.onChangeLang.bind(this)}
                  style={{
                    height: 50,
                    alignSelf: 'stretch',
                    // bottom: hp(6),
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 17,
                    color: '#0007',
                    paddingStart: 35,
                    fontFamily: 'Prompt-Light'
                  }}> {stringsoflanguages.p85} </Text>
              </TouchableHighlight>
          </View>
{/* Fix============================================================================ */}
                   <View style={{flex : 1 , flexDirection : 'row'}}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: wp(6),
                    height: hp(6),
                    alignItems: 'center',

                    color: 'gray',
                    left: wp(5)
                  }}
                  source={require("../imgs/menu_logout.png")}>
                </Image>
                <TouchableHighlight
                  underlayColor={false}
                  onPress={() => this.onHome()}
                  style={{
                    height: 50,
                    alignSelf: 'stretch',
                    // bottom: hp(6),
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 17,
                    color: '#0007',
                    paddingStart: 35,
                    fontFamily: 'Prompt-Light'
                  }}> {stringsoflanguages.p86} </Text>
              </TouchableHighlight>
          </View>
{/* Fix============================================================================ */}


        </ScrollView>
      </View>

      // </ScrollView>

    );
  }
}


const mapStateToProps = (state) => ({
  logoutReducers: state.logoutReducers
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherScreen)

// export default OtherScreen;