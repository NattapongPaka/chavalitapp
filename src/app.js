import Loginsrc from './screens/Loginsrc';
import Navbarsrc from './screens/Navbarsrc';
import Changepass from './screens/Changepass';
import PromoDetail from './screens/PromoDetail';
import Gallery from './screens/Gallery';
import GalleryDetail from './screens/GalleryDetail';
import Member from './screens/Member';
import Content from './screens/Content';
import ContentDetail from './screens/ContentDetail';
import Contact from './screens/Contact';
import Forgetpass from './screens/Forgetpass';
import Register from './screens/Register';
import Navbar_Home from './screens/Navbar_Home';
import Navbar_Brand from './screens/Navbar_Brand';
import Navbar_Orther from './screens/Navbar_Orther';
import Navbar_Doctor from './screens/Navbar_Doctor';
import Navbar_Point from './screens/Navbar_Point';
import ContentGallery from './screens/ContentGallery';
import DoctorDetail from './screens/DoctorDetail';
import DoctorGallery from './screens/DoctorGallery';
import Policy_point from './screens/Policy_point';
import Policy_coin from './screens/Policy_coin';
import Appointment_confirm from './screens/Appointment_confirm';
import Register_otp from './screens/Register_otp';
import Register_confirm from './screens/Register_confirm';
import Qrcode from './screens/Qrcode';
import Splash from './screens/Splash';
import Gallery_show from './screens/Gallery_show';


import Tabs from './screens/Tabs';
import Test from './screens/Test';

import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import ContentScreen from './screens/ContentScreen';

import { createStackNavigator, createNavigationContainer,createSwitchNavigator,createAppContainer } from 'react-navigation';
import Appointment from './screens/Appointment';
console.disableYellowBox = true;
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
    }

    componentDidMount() {
        setTimeout(() => {
            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            this._bootstrapAsync()
          }, 3000);
      }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate('App');
    };

  
    // Render any loading content that you like here
    render() {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F86A2C', }}>
            <View style={{flex : 1, justifyContent : 'center', alignSelf : 'center',}}>
                <Image
                style={{ width : 310 , height : 310}}
                source={require('./imgs/chavalit.jpg')}
                />
               
            </View>
            <View style={{justifyContent : 'center', alignSelf : 'center', bottom : hp(30)}}>
                <Image
                    style={{ width : 40 , height : 10}}
                    source={require('./imgs/loading.gif')}
                />
            </View>
        </SafeAreaView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
const Logins = createStackNavigator({
    Login: Loginsrc,
    Register: Register,
    Register_otp:Register_otp,    
    Register_confirm: Register_confirm
  
},
    {
        headerMode: 'none',
        backgroundColor: '#F06823',

    })




const RootStack = createStackNavigator({
    // Login: {
    //     screen: Logins
    // },
    Navigation: {
        screen: Navbarsrc,
    },
    Changepass: {
        screen: Changepass
    },
    Promotion: {
        screen: PromoDetail
    },
    Gallery: {
        screen: Gallery
    },
    GalleryDetail: {
        screen: GalleryDetail
    },
    Member: {
        screen: Member
    },
    Appoint: {
        screen: Appointment
    },
    Content: {
        screen: Content
    },
    ContentDetail: {
        screen: ContentDetail
    },
    Contact: {
        screen: Contact
    },
    Forgetpass: {
        screen: Forgetpass
    },
    
    Navbar_Home: {
        screen: Navbar_Home
    },
    Navbar_Brand: {
        screen: Navbar_Brand
    },

    Navbar_Point: {
        screen: Navbar_Point
    },

    Navbar_Doctor: {
        screen: Navbar_Doctor
    },

    Navbar_Orther: {
        screen: Navbar_Orther
    },

    ContentGallery: {
        screen: ContentGallery
    },
    DoctorDetail: {
        screen: DoctorDetail
    },
    DoctorGallery: {
        screen: DoctorGallery
    },
    Tabs: {
        screen: Tabs
    },
    Policy_point: {
        screen: Policy_point
    },
    Policy_coin: {
        screen: Policy_coin
    },
    Appointment_confirm: {
        screen: Appointment_confirm
    },
  
    Qrcode: {
        screen: Qrcode
    },
    Splash:{
        screen:Splash
    },
    Test:{
        screen:Test
    },
    Gallery_show:{
        screen: Gallery_show
    },

    LanguageSelectionScreen: {
        screen: LanguageSelectionScreen,
        navigationOptions: { header: null }
    },
    ContentScreen: { screen: ContentScreen },

}, {
        initialRouteName: 'Navigation',
        headerMode: 'none'
    })




export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: RootStack,
        Auth: Logins

    },
    {
        initialRouteName: 'AuthLoading',
        headerMode: 'none'
    }
));
