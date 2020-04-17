'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
// import console = require('console');
import stringsoflanguages from './stringsoflanguages';

export default class Qrcode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataqr: '',
      status: 'Ready'
    };
  }

  handleClose = () => {
    this.setState({ show: false })
    this.props.navigation.navigate("Navigation")
  }


  onSuccess(e) {
    this.setState({
      dataqr: this.state.dataqr + ',' + e.data,
      status: 'Yep'
    })
    Alert.alert(
      'QR CODE',
      'COUPONCODE:' + e.data,
      [
        { text: 'OK', onPress: () => this.send_data() },
      ],
      { cancelablr: false }
    )

    // data = { 'gg': global.selected_id }
  }

  send_data(){
    const code = this.props.navigation.getParam('code')
    const id = this.props.navigation.getParam('id')
    var data = new FormData();
    data.append("member_id", global.get_member_id);
    data.append("coupon_id", code);
    data.append("ref_code", id);
      axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_confirm_used_coupon', data)
      .then(respons => {
         console.log(respons)
        this.setState({ show: false })
        this.props.navigation.navigate("Navigation")
         
          })
  }


  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            {stringsoflanguages.p20}
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress={this.handleClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 12,
   top:18,
    color: '#777',
   
    justifyContent: 'center',
    fontFamily: 'Prompt-Light'
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    top: 28,
    fontSize: 21,
    color: '#777',
    fontFamily: 'Prompt-Bold'
  },
  buttonTouchable: {
    padding: 16,
    top:3,
    fontFamily: 'Prompt-Light'  },
});

