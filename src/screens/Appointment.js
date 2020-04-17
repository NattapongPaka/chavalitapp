import React, { Component } from 'react';
import { KeyboardAvoidingView,SafeAreaView, View, Text, StyleSheet, Image, FlatList, TouchableHighlight, Picker, TextInput, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'

class Appointment extends React.Component {
  static navigationOptions = {
    headermode: 'float',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/doctor.png')}
        style={[{ resizeMode: 'contain', width: 26, height: 26 }, { tintColor: tintColor }]}
      />
    ),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#f06823',
      }
    }
  };


  // GetItem(item) {  Alert.alert(item);}


  constructor(props) {
    super(props);
    this.state = {
      Picker_doctor: '',
      Picker_time: '',
      date: "",
      param: '',
      description: '',
      appoint: '',
      contact: '',
      doctor: [],
      doctor_1: []
    };
    this.get_doctor()
  }

  getSelect = () => {
    Alert.alert("Selected XxxX: " + this.state.Picker_time);
  }

  get_doctor() {
    axios.get('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_name_doctor')
      .then(async respons => {
        //console.log('test' + JSON.stringify(respons.data))
        // console.log(respons.data)
        let a = respons.data

        let doctor_1 = ["ไม่ระบุ"];
        let new_doctor = [...doctor_1, ...a]


        this.setState({ doctor: new_doctor })
        let no_select = ['NoSelect']
        this.state.Picker_doctor.push(no_select)
        console.log('RRRET => ' + this.state.doctor.length)
      })
  }


  onConfirm() {
    const data = 'หมอสายตา : ' + this.state.Picker_doctor +
      ', วันนัดหมาย : ' + this.state.date +
      ', เวลา : ' + this.state.Picker_time +
      ', คำอธิบาย : ' + this.state.description +
      ', ผู้ทำการนัดหมาย : ' + this.state.appoint +
      'เบอร์ติดต่อ : ' + this.state.contact
    //this.props.navigation.navigate("Appointmernt_confirm")
    console.log(data)
    this.send_data(data)
  }

  send_data = () => {
    var data = new FormData();
    data.append("doctor_name", this.state.Picker_doctor);
    data.append("date", this.state.date);
    data.append("time", this.state.Picker_time);
    data.append("description", this.state.description);
    data.append("request_name", this.state.appoint);
    data.append("phone", this.state.contact);

    axios.post(' http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=post_appointment', data)
      .then(async respons => {
        this.props.navigation.navigate("Appointment_confirm");
        console.log(this.state.doctor)
      })
  }


  render() {

    return (
      <View style={{flex: 1, }}>
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
                }}>{stringsoflanguages.p68}</Text>
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
      <ScrollView >
        <View>
      

          <View style={{
            marginTop: 3,
            borderBottomWidth: 1,
            borderColor: '#ddd',
            height: hp(13),
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,

          }}>
            <Text style={{
              fontSize: 17,
              alignSelf: 'center',
              marginTop: 35,
              fontFamily: 'Prompt-Light'
            }}>{stringsoflanguages.p69}</Text>

          </View>


          <View style={{
            borderBottomWidth: 1,
            borderColor: '#ddd',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            backgroundColor: '#eaeaea'
          }}>
            <Text style={{ fontSize: 15, padding: 10, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p70}</Text>
            <Picker
              selectedValue={this.state.Picker_doctor}
              onValueChange={(itemValue, itemIndex) => this.setState({ Picker_doctor: itemValue })}
              style={{
                alignSelf: "stretch",
                borderBottomLeftRadius: 15,
                borderBottomStartRadius: 15,
                fontFamily: 'Prompt-Light',
                margin: 10,
                left: 5,
                right: 5,
                backgroundColor: 'white',
                height: 35
              }}>

              {/* {doctor_1} */}

              {this.state.doctor.map((s, i) => {
                return <Picker.Item value={i} label={s} />
              })}

            </Picker>





            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={{ fontSize: 15, padding: 10, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p72}</Text>
                <DatePicker
                  style={{ width: wp(50) }}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  // minDate="2500-05-01"
                  // maxDate="2562-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"

                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: wp(49),
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      margin: 10,
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      fontSize: 12,
                      fontFamily: 'Prompt-Light'
                    }
                  }}
                  onDateChange={(date) => { this.setState({ date: date }) }}
                />
              </View>

              <View>
                <Text style={{ fontSize: 15, padding: 10, fontFamily: 'Prompt-Light', marginLeft: 22 }}>{stringsoflanguages.p73}</Text>
                <Picker selectedValue={this.state.Picker_time}
                  onValueChange={(itemValue, itemIndex) => this.setState({ Picker_time: itemValue })}
                  style={{
                    alignSelf: "stretch",
                    borderBottomLeftRadius: 15,
                    borderBottomStartRadius: 15,
                    fontFamily: 'Prompt-Light',
                    margin: 10,
                    bottom: hp(1),
                    backgroundColor: 'white',
                    height: 35,
                    width: wp(35),
                    marginLeft: 35

                  }}>
                  <Picker.Item label={stringsoflanguages.p90} value="" />
                  <Picker.Item label="9:30" value="9:30" />
                  <Picker.Item label="10:00" value="10:00" />
                  <Picker.Item label="10:30" value="10:30" />
                  <Picker.Item label="11:00" value="11:00" />
                  <Picker.Item label="11:30" value="11:30" />
                  <Picker.Item label="13:00" value="13:00" />
                  <Picker.Item label="13:30" value="13:30" />
                  <Picker.Item label="14:00" value="14:00" />
                  <Picker.Item label="14:30" value="14:30" />
                  <Picker.Item label="15:00" value="15:00" />
                  <Picker.Item label="15:30" value="15:30" />
                  <Picker.Item label="16:00" value="16:00" />
                  <Picker.Item label="16:30" value="16:30" />
                  <Picker.Item label="17:00" value="17:00" />
                  <Picker.Item label="17:30" value="17:30" />
                  <Picker.Item label="18:00" value="18:00" />
                  <Picker.Item label="18:30" value="18:30" />
                  <Picker.Item label="19:00" value="19:00" />
                  <Picker.Item label="19:30" value="19:30" />
                  <Picker.Item label="20:00" value="20:00" />
                </Picker>
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 15, padding: 10, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p74}</Text>
              <TextInput
                onChangeText={(text) => this.setState({ description: text })}
                autoCapitalize={'words'}

                style={{
                  height: hp(6),
                  width: wp(92),

                  borderRadius: 15,
                  fontSize: 15,
                  borderWidth: 2,
                  borderColor: '#fff',
                  backgroundColor: 'white',
                  margin: 10,
                  padding: 10,
                  fontFamily: 'Prompt-Light'
                }}

                placeholder={stringsoflanguages.p75}
              />

            </View>

            <View>
              <Text style={{ fontSize: 15, padding: 10, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p76}</Text>
              <TextInput
                onChangeText={(text) => this.setState({ appoint: text })}
                autoCapitalize={'words'}

                style={{
                  height: hp(6),
                  width: wp(92),

                  borderRadius: 15,
                  fontSize: 15,
                  borderWidth: 2,
                  borderColor: '#fff',
                  backgroundColor: 'white',
                  margin: 10,
                  padding: 10,
                  fontFamily: 'Prompt-Light'
                }}


              />

            </View>

            <View>
              <Text style={{ fontSize: 15, padding: 10, fontFamily: 'Prompt-Light' }}>{stringsoflanguages.p77}</Text>
              <TextInput
                onChangeText={(text) => this.setState({ contact: text })}
                autoCapitalize={'words'}

                style={{
                  height: hp(6),
                  width: wp(92),

                  borderRadius: 15,
                  fontSize: 15,
                  borderWidth: 2,
                  borderColor: '#fff',
                  backgroundColor: 'white',
                  margin: 10,
                  padding: 10,
                  fontFamily: 'Prompt-Light'
                }}


              />

            </View>

            <View>
              <TouchableHighlight
                onPress={() => this.onConfirm()}
                style={{
                  height: hp(7),
                  backgroundColor: '#F06823',
                  alignSelf: 'stretch',

                  borderRadius: 10,
                  justifyContent: 'center',
                  margin: 20
                }}>
                <Text style={{
                  fontSize: 17,
                  color: '#FFF',
                  alignSelf: 'center',
                  fontFamily: 'Prompt-Light'
                }}>
                  {stringsoflanguages.p78}
                </Text>
              </TouchableHighlight>

            </View>
          </View>
        </View>
      </ScrollView>
</View>










    );
  }
}

const styl = StyleSheet.create({
  textSecond: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 300,
  },
  rect: {
    backgroundColor: '#F06823',
    height: '11%'
  },
  MainContainer: {

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    margin: 10

  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

});



const mapStateToProps = (state) => ({
  logoutReducers: state.logoutReducers
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointment)

// export default Appointment;


// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

// class componentName extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//       </View>
//     );
//   }
// }

// export default componentName;

