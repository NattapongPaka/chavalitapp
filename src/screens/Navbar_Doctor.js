import React, { Component } from 'react';

import { StyleSheet, View, Platform, Text, FlatList, TouchableHighlight, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'

 class Doctor extends Component {

  static navigationOptions = {
    headermode: 'float',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/doctor.png')}
        style={[{ resizeMode: 'contain', width: 26, height: 26 }, { tintColor: tintColor }]}
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

  constructor() {
    super();

    this.state = {

      GridColumnsValue: true,

      ButtonDefaultText: 'CHANGE TO GRIDVIEW',

      isLoading: true,
      dataSource: []

    }
  }

  componentDidMount() {
    this.test1()

  }

  test1() {
    fetch('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_doctor')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          console.log(this.state.dataSource)
        });
      })

      .catch((error) => {
        console.error(error);
      });

  }



  ChangeGridValueFunction = () => {

    if (this.state.GridColumnsValue === true) {
      this.setState({

        // GridColumnsValue: false,
        // ButtonDefaultText: "CHANGE TO LISTVIEW"
        GridColumnsValue: true,
        ButtonDefaultText: "CHANGE TO GRIDVIEW" 

      })
    }
    else {

      this.setState({

        // GridColumnsValue: true,
        // ButtonDefaultText: "CHANGE TO GRIDVIEW"
        GridColumnsValue: false,
        ButtonDefaultText: "CHANGE TO LISTVIEW"

      })

    }

  }


  onDoctorDetail(item) {
    console.log(item)
    this.props.navigation.navigate("DoctorDetail", { id: item.id, img: item.profile_pic, name: item.name })
  }
  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>
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
              }}>{stringsoflanguages.p7}</Text>
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



        <View style={{ flex: 1, padding: 2,paddingTop:8 }}>

          <FlatList

            data={this.state.dataSource}

            renderItem={({ item }) => <View style={{

              flexDirection: 'column',
              borderColor: "#ddd",
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              margin: 2,

            }}>
              <TouchableOpacity onPress={() => this.onDoctorDetail(item)}>
                <Image
                  style={{


                    height: 100,
                    width: 100,
                    margin: 12,
                    borderColor: '#F06823',
                    borderWidth: 3,
                    borderRadius: 10,


                  }}
                  source={{ uri: item.profile_pic }}
                />

                <Text
                  style={{
                    bottom: 65,
                    justifyContent: 'center',
                    fontSize: 18,
                    color: '#000',
                    textAlign: 'center',
                    alignItems: 'center',
                    marginLeft: 90, fontFamily:'Prompt-Light'


                  }}
                  numberOfLines={1} >{item.name}

                </Text>
              </TouchableOpacity>
            </View>



            }

            numColumns={this.state.GridColumnsValue ? 1 : 2}

            key={(this.state.GridColumnsValue) ? 'ONE COLUMN' : 'TWO COLUMN'}

            keyExtractor={(item, index) => index}

          />



        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,






  },

  ImageComponentStyle: {

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 100,
    backgroundColor: '#4CAF50'

  }
  ,

  ItemTextStyle: {

    color: '#fff',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#4CAF50',
    marginBottom: 5

  },

  ButtonStyle: {

    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#FF9800',
    width: '100%',
    height: 50
  },

  ButtonInsideTextStyle: {
    color: '#fff',
    textAlign: 'center',
  }

});


const mapStateToProps = (state) => ({
  logoutReducers : state.logoutReducers
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Doctor)