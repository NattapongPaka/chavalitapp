import React, { Component } from 'react';
import { Linking, View, Text, Image, TouchableHighlight, StyleSheet, FlatList, ActivityIndicator, Alert, Modal, RefreshControl } from 'react-native';
import { createBottomTabNavigator, createAppContainer, } from 'react-navigation';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';

// import Modal from "react-native-modal";
import { connect } from 'react-redux'



class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: `${stringsoflanguages.p33}` },
      { key: 'second', title: `${stringsoflanguages.p34}` },
    ],
    GridColumnsValue: true,
    GridColumnsValuell: false,
    ButtonDefaultText: 'CHANGE TO GRIDVIEW',
    isLoading: true,

  };


  componentDidMount() {
    this.test1()
    this.test2()
  }


  test1() {
    fetch('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_frame')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {

        });
      })

      .catch((error) => {
        console.error(error);
      });
  }

  test2() {
    fetch('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_lens')
      .then((response) => response.json())
      .then((responseJson) => {
        // alert(responseJson);
        this.setState({
          isLoading: false,
          dataSourcelens: responseJson
        }, function () {
        });
      }).catch((error) => {
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
        // GridColumnsValue: false,
        // ButtonDefaultText: "CHANGE TO LISTVIEW"

      })

    }

  }



  GetGridViewItem(item) { Alert.alert(item); }

  onLogin() {
    this.props.navigation.navigate("Login")
  }

  onPolicy() {
    this.props.navigation.navigate("Forgetpass")
  }

  static navigationOptions = {
    headermode: 'float',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/brand.png')}
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





  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (


      <View style={{
        backgroundColor: 'white',
        flex: 1
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
          <View style={{flexDirection : 'row' , marginLeft : 15, marginTop : hp('1%')}}>
            

            <Text
              style={{

                color: 'white',
                fontSize: 18,
                textAlign: 'auto',
                top: 12,
                fontFamily: 'Prompt-Bold'
              }}>{stringsoflanguages.p32}</Text>
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


        <TabView
          // marginTop='12'
          style={{
            // marginTop:12,
            // flex:1
          }}
          tabBarPosition='bottom'
          navigationState={this.state}
          // renderScene={SceneMap({
          //   first: this.FirstRoute,
          //   second: this.SecondRoute,
          // })}

          renderScene={this._renderScene}

          renderTabBar={props =>
            <TabBar
              {...props}
              pressColor='transparent'
              scrollEnabled={false}

              renderLabel={this._renderLabel(props)}

              tabStyle={{
                backgroundColor: '#f06823',
                marginBottom: 2
              }}
              style={{
                backgroundColor: '#f06823',
                paddingBottom: 1,

              }}

              indicatorStyle={{
                backgroundColor: 'white',
                height: 2
              }}


            />
          }
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: 50, height: 10 }}


        />
      </View>
    );
  }


  _renderScene = ({ route }) => {

    if (route.key == "first") {
      return this.FirstRoute()
    } else if (route.key == "second") {
      return this.SecondRoute()
    }
  }


  _renderLabel(props) {
    let index = 0;
    return ({ route }) => {
      const focused = index === props.navigationState.index;
      index += 1;
      return (
        <View>
          <Text
            style={[
              {
                color: 'white',
                fontFamily: 'PSLKandaModernExtraPro',
                fontSize: 23,
                paddingTop: 4,
                paddingBottom: 1
              },
              focused ? { color: 'white' } : null,
            ]}
          >
            {route.title}
          </Text>
        </View>
      );
    };
  }



  FirstRoute = () => {
    return (
      <View style={{ flex: 1, margin: 5 }}>
        <View >
          <FlatList

            data={this.state.dataSource}

            renderItem={({ item }) => <View style={{ flex: 1, flexDirection: 'column', margin: 3 }}>

              <TouchableHighlight
                underlayColor={"#C5C6D0"}
                onPress={() => { Linking.openURL(item.link) }}
              >
                <Image
                  style={{
                    justifyContent: 'center',
                    resizeMode: 'center',

                    // backgroundColor: '#4CAF50',
                    width: wp('47%'),

                    // Setting up image height.
                    height: hp('15%'),

                    // Set border width.
                    borderWidth: 1,

                    // Set border color.
                    borderColor: 'gray',


                  }}
                  source={{ uri: item.pic_name }}
                />

              </TouchableHighlight>



            </View>

            }

            numColumns={this.state.GridColumnsValuell ? 1 : 2}

            key={(this.state.GridColumnsValuell) ? 'ONE COLUMN' : 'TWO COLUMN'}

            keyExtractor={(item, index) => index}

          />
        </View>

      </View>

    );

  }


  SecondRoute = () => {

    return (
      <View style={{ flex: 1, margin: 5 }}>
        <View >

          <FlatList

            data={this.state.dataSourcelens}

            renderItem={({ item }) => <View style={{ flex: 1, flexDirection: 'column', margin: 3 }}>
              <TouchableHighlight
                underlayColor={"#C5C6D0"}
                onPress={() => { Linking.openURL(item.link) }}
              >
                <Image
                  style={{
                    justifyContent: 'center',
                    resizeMode: 'center',

                    // backgroundColor: '#4CAF50',
                    width: wp('96%'),

                    // Setting up image height.
                    height: hp('15%'),

                    // Set border width.
                    borderWidth: 1,

                    // Set border color.
                    borderColor: 'gray',

                  }}
                  source={{ uri: item.pic_name }}
                />
              </TouchableHighlight>


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
  scene: {
    flex: 1,


  },
});

const mapStateToProps = (state) => ({
  logoutReducers: state.logoutReducers
});
const mapDispatchToProps = (dispatch) => ({
  dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(TabViewExample)
