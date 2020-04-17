import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import stringsoflanguages from './stringsoflanguages';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      isFetching: false,
    
  }
    const lang = [
      { shortform: 'en', longform: 'English' },
      { shortform: 'th', longform: 'ภาษาไทย ' },
    ];
    global.lang = lang;
  
  }
  settext(value) {
    stringsoflanguages.setLanguage(value);
    this.setState({isFetching : true });
    this.props.navigation.navigate('AuthLoading', { JSON_Clicked_Item: value, });
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#F06823',
        alignItems: 'center',

        // top: hp(24),
       
      }}>
        <Text style={{
          marginTop: 195, color: '#000',
          fontSize: 18,
          fontFamily: 'Prompt-Light',
          color : '#fff'
          
        }}>
          Change Language / เปลี่ยนภาษา
        </Text>

        <Text style={{
          marginTop:15,
           color: '#000',
          fontSize: 20,
          fontFamily: 'Prompt-Light',
          color : '#fff'
        }}>
         - - - - -
        </Text>

        <ScrollView style={{  width: '80%' }}>
          {global.lang.map((item, key) => (
            <View style={{
              width: '100%',
              marginTop: 35,
              alignItems: 'center',
              color : '#fff'
            }}>

              <Text
                onPress={() => this.settext(item.shortform)}
                style={{
                  // color: '#191919',
                  color: '#000',
                  fontSize: 25,
                  fontFamily: 'Prompt-Light',
                  color : '#fff'
                }}>
                {item.longform}
              </Text>
            </View>

          ))}
        </ScrollView>
        {/* <Image
          resizeMode='contain'
          style={{
            width: wp(10),
            height: hp(10),
            alignItems: 'center',
            color: 'gray',
            right: wp(60),
            position:'relative'    
                }}
          source={require("../imgs/en.png")}></Image>


        <Image
          resizeMode='contain'
          style={{
            width: wp(10),
            height: hp(10),
            alignItems: 'center',
            color: 'gray',
            right: wp(60),
            top: hp(6),
            position:'relative'   
          }}
          source={require("../imgs/th.png")}></Image> */}
      </View >
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    top: hp(24),
    left: wp(18)
  },
  textHeading: {
    color: '#191919',
    fontSize: 30,
    textAlign: 'center'
  },
  img: {
    width: 64,
    height: 64,
    marginTop: 30
  },
  elementContainer: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',

  },
  text: {
    color: '#191919',
    fontSize: 12,
    flexWrap: 'wrap',
  },
  saparator: {
    height: 0.5,
    width: '60%',
    backgroundColor: '#C2C2C2',
    marginTop: 10,
  },
});