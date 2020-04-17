import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Alert,
  Text,
  Image,
  View,
  ScrollView
} from "react-native";
import axios from "axios";
// import console = require('console');
import AsyncStorage from "@react-native-community/async-storage";
// import FBSDK, {LoginManager} from 'react-native-fbsdk';
import { sha1 } from "react-native-sha1";
import stringsoflanguages from "./stringsoflanguages";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";




class Loginsrc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      pass_sha: "",
      idxx: ""
    };
  }

  // _fb_login() {

  //     LoginManager.logInWithReadPermissions(['public_profile','email'])
  //         .then(function (result) {
  //             if (result.isCancelled) {
  //                 Alert.alert('login was cancelled');
  //             } else {
  //                 alert(result.grantedPermissions.toString());
  //                 console.log(JSON.stringify(result));
  //             }
  //         }, function (error) {
  //             alert(error);

  //         })

  // }

  async onLoginPressed() {
    //  if (username && password) {
    //     Alert.alert("Login Successful")
    //     this.props.navigation.navigate("Navigation")
    // } else {
    //     Alert.alert("Check Username and Password")
    // }
    sha1(this.state.password).then(hash => {
      console.log(hash);
      const password = hash;
      this.setState({ pass_sha: password });
      this.do_login(password);
      console.log("ffw :" + this.state.pass_sha);
    });
  }
  do_login(password) {
    const { username } = this.state;
    //  if (username && password) {
    //     Alert.alert("Login Successful")
    //     this.props.navigation.navigate("Navigation")
    // } else {
    //     Alert.alert("Check Username and Password")
    // }

    var data = new FormData();
    data.append("username", username);
    data.append("password", password);
    console.log("sha1 => " + password);

    axios
      .post(
        "http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_login",
        data
      )
      .then(async respons => {
        //console.log('test' + JSON.stringify(respons.data))
        console.log(respons.data.result);
        if (respons.data.result == "Login success") {
          let member_id = respons.data.member_id;
          await AsyncStorage.setItem("member_id", member_id);
          this.props.navigation.navigate("Navigation");
          //this.props.navigation.goBack()
        } else {
          alert(respons.data.result);
          console.log("Login error");
        }
      });
  }

  async fb_regis(id, email, fname, lname) {
    let UserID = id.toString();
    let UserEmail = email;
    let UserFirstname = fname;
    let UserLastname = lname;
    console.log(
      "User_fb :" +
      UserID +
      "::" +
      UserEmail +
      "::" +
      UserFirstname +
      "::" +
      UserLastname
    );

    let data = new FormData();
    data.append("id_facebook", id);
    data.append("username", UserEmail);
    data.append("first_name", UserFirstname);
    data.append("last_name", UserLastname);

    axios
      .post(
        " http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=login_from_facebook",
        data
      )
      .then(async respons => {
        console.log("User_fb :", respons.data);
        await AsyncStorage.setItem("member_id", respons.data.member_id);
        this.props.navigation.navigate("Navigation", {
          id: respons.data.member_id
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onForgetpass() {
    this.props.navigation.navigate("Forgetpass");
  }

  onRegister() {
    this.props.navigation.navigate("Register");
  }

  onNavbar() {
    this.props.navigation.navigate("Navigation");
  }

  render() {
    return (
      <View>
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
          <View style={{ flexDirection: "row", marginTop: hp("1%") }}>
            <TouchableHighlight
              underlayColor={"#C5C6D0"}
              onPress={this.onNavbar.bind(this)}
              style={{
                height: 25,
                width: 50,
                top: 15,
                alignItems: "center"
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 22,
                  alignItems: "center"
                }}
                source={require("../imgs/leftarrow.png")}
              ></Image>
            </TouchableHighlight>

            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "auto",
                top: 12,
                fontFamily: "Prompt-Bold"
              }}
            >
              {stringsoflanguages.p1}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View
              resizeMode="contain"
              style={{
                width: 70,
                height: 62,
                top: 23,
                backgroundColor: "#F06823",
                alignSelf: "flex-start",
                left: 1,
                borderBottomLeftRadius: 14,
                borderTopLeftRadius: 14
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  left: 10,
                  top: 13
                }}
                source={require("../imgs/user_icon.jpg")}
              ></Image>
            </View>
            <TextInput
              onChangeText={text => this.setState({ username: text })}
              autoCapitalize={"words"}
              autoCorrect={false}
              style={styles.input}
              placeholder={stringsoflanguages.p41}
            />
          </View>

          <View style={styles.container1}>
            <View
              resizeMode="contain"
              style={{
                width: 70,
                height: 62,
                top: 23,
                backgroundColor: "#F06823",
                alignSelf: "flex-start",
                left: 1,
                borderBottomLeftRadius: 14,
                borderTopLeftRadius: 14
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  left: 10,
                  top: 13
                }}
                source={require("../imgs/pass_icon.jpg")}
              ></Image>
            </View>
            <TextInput
              onChangeText={text => this.setState({ password: text })}
              autoCapitalize={"words"}
              autoCorrect={false}
              style={styles.input}
              secureTextEntry={true}
              placeholder={stringsoflanguages.p12}
            />
          </View>

          <View style={styles.container2}>
            <TouchableHighlight
              underlayColor={"#C5C6D0"}
              onPress={this.onForgetpass.bind(this)}
              style={{
                height: 50,
                alignSelf: "baseline",

                justifyContent: "center",
                left: wp(10)
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#0007",
                  fontFamily: "Prompt-Light"
                }}
              >
                {stringsoflanguages.p13} |
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={"#C5C6D0"}
              onPress={this.onRegister.bind(this)}
              style={{
                height: 50,
                alignSelf: "baseline",
                bottom: 50,
                justifyContent: "center",
                left: wp(50)
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#0007",
                  fontFamily: "Prompt-Light"
                }}
              >
                {stringsoflanguages.p14}
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this.onLoginPressed.bind(this)}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>
                {stringsoflanguages.p1}
              </Text>
            </TouchableHighlight>

            <Text
              style={{
                padding: 10,
                fontSize: 18,
                bottom: 30,
                fontFamily: "Prompt-Light"
              }}
            >
              {stringsoflanguages.p15}
            </Text>

            {/* <TouchableHighlight
                       onPress={()=> this._fb_login()}
                        style={styles.loginButton1}>
                        <Text style={styles.loginButtonText}>
                        {stringsoflanguages.p16}
                         </Text>
                    </TouchableHighlight> */}

            <View
              style={{
                height: hp(6),
                backgroundColor: "#4267B2",
                width: wp(83),
                borderRadius: 10,
                justifyContent: "center"
              }}
            >
              <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <LoginButton
                  // publishPermissions={["public_profile"]}

                  readPermissions={["public_profile"]}
                  onLoginFinished={(error, result) => {
                    if (error) {
                      alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      alert("login is cancelled.");
                    } else {

                    
                      AccessToken.getCurrentAccessToken().then(data => {
                        const infoRequest = new GraphRequest(
                          "me?fields=id,email,first_name,last_name",
                          null,
                          this._responseInfoCallback
                        );
                        // Start the graph request.
                        new GraphRequestManager()
                          .addRequest(infoRequest)
                          .start();
                      });
                    }
                  }}
                  onLogoutFinished={() => alert("logout.")}
                ></LoginButton>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert("ERR_DATA: " + error.toString());
    } else {
      // alert('Result Name: ' + result.email + '|' + result.id + '|' + result.first_name + '|' + result.last_name);

      let id = result.id;
      let email = result.email;
      let fname = result.first_name;
      let lname = result.last_name;

      // alert(idxx)

      this.fb_regis(id, email, fname, lname);

      // this.props.navigation.navigate("Navigation", { id: result.id, f_name: result.first_name, l_name: result.last_name, email: result.email })
    }
  };
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,

    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    top: 95
  },
  container1: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 55
  },
  container2: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    bottom: 30
  },
  banner: {
    height: 90,
    width: "100%"
  },
  input: {
    height: 65,
    width: "100%",
    bottom: 40,
    paddingLeft: 60,
    borderRadius: 15,
    alignItems: "center",
    textAlign: "center",
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#f06823",
    fontFamily: "Prompt-Light"
  },
  loginButton: {
    height: 45,
    backgroundColor: "#F06823",
    alignSelf: "stretch",
    bottom: 40,
    borderRadius: 10,
    justifyContent: "center"
  },
  loginButton1: {
    height: 45,
    backgroundColor: "#4267b2",
    alignSelf: "stretch",
    bottom: 17,
    borderRadius: 10,
    justifyContent: "center"
  },
  registerButton: {
    height: 50,
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center"
  },
  loginButtonText: {
    fontSize: 17,
    color: "#FFF",
    alignSelf: "center",
    fontFamily: "Prompt-Light"
  },
  registerButtonText: {
    fontSize: 20,
    color: "#0007",
    alignSelf: "center"
  },
  registerButtonText1: {
    fontSize: 15,
    color: "#0007",
    alignSelf: "center"
  },
  heading: {
    fontSize: 30,
    marginBottom: 40
  },
  error: {
    color: "red",
    paddingTop: 10
  },
  success: {
    color: "green",
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  },
  ipIcon: {
    position: "absolute",
    top: 30,
    left: 37
  },
  registerButtonText2: {
    fontSize: 40,
    color: "#0007"
  }
});

export default Loginsrc;
