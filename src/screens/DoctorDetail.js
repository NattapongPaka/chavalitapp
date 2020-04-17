import React, { Component } from 'react';

import { StyleSheet, View, Platform, Text, FlatList, TouchableHighlight, Alert, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'

 class DoctorDetail extends Component {

    onChangepass() {
        this.props.navigation.navigate("Changepass")
    }

    onGalleryDetail() {
        this.props.navigation.navigate("GalleryDetail")
    }

    onDoctorGallery() {
        // this.props.navigation.navigate("DoctorGallery")
        const id_doctor = this.props.navigation.getParam('id')
        //var data_doc = this.state.data_gallery

        this.props.navigation.navigate("DoctorGallery", { id_gallery: id_doctor,name_d : this.state.data_text.name })
    }

    constructor(props) {
        super(props);
        this.state = {
            data_text: '',
            data_gallery: []
        };
    }
    componentWillMount() {
        this.get_data()
        this.get_gallery()
    }

    get_data() {
        const id_doctor = this.props.navigation.getParam('id')
        console.log('doctor_id :' + id_doctor)
        var data = new FormData();
        data.append("id", id_doctor);
        let url = 'http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_doctor_detail&doctor_id=' + id_doctor
        console.log(url)
        axios.get(url)
            .then(respons => {
                //console.log(respons)
                this.setState({
                    data_text: respons.data
                })
                console.log(this.state.data_text)

            })
    }

    get_gallery() {
        const id_doctor = this.props.navigation.getParam('id')
        console.log('doctor_id :' + id_doctor)
        var data = new FormData();
        data.append("id", id_doctor);
        axios.get('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_doctor_pic&doctor_id=' + id_doctor)
            .then(respons => {
                //console.log(respons)
                this.setState({
                    data_gallery: respons.data
                })
                console.log(this.state.data_gallery)

            })
    }

    render() {
        const img_data = this.props.navigation.getParam('img')
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



                <View style={{ flexDirection: 'row', flex: 1, top: 10, width: wp(80) }}>
                    <Image

                        style={{
                            height: 100,
                            width: 100,
                            margin: 12,
                            borderColor: '#F06823',
                            borderWidth: 3,
                            borderRadius: 10,
                            right: 2
                        }}
                        source={{ uri: img_data }} />

                    <View style={{
                        borderColor: '#ddd',
                        borderWidth: 2,
                        borderLeftWidth: 2,
                        borderRightWidth: 2,
                        borderTopWidth: 2,
                        top: 12,
                        width: '80%',
                        height: '90%',
                        right: 5

                    }}>
                        <Text style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: 20,
                            margin: 30,
                            fontFamily:'Prompt-Light'
                        }}> {this.state.data_text.name}</Text>


                        <ScrollView>
                            <View style={{ flex: 1, width: '100%', backgroundColor: '#ddd' }}>

                                <Text style={{
                                    textAlign: 'auto',
                                    fontSize: 15,
                                    padding: 15,
                                    fontFamily:'Prompt-Light'
                                }}>

                                    {this.state.data_text.information}
                                </Text>
                                {/* <Text style={{ fontSize: 15, textAlign: 'auto', alignSelf: 'flex-start', padding: 10 }}>ผิดพลาด หลินจืออัลตรา วิลเลจอมาตยาธิปไตยเอ๋อดิกชันนารีม็อบ งี้โมเดลโบรชัวร์เอ็กซ์โป โบกี้ ล็อบบี้ สุนทรีย์ ยนตรกรรมฮ็อตด็อกอุตสาหการไลฟ์ อุปการคุณ แชมปิยองแครกเกอร์ สแล็กไทเฮาติงต๊อง แคนยอนปิยมิตรทาวน์เฮาส์ก๋ากั่นโพสต์ คอรัปชั่น ม้งต่อรองสไตล์แพ็คไลท์ ดีพาร์ทเมนท์ออร์แกน เยน</Text>
                                <Text style={{ fontSize: 15, textAlign: 'auto', alignSelf: 'flex-start', padding: 10 }}>สไปเดอร์แล็บโบกี้ม็อบเมี่ยงคำ จ๊าบกระดี๊กระด๊าคอนโดเมเปิลโปรเจ็คท์ เซลส์เทรลเลอร์มาร์ตละอ่อน สเปกเมจิกซาบะ ปิกอัพวัคค์ แซ็กสติกเกอร์ควิก พุทโธ ไวอะกร้ามาร์ก โค้ก กิฟท์ฮิตไฮบริดทิป แพตเทิร์น ตรวจสอบ โปรเจ็กเตอร์ เทรนด์เซ่นไหว้ม็อบ อิเลียด ไคลแม็กซ์แม่ค้า </Text>
 */}

                            </View>

                        </ScrollView>



                    </View>



                </View>

                <TouchableHighlight
                    onPress={() => this.onDoctorGallery()}
                    // onPress={() => this.onDoctorGallery(item)}
                    style={{
                        height: '7%',
                        width: wp(63),
                        backgroundColor: '#f06823',
                        // top: 7,
                        bottom : 15 ,
                        borderRadius: 15,
                        left: 120
                    }}>

                    {/* <Image
                        resizeMode='contain'
                        style={{ height: '55%', width: "100%", alignItems: 'flex-start', top: 11, right: 72 }}
                        source={require("../imgs/gallery.png")} /> */}
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        //bottom: 65,
                        textAlign: 'center',
                        //left: 40,
                        justifyContent:'center',
                        padding : 10,
                        fontFamily:'Prompt-Light'
                    }}>{stringsoflanguages.p35}</Text>


                </TouchableHighlight>


                


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
  })
  
  const mapDispatchToProps = (dispatch) => ({
    dispatch
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail)

