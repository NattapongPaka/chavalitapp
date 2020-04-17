// // import React, { Component } from "react";


// import React, { Component,FBButtonWrapper } from 'react';
// import { View,Button } from 'react-native';
// import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// export default class App extends Component {


//     render() {
//         return (
//             <View >
              
                
                
//                 <LoginButton
//                     // publishPermissions={["public_profile"]}
//                     readPermissions={['public_profile']}
//                     onLoginFinished={
//                         (error, result) => {
//                             if (error) {
//                                 alert("login has error: " + result.error);
//                             } else if (result.isCancelled) {
//                                 alert("login is cancelled.");
//                             } else {
//                                 AccessToken.getCurrentAccessToken().then(
//                                     (data) => {
//                                         const infoRequest = new GraphRequest(
//                                             'me?fields=id,name,email,first_name',
//                                             null,
//                                             this._responseInfoCallback,
//                                         )                                   
//                                         // Start the graph request.
//                                         new GraphRequestManager().addRequest(infoRequest).start();
//                                     }
//                                 )
//                             }
//                         }
//                     }
//                     onLogoutFinished={() => alert("logout.")} 
//                     />



//             </View>
//         );
//     }

//     //Create response callback.
//     _responseInfoCallback = (error, result) => {
//         if (error) {
//             alert('Error fetching data: ' + error.toString());
//         } else {
//             alert('Result Name: ' + result.email + '|' + result.id + '|' + result.first_name + '|' + result.name);
//         }
//     }
// }



import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    padding: 10
  }
})

