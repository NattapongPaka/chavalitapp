import React, { Component } from "react";
import {
  Alert,
  PixelRatio,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Modal from "react-native-modal";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import { sha1 } from "react-native-sha1";
import stringsoflanguages from "./stringsoflanguages";
import { connect } from "react-redux";
import { setData, Memset, addCoin } from "../myRedux/actions";

class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: "first",
        title: `${stringsoflanguages.p2}`,
        tabStyle: { backgroundColor: "red" }
      },
      { key: "second", title: `${stringsoflanguages.p3}` }
    ],
    GridColumnsValue: true,
    ButtonDefaultText: "CHANGE TO GRIDVIEW",
    isLoading: true,
    isLoading01: true,
    visibleModal: false,
    modalVisible: false,
    dataSource: [],
    total_coupon: "",
    member_id: null,
    seleceted_code: null,
    selected_id: null,
    qr_code: null,
    login_coin: "",
    regis_coin: "",
    profile_coin: "",
    name_quiz: "",
    quiz: [],
    coin_quiz: "",
    modalVisible_login: false,
    modalVisible_regis: false,
    modalVisible_profile: false,
    modalVisible_question: false,
    modalVisible_send_question: false,
    selected_question: "N"
  };
  static navigationOptions = {
    title: "Welcome"
  };

  close() {
    let get_regis = this.state.regis_coin;
    this.setState({
      modalVisible_login: false,
      modalVisible_regis: get_regis == 0 ? false : true
    });
  }

  close_regis() {
    let get_profile = this.state.profile_coin;
    this.setState({
      modalVisible_regis: false,
      modalVisible_profile: get_profile ? true : false
    });
  }

  close_profile() {
    this.setState({ modalVisible_profile: false });
  }

  close_question() {
    this.setState({ modalVisible_question: false });
  }

  close_send_question() {
    this.setState({ modalVisible_send_question: false });
  }

  onConfirm() {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate("Qrcode", {
      code: this.state.seleceted_code,
      id: this.selected_id
    });
  }

  componentDidMount() {
    this.promotion();
    //this.coupon()

    this.get_member_id();
    this.get_date();
    // this.test_sha1()
    this.get_member_coin();
  }

  // test_sha1(){
  //   sha1("message").then( hash => {
  //     console.log(hash);
  // })
  // }
  async get_date() {
    var today = new Date();
    let date = today.getDate();
    const value = await AsyncStorage.getItem("@date");
    if (value == date) {
      // await AsyncStorage.removeItem("@date");
      console.log("if asy");
    } else {
      this.get_question();
    }
  }
  async get_question() {
    const value = await AsyncStorage.getItem("member_id");
    console.log("Question=> start");
    if (value !== null) {
      axios
        .get(
          "http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_quest&member_id=" +
            value
        )
        .then(respons => {
          // console.log('LOL', respons.data.result == 'fail')
          if (respons.data.result == "fail") {
            this.setState({ modalVisible_question: false });
          } else {
            this.setState({ modalVisible_question: true });
          }

          let choice = respons.data.choices;
          let sus = Object.keys(choice).map(key => choice[key]);

          this.setState({
            name_quiz: respons.data.question,
            quiz: sus
          });

          console.log("SUS01=>", this.state.quiz);
        });
    } else {
      console.log("No qusetion");
    }
  }

  async save_date() {
    var today = new Date();
    let date = today.getDate();

    await AsyncStorage.setItem("@date", date);
  }

  check_question(id, selected) {
    if (selected == "N") {
      this.send_question(id, selected);
      // Alert.alert(
      //   'Chavalit',
      //   `คุณ ${this.props.logoutReducers.first_name} ตอบคำถามผิด`,
      //   [
      //     {text: 'OK', onPress: () => this.send_question(id)},
      //   ],
      //   {cancelable: false},
      // );
    } else {
      this.send_question(id, selected);
      this.setState({ selected_question: "Y" });
      // Alert.alert(
      //   'Chavalit',
      //   `คุณ ${this.props.logoutReducers.first_name} ตอบคำถามถูกต้อง`,
      //   [
      //     {text: 'OK', onPress: () => this.send_question(id)},
      //   ],
      //   {cancelable: false},
      // );
    }
  }

  async send_question(item, selected) {
    // Alert.alert(item);
    const value = await AsyncStorage.getItem("member_id");
    var data = new FormData();
    data.append("member_id", value);
    data.append("choice_id", item);
    //data.append("password", this.state.password);

    console.log(
      "Question=>" + ", member_id :" + value + ", question_id :" + item
    );
    if (selected == "Y") {
      axios
        .post(
          "http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_answer_question",
          data
        )
        .then(respons => {
          console.log("Question=>", respons);
          this.setState({
            coin_quiz: respons.data.amount_coin_register
          });
          //   console.log('RER=>',respons.data.amount_coin_register)
          // let coiin =  parseInt(respons.data.amount_coin_register)
          if (respons.data.amount_coin_register > 0) {
            this.props.dispatch(
              addCoin(parseInt(respons.data.amount_coin_register))
            );
            // this.setState({ modalVisible_send_question:true})
            let send_quize = this.state.coin_quiz;
            console.log("qq => ", send_quize);
            this.setState({
              modalVisible_question: false,
              modalVisible_send_question: send_quize == 0 ? false : true
            });
            this.save_date();

            // alert("RWERWRWERWE")
            // this.props.navigation.navigate("Navigation")
          } else {
            // bug
            this.setState({
              modalVisible_question: false,
              modalVisible_send_question: false
            });
            this.save_date();
          }
        });
    } else {
      let num = 0;
      this.save_date();
      this.setState({
        modalVisible_question: false,
        modalVisible_send_question: true,
        coin_quiz: num
      });
    }
  }

  async get_member_coin() {
    const value = await AsyncStorage.getItem("member_id");
    var data = new FormData();
    data.append("member_id", value);
    axios
      .post(
        "http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_check_get_coin",
        data
      )
      .then(respons => {
        // alert(respons.data.result)
        // console.log('COIN', respons)

        this.setState({
          login_coin: respons.data.amount_coin_login,
          regis_coin: respons.data.amount_coin_register,
          profile_coin: respons.data.amount_coin_profile_fully
        });

        if (respons.data.amount_coin_login > 0) {
          this.props.dispatch(
            addCoin(parseInt(respons.data.amount_coin_login))
          );

          this.setState({ modalVisible_login: true });
        } else {
          if (respons.data.amount_coin_register > 0) {
            this.props.dispatch(
              addCoin(parseInt(respons.data.amount_coin_register))
            );

            this.setState({ modalVisible_regis: true });
          } else {
            if (respons.data.amount_coin_profile_fully > 0) {
              this.props.dispatch(
                addCoin(parseInt(respons.data.amount_coin_profile_fully))
              );
              this.setState({ modalVisible_profile: true });
            }
          }
        }
      });
  }

  async get_member_id() {
    //await AsyncStorage.setItem('member_id', '1')

    const value = await AsyncStorage.getItem("member_id");
    // let data = this.props.logoutReducers
    // alert(JSON.stringify(data))

    if (value !== null) {
      // We have data!!
      console.log(value);
      // global.get_member_id = value;
      this.props.dispatch(Memset(value));
      this.setState({ member_id: JSON.stringify(value) });
      // console.log('global : ' + global.get_member_id)

      let data = new FormData();
      data.append("member_id", value);
      axios
        .post(
          "http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_data_member",
          data
        )
        .then(respons => {
          console.log("XER:" + respons);

          let getname = respons.data.first_name;
          let getpoint = respons.data.summary_point;
          let getcoin = respons.data.summary_coin;

          // alert(getname+getcoin+getpoint);

          this.props.dispatch(setData(getname, getpoint, getcoin));

          // console.log(global.name)
          this.coupon();
        });
      //this.props.navigation.navigate('Navigation')
    } else {
      console.log("no data");
      this.coupon();
    }
  }

  promotion() {
    fetch(
      "http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_promotion"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {
            console.log(this.state.dataSource);
          }
        );
      })

      .catch(error => {
        console.error(error);
      });
  }

  async coupon() {
    //await AsyncStorage.setItem('member_id', '1')
    const value = await AsyncStorage.getItem("member_id");
    if (value !== null) {
      // We have data!!
      console.log(value);
      global.get_member_id = value;
      this.setState({ member_id: JSON.stringify(value) });
      console.log("global : " + global.get_member_id);

      var url =
        "http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_coupon&member_id=" +
        this.state.member_id;
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          // alert(responseJson);
          console.log("pon", responseJson.total_coupon);
          let coupon = responseJson.total_coupon;
          this.setState(
            {
              isLoading: false,
              dataSource_coupon: coupon
            },
            function() {
              console.log("", this.state.dataSource);
            }
          );
        })
        .catch(error => {
          Alert.alert(
            "CHAVALIT",
            `${stringsoflanguages.p84}`,
            [
              {
                text: `${stringsoflanguages.p107}`,
                onPress: () => this.onLogout()
              }
            ],
            { cancelable: false }
          );
          console.log("Login error");
        });
    }
    // else {
    //   Alert.alert(
    //     'CHAVALIT',
    //     `${stringsoflanguages.p84}`,
    //     [

    //       { text: `${stringsoflanguages.p107}`, onPress: () => this.onLogout() },
    //     ],
    //     { cancelable: false },
    //   );
    //   console.log('Login error')
    // }
  }

  // coupon() {
  //   var url = 'http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_coupon&member_id='+this.state.member_id
  //   fetch(url)
  //     .then((response) => response.json())

  //     .then((responseJson) => {
  //       // alert(responseJson);
  //       console.log('pon', responseJson.total_coupon)
  //       let coupon = responseJson.total_coupon
  //       this.setState({
  //         isLoading: false,
  //         dataSource_coupon: coupon
  //       }, function () {
  //         console.log('',this.state.dataSource);
  //       });
  //     }).catch((error) => {
  //       console.error(error);
  //     });
  // }

  ChangeGridValueFunction = () => {
    if (this.state.GridColumnsValue === true) {
      this.setState({
        // GridColumnsValue: false,
        // ButtonDefaultText: "CHANGE TO LISTVIEW"
        GridColumnsValue: true,
        ButtonDefaultText: "CHANGE TO GRIDVIEW"
      });
    } else {
      this.setState({
        // GridColumnsValue: true,
        // ButtonDefaultText: "CHANGE TO GRIDVIEW"
        GridColumnsValue: false,
        ButtonDefaultText: "CHANGE TO LISTVIEW"
      });
    }
  };

  onLogin() {
    this.props.navigation.navigate("Login");
  }

  onPromo(item) {
    // alert(item.id)
    this.props.navigation.navigate("Promotion", { id: item.id });
  }

  toggleModal(visible, code, id) {
    this.setState({
      modalVisible: visible,
      seleceted_code: code,
      selected_id: id,
      qr_code:
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + code
    });
  }

  static navigationOptions = {
    headermode: "float",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../imgs/home.png")}
        style={[
          { resizeMode: "contain", width: 25, height: 25 },
          { tintColor: tintColor }
        ]}
      />
    ),
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "grey",
      activeBackgroundColor: "#f06823",
      inactiveBackgroundColor: "#f06823",
      style: {
        backgroundColor: "#f06823"
      }
    }
  };

  onGalleryDetail() {
    this.props.navigation.navigate("GalleryDetail");
  }

  renderItem = ({ item }) => {
    return (
      <View style={{}}>
        <Text
          style={{
            padding: 15,
            borderRadius: 15,
            marginBottom: 5,
            opacity: 0.9,
            backgroundColor: "white",
            textAlign: "center"
          }}
          onPress={this.check_question.bind(this, item.id, item.choicestatus)}
        >
          {item.choices}
        </Text>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    const { selected_question } = this.state;
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1
        }}
      >
        <View
          style={{
            backgroundColor: "#F06823",
            height: hp(9),
            width: "100%",
            top: 0,
            // position: 'absolute',
            opacity: 1,
            flexDirection: "row",
            justifyContent: "space-between"
            //flex : 1
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              resizeMode="contain"
              style={{
                width: wp(25),
                height: hp(9),
                marginStart: 10,
                marginTop: hp(0.4)
              }}
              source={require("../imgs/home_logo.jpg")}
            ></Image>
          </View>

          {this.props.logoutReducers.member_id != null ? ( //show data member
            <View
              style={{
                marginTop: hp("2%"),
                marginRight: 5,
                flexDirection: "column"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 12,

                  fontFamily: "Prompt-Light"
                }}
              >
                {stringsoflanguages.p9} : คุณ{" "}
                {this.props.logoutReducers.first_name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 12,
                    //left: wp(62),
                    //position: 'absolute',
                    //top: hp(6),
                    //marginBottom: 5,
                    fontFamily: "Prompt-Light"
                  }}
                >
                  {stringsoflanguages.p5} :{" "}
                  {this.props.logoutReducers.summary_point}{" "}
                </Text>

                <Image
                  // resizeMode='contain'
                  style={{
                    marginLeft: 5,
                    width: 15,
                    height: 15,
                    top: 2
                    //left: wp(77),
                    //top: hp(6),
                    //marginBottom: 5,
                  }}
                  source={require("../imgs/coin.png")}
                ></Image>

                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 12,
                    // marginRight: 15,
                    //left: wp(87),
                    //position: 'absolute',
                    //top: hp(6),
                    //marginBottom: 5,
                    fontFamily: "Prompt-Light"
                  }}
                >
                  {" "}
                  {this.props.logoutReducers.summary_coin}
                </Text>
              </View>
            </View>
          ) : (
            <TouchableHighlight
              underlayColor={"#C5C6D0"}
              onPress={this.onLogin.bind(this)}
              style={{
                marginEnd: 15,
                marginTop: hp(2.3)
              }}
            >
              <Text
                style={{
                  top: 4.08,
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                  fontFamily: "Prompt-Light"
                }}
              >
                {stringsoflanguages.p1}
              </Text>
            </TouchableHighlight>
          )}
        </View>

        <TabView
          tabBarPosition="bottom"
          navigationState={this.state}
          // renderScene={SceneMap({
          //   first: this.FirstRoute,
          //   second: this.SecondRoute,
          // })}
          renderScene={this._renderScene}
          renderTabBar={props => (
            <TabBar
              {...props}
              pressColor="transparent"
              scrollEnabled={false}
              renderLabel={this._renderLabel(props)}
              tabStyle={{
                backgroundColor: "#f06823",
                marginBottom: 2
              }}
              style={{
                backgroundColor: "#f06823",
                paddingBottom: 1
              }}
              indicatorStyle={{
                backgroundColor: "white",
                height: 2
              }}
            />
          )}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: 50, height: 10 }}
          swipeEnabled={false}
        />

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible_login}
          backdropColor={"gray"}
          backdropOpacity={0.8}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
              width: wp("90%"),
              height: "45%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp("40%"),
              borderRadius: 15,
              position: "absolute"
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                width: wp("25%"),
                height: hp("25%"),
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                marginBottom: hp("42%"),
                position: "relative"
                // marginVertical: 130,
              }}
              source={require("../imgs/coin.png")}
            ></Image>
          </View>

          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              width: wp("80%"),
              height: "20%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
              borderRadius: 15,
              position: "relative"
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#f06823",
                marginBottom: 15,
                fontFamily: "Prompt-Bold"
              }}
            >
              COIN {this.state.login_coin}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontFamily: "Prompt-Light"
              }}
            >
              เข้าสู่ระบบประจำวัน
            </Text>
          </View>

          <Text
            style={{
              top: hp(2),
              textAlign: "center",
              textDecorationLine: "underline",
              fontFamily: "Prompt-Light",
              fontSize: 18,
              color: "white"
            }}
            onPress={() => this.close()}
          >
            {stringsoflanguages.p110}
          </Text>
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible_regis}
          backdropColor={"gray"}
          backdropOpacity={0.8}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
              width: wp("90%"),
              height: "45%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp("40%"),
              borderRadius: 15,
              position: "absolute"
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                width: wp("25%"),
                height: hp("25%"),
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                marginBottom: hp("42%"),
                position: "relative"
                // marginVertical: 130,
              }}
              source={require("../imgs/coin.png")}
            ></Image>
          </View>

          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              width: wp("80%"),
              height: "20%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 35,
              borderRadius: 15,
              position: "relative"
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#f06823",
                marginBottom: 15,
                fontFamily: "Prompt-Bold"
              }}
            >
              COIN {this.state.regis_coin}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontFamily: "Prompt-Light"
              }}
            >
              การสมัครสมาชิก
            </Text>
          </View>

          <Text
            style={{
              top: hp(2),
              textAlign: "center",
              textDecorationLine: "underline",
              fontFamily: "Prompt-Light",
              fontSize: 18,
              color: "white"
            }}
            onPress={() => this.close_regis()}
          >
            {stringsoflanguages.p110}
          </Text>
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible_profile}
          backdropColor={"gray"}
          backdropOpacity={0.8}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
              width: wp("90%"),
              height: "45%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp("40%"),
              borderRadius: 15,
              position: "absolute"
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                width: wp("25%"),
                height: hp("25%"),
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                marginBottom: hp("42%"),
                position: "relative"
                // marginVertical: 130,
              }}
              source={require("../imgs/coin.png")}
            ></Image>
          </View>

          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              width: wp("80%"),
              height: "20%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 35,
              borderRadius: 15,
              position: "relative"
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#f06823",
                marginBottom: 15,
                fontFamily: "Prompt-Bold"
              }}
            >
              COIN {this.state.profile_coin}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontFamily: "Prompt-Light"
              }}
            >
              เข้าสู่ระบบประจำวัน
            </Text>
          </View>

          <Text
            style={{
              top: hp(2),
              textAlign: "center",
              textDecorationLine: "underline",
              fontFamily: "Prompt-Light",
              fontSize: 18,
              color: "white"
            }}
            onPress={() => this.close_profile()}
          >
            {stringsoflanguages.p110}
          </Text>
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible_question}
          backdropColor={"gray"}
          backdropOpacity={0.8}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(240,104,35,0.8)",
              // backgroundColor: '#F06823',
              width: wp("90%"),
              height: "70%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp("15%"),
              borderRadius: 15,
              position: "absolute"
            }}
          >
            <View style={{ bottom: 120 }}>
              {/* <Text style={{ fontSize: 18, color: 'white' }}>{this.state.name_quiz}</Text> */}

              <View style={{ top: 140 }}>
                <Text style={{ fontSize: 18, color: "white", padding: 15 }}>
                  {this.state.name_quiz}
                </Text>
                {/* <Text> ERWERRE </Text> */}
                <FlatList
                  data={this.state.quiz}
                  renderItem={this.renderItem}

                  // keyExtractor={extractKey}
                />

                <Text
                  style={{
                    marginBottom: 40,
                    textAlign: "center",
                    textDecorationLine: "underline",
                    fontFamily: "Prompt-Light",
                    fontSize: 18,
                    color: "white"
                  }}
                  onPress={() => this.close_question()}
                >
                  {stringsoflanguages.p110}
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible_send_question}
          backdropColor={"gray"}
          backdropOpacity={0.8}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
              width: wp("90%"),
              height: "45%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp("40%"),
              borderRadius: 15,
              position: "absolute"
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                width: wp("25%"),
                height: hp("25%"),
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                marginBottom: hp("42%"),
                position: "relative"
                // marginVertical: 130,
              }}
              source={require("../imgs/coin.png")}
            ></Image>
          </View>

          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              width: wp("80%"),
              height: "20%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 35,
              borderRadius: 15,
              position: "relative"
            }}
          >
          {/* qusetion */}
          {selected_question == "N" ? (
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  marginBottom: 15,
                  fontFamily: "Prompt-Light"
                }}
              >
                เสียใจด้วยคุณตอบคำถามผิด
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  marginBottom: 15,
                  fontFamily: "Prompt-Light"
                }}
              >
                ยินดีด้วยคุณตอบคำถามถูก
              </Text>
            )}
            {/* qusetion */}
            <Text
              style={{
                fontSize: 30,
                color: "#f06823",
                marginBottom: 15,
                fontFamily: "Prompt-Bold"
              }}
            >
              COIN {this.state.coin_quiz}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontFamily: "Prompt-Light"
              }}
            >
              ขอบคุณสำหรับทำแบบสอบถาม
            </Text>
          </View>

          <Text
            style={{
              top: hp(2),
              textAlign: "center",
              textDecorationLine: "underline",
              fontFamily: "Prompt-Light",
              fontSize: 18,
              color: "white"
            }}
            onPress={() => this.close_send_question()}
          >
            {stringsoflanguages.p110}
          </Text>
        </Modal>
      </View>
    );
  }

  _renderScene = ({ route }) => {
    if (route.key == "first") {
      return this.FirstRoute();
    } else if (route.key == "second") {
      return this.SecondRoute();
    }
  };

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
                color: "white",
                fontFamily: "PSLKandaModernExtraPro",
                fontSize: 23,

                paddingBottom: 1
              },
              focused ? { color: "white" } : null
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
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: "column", padding: 2, height: 175 }}
            >
              <TouchableHighlight
                underlayColor={"#C5C6D0"}
                onPress={() => this.onPromo(item)}
              >
                <Image
                  style={styles.ImageComponentStyle}
                  source={{ uri: item.thumbnail_pic }}
                ></Image>
              </TouchableHighlight>
            </View>
          )}
          numColumns={this.state.GridColumnsValue ? 1 : 2}
          key={this.state.GridColumnsValue ? "ONE COLUMN" : "TWO COLUMN"}
          keyExtractor={(item, index) => index}
        />
      </View>
      // <View style={{ flex: 1, marginTop: 5 }}>

      //   <View >
      //     {this.state.dataSource.map((p, i) => (
      //       <View key={i} style={{ padding: 2 }}>

      //         <TouchableHighlight
      //           underlayColor={"#C5C6D0"}
      //           onPress={() => this.onPromo(p)}
      //         >
      //           <Image
      //             style={{
      //               height: hp('30%'),
      //               backgroundColor: '#eaeaea',
      //               resizeMode: 'stretch'

      //             }}
      //             source={{ uri: p.thumbnail_pic }}
      //           />

      //         </TouchableHighlight>

      //       </View>
      //     ))

      //     }
      //   </View>

      // </View>
    );
  };

  SecondRoute = () => {
    return (
      <View>
        <FlatList
          data={this.state.dataSource_coupon}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: "column", padding: 2, height: hp(40) }}
            >
              <TouchableHighlight
                underlayColor={"#C5C6D0"}
                onPress={() => {
                  this.toggleModal(true, item.code, item.id);
                }}
              >
                <Image
                  style={styles.ImageComponentStyle}
                  source={{ uri: item.pic_name }}
                ></Image>
              </TouchableHighlight>
            </View>
          )}
          numColumns={this.state.GridColumnsValue ? 1 : 2}
          key={this.state.GridColumnsValue ? "ONE COLUMN" : "TWO COLUMN"}
          keyExtractor={(item, index) => index}
        />

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          backdropColor={"black"}
          backdropOpacity={0.8}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.7)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableHighlight
              onPress={() => {
                this.toggleModal(!this.state.modalVisible);
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 260,
                  color: "white",
                  fontFamily: "Prompt-Bold"
                }}
              >
                X
              </Text>
            </TouchableHighlight>
            <Text
              style={{
                backgroundColor: "white",
                fontSize: 15,
                top: 55,
                padding: 5,
                borderRadius: 10,
                paddingLeft: 15,
                paddingRight: 15,
                justifyContent: "center",
                fontFamily: "Prompt-Bold"
              }}
            >
              COUPONCODE : {this.state.seleceted_code}{" "}
            </Text>

            <View>
              <Image
                resizeMode="contain"
                style={{
                  width: 200,
                  height: 200,
                  margin: 65,
                  top: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                source={{ uri: this.state.qr_code }}
              ></Image>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontFamily: "Prompt-Light"
                }}
              >
                {" "}
                {stringsoflanguages.p18}{" "}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontFamily: "Prompt-Light"
                }}
              >
                {" "}
                {stringsoflanguages.p96}{" "}
              </Text>

              <TouchableHighlight onPress={this.onConfirm.bind(this)}>
                <Text
                  style={{
                    backgroundColor: "#F06823",
                    padding: 12,
                    margin: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    width: 300,
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Prompt-Light"
                  }}
                >
                  {stringsoflanguages.p19}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  ImageComponentStyle: {
    height: "100%",
    width: "100%",
    backgroundColor: "#eaeaea",
    resizeMode: "stretch"
  },
  modalContent: {
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  scrollableModal: {
    height: 100
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#F06823",
    padding: 12,
    margin: 16,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: 300
  }
});

const mapStateToProps = state => ({
  logoutReducers: state.logoutReducers
});
const mapDispatchToProps = dispatch => ({
  dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabViewExample);
