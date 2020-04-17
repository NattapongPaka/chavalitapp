import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, FlatList, Alert } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import stringsoflanguages from './stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'

class TabViewExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data_mem: '',
      index: 0,
      routes: [
        { key: 'first', title: `${stringsoflanguages.p103}` },
        { key: 'second', title: `${stringsoflanguages.p102}` },
      ],
      date: "",
      GET: "",
      USE: "",
      case: "",
      amount: "",
      fetch_date: [],
      fetch_result: [],
      fetch_xx: [],
      fetch_coin: []

    };
  }

  componentWillMount() {
    this.get_data()
    this.get_point()
    this.get_coin()
  }


  async get_data() {
    const value = await AsyncStorage.getItem('member_id');
    if (value !== null) {    
      console.log(value);   
      
      axios.post('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_data_member&member_id='+ value)
        .then(respons => {
          console.log('top=>', respons)
          this.setState({
            data_mem: respons.data,
          })
          // console.log('top02=>', respons)

          // if( data_mem.status == 'fail'){
          //   alert("RERWRWE");
          // }


        })
    }
    else {
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


  async get_point() {
    //await AsyncStorage.setItem('member_id', '1')
    const value = await AsyncStorage.getItem('member_id');
    console.log('id', value);

    if (value !== null) {
      axios.post('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_point_detail&member_id=' + value)
        .then(respons => {
          if (respons.data.status == 'fail') {
            Alert.alert(
              'CHAVALIT',
              `${stringsoflanguages.p111}`,
              [
      
                { text: `${stringsoflanguages.p107}`,  },
              ],
              { cancelable: false },
            );
          
          } 
          else {
          
            var fetch = respons.data
  
            console.log('tj=>', fetch);
  
            this.setState({
              fetch_xx: fetch
  
            })
  
            console.log('pp=>', this.state.fetch_xx)
          }


         

        })
    } else{
      // alert("Not History!");
      // Alert.alert(
      //   'CHAVALIT',
      //   `${stringsoflanguages.p111}`,
      //   [

      //     { text: `${stringsoflanguages.p107}`, onPress: () => this.goBack() },
      //   ],
      //   { cancelable: false },
      // );
      console.log('Point error')
    }


  }



  async get_coin() {
    //await AsyncStorage.setItem('member_id', '1')
    const value = await AsyncStorage.getItem('member_id');
    console.log(value);
    global.get_member_id = value;
    this.setState({ member_id: JSON.stringify(value) })
    console.log('global : ' + global.get_member_id)


    var data = new FormData();
    data.append("member_id", global.get_member_id);
    axios.post('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_coin_detail', data)
      .then(respons => {
        console.log(respons)
        var coin = respons.data
        console.log('t_coin=>', coin);

        this.setState({
          fetch_coin: coin

        })

        console.log('pp=>', this.state.fetch_coin)

      })

  }


  async onLogout() {
    // await AsyncStorage.removeItem('member_id')
    // global.get_member_id = null
    this.props.navigation.navigate("Login")
  }

  goBack(){
    this.props.navigation.goBack(null);
  }

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
        source={require('../imgs/point.png')}
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

  onChangepass() {
    this.props.navigation.navigate("Login")
  }


  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        flex: 1
      }}>
        <View style={{
          backgroundColor: '#F06823',
          height: hp('10%')
        }}>
          {/* <Image
            resizeMode='contain'
            style={{
              width: wp('10%'),
              height: hp('5%'),
              alignItems: 'center',
              top: hp('3%')
            }}
            source={require("../imgs/leftarrow.png")}></Image> */}
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
          initialLayout={{ flex: 1, width: wp('100%'), height: hp('20%') }}
          swipeEnabled={false}


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
                paddingTop: 1,
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
      <View style={{
        flex: 1,
      }}>
        <View style={{
          backgroundColor: '#F06823',
          height: hp('67.5%')
        }}>


          <Text style={{
            marginTop : 10,
            fontSize: hp(5),
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Prompt-Bold',
            bottom: hp(2)
          }}> {stringsoflanguages.p23} </Text>


          <Text style={{
            fontSize: hp(10),
            textAlign: 'center',
            bottom: hp(2),
            color: '#fff',
            fontFamily: 'Prompt-Bold'
          }}> {this.props.logoutReducers.summary_point} </Text>



<View style={{
            flex: 1,
            flexDirection: 'row',
            // alignItems:'center'
            // backgroundColor:'green'
            justifyContent : 'center'
          }}>
            <TouchableHighlight
              underlayColor={"#C5C6D0"}
              onPress={() => {
                this.props.navigation.navigate("Policy_point")
              }}
              style={{
                height: 60,
                alignItems: 'center',

              }}>
              <Text style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#fff',
                bottom: 12,
                textDecorationLine: 'underline',
                fontFamily: 'Prompt-Light'
              }}> {stringsoflanguages.p24} </Text>
            </TouchableHighlight>
            <Image
              style={{ height : 20, width : 20, bottom : hp(1.2)}}
              source={require('../imgs/info_i.png')}
            />
            


            {/* <Image
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                marginLeft: "78%",
                bottom: 60

              }}
              source={require("../imgs/info.png")} /> */}
          </View>



          <View style={{ backgroundColor: 'white', height: hp('45%'), top: 20, bottom: hp(15) }}>

            <Text style={{
              fontSize: 15,
              marginLeft: 5,
              color: '#444',
              padding: 10,
              fontFamily: 'Prompt-Bold'
            }}> {stringsoflanguages.p25}</Text>



            <FlatList

              data={this.state.fetch_xx}

              renderItem={({ item }) => this.fetchItem(item)}




            />

          </View>


        </View>

      </View>

    );
  }

  fetchItem = (itemMaiun) => {
    // alert(itemMaiun)
    let test = [];

    if (itemMaiun.GET) {
      for (i = 0; i < itemMaiun.GET.length; i++) {
        let get = { type: "get", pos: itemMaiun.GET[i] }
        test.push(get)
      }
    }
    if (itemMaiun.USE) {
      for (j = 0; j < itemMaiun.USE.length; j++) {
        let use = { type: "use", pos: itemMaiun.USE[j] }
        test.push(use)
      }
    }
    if (itemMaiun.DEL) {
      for (k = 0; k < itemMaiun.DEL.length; k++) {
        let del = { type: "del", pos: itemMaiun.DEL[k] }
        test.push(del)
      }
    }

    console.log('point_detail=>', test)

    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'Prompt-Light', fontSize: 15, padding: 10 }}
        >
          {itemMaiun.date}

        </Text>
        <FlatList
          data={test}
          renderItem={({ item }) =>
            <View style={{ backgroundColor: '#ddd', padding: 10, paddingLeft: 0, flexDirection: 'row' }}>
              {item.type == 'get'? 
              <Text style={{ marginLeft : 5, fontSize: 14, flex: 1, fontFamily: 'Prompt-Light' }}
              // onPress={this.GetItem.bind(this, item.title)} 
              >

                {stringsoflanguages.p113}

              </Text>:
            <Text style={{ marginLeft : 5, fontSize: 14, flex: 1, fontFamily: 'Prompt-Light' }}
            // onPress={this.GetItem.bind(this, item.title)} 
            >

              {stringsoflanguages.p114}

            </Text>} 
             
              <Text style={{ fontSize: 14, fontFamily: 'Prompt-Light' }}
              // onPress={this.GetItem.bind(this, item.title)} 
              >
                {item.pos} {stringsoflanguages.p109}

              </Text>
            </View>
          }
        />
      </View>
    )
  }





  SecondRoute = () => {
    return (
      <View style={{
        flex: 1,
      }}>
        <View style={{
          backgroundColor: '#F06823',
          //height: hp('67.5%')
        }}>


          <Text style={{
            fontSize: hp(5),
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Prompt-Bold',
            bottom: hp(2)
          }}> {stringsoflanguages.p28} </Text>


          <Text style={{
            fontSize: hp(10),
            textAlign: 'center',
            bottom: hp(2),
            color: '#fff',
            fontFamily: 'Prompt-Bold'
          }}> {this.props.logoutReducers.summary_coin} </Text>



<View style={{
            flex: 1,
            flexDirection: 'row',
            // alignItems:'center'
            // backgroundColor:'green'
            justifyContent : 'center'
          }}>
            <TouchableHighlight
              underlayColor={"#C5C6D0"}
              onPress={() => {
                this.props.navigation.navigate("Policy_point")
              }}
              style={{
                height: 60,
                alignItems: 'center',

              }}>
              <Text style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#fff',
                bottom: 12,
                textDecorationLine: 'underline',
                fontFamily: 'Prompt-Light'
              }}> {stringsoflanguages.p31} </Text>
            </TouchableHighlight>
            <Image
              style={{ height : 20, width : 20, bottom : hp(1.2)}}
              source={require('../imgs/info_i.png')}
            />


            {/* <Image
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                marginLeft: "78%",
                bottom: 60

              }}
              source={require("../imgs/info.png")} /> */}
          </View>



          <View style={{ backgroundColor: 'white', height: hp(47), top: 20, bottom: hp(15) }}>

            <Text style={{
              fontSize: 15,
              marginLeft: 5,
              color: '#444',
              padding: 10,
              fontFamily: 'Prompt-Bold'
            }}> {stringsoflanguages.p29}</Text>



            <FlatList

              data={this.state.fetch_coin}

              renderItem={({ item }) => this.fetchItemm(item)}




            />

          </View>


        </View>

      </View>

    );
  }

  fetchItemm = (itemMaiun) => {
    // alert(itemMaiun)
    let Fcoin = [];

    if (itemMaiun.GET) {
      for (i = 0; i < itemMaiun.GET.length; i++) {
        let get = { type: itemMaiun.GET[i].case, pos: itemMaiun.GET[i].amount }
        Fcoin.push(get)
      }

    }
    if (itemMaiun.USE) {
      for (j = 0; j < itemMaiun.USE.length; j++) {
        let use = { type: "use", pos: itemMaiun.USE[j] }
        Fcoin.push(use)
      }
    }


    console.log('coin_detail=>', Fcoin)

    return (
      <View style={{ }}>
        <Text style={{ fontFamily: 'Prompt-Light', fontSize: 15, padding: 10 }}
        >
          {itemMaiun.date}

        </Text>
        <FlatList
          data={Fcoin}
          renderItem={({ item }) =>
            <View style={{ backgroundColor: '#ddd', padding: 10, paddingLeft: 0, flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, flex: 1, fontFamily: 'Prompt-Light' }}
              // onPress={this.GetItem.bind(this, item.title)} 
              >

                {item.type}

              </Text>
              <Text style={{ ffontSize: 20, fontFamily: 'Prompt-Light' }}
              // onPress={this.GetItem.bind(this, item.title)} 
              >
                {item.pos} {stringsoflanguages.p108}

              </Text>
            </View>
          }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  logoutReducers: state.logoutReducers
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(TabViewExample)


