import React, { Component } from 'react';
import stringsoflanguages from './stringsoflanguages';
import { SafeAreaView, StyleSheet, View, Platform, Text, FlatList, TouchableHighlight, Alert, ActivityIndicator, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux'

class App extends Component {

  constructor() {
    super();

    this.state = {

      GridColumnsValue: true,

      ButtonDefaultText: 'CHANGE TO GRIDVIEW',

      isLoading: true
    }

  }

  componentDidMount() {

    return fetch('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_category_allbum')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          // In this block you can do something with new state.
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

  // GetGridViewItem(item) {

  //   Alert.alert(item);

  // }


  onChangepass() {
    this.props.navigation.navigate("Changepass")
  }

  onGalleryDetail(item) {
    // this.props.navigation.navigate("GalleryDetail")
    console.log(item)
    this.props.navigation.navigate("GalleryDetail", { id: item.id, name: item.name })
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

      <SafeAreaView style={{ backgroundColor: '#F06823', flex: 1,}}>
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
            <View style={{flexDirection : 'row' , marginTop : hp('1%')}}>           
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
                }}>{stringsoflanguages.p67}</Text>
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




        <View style={{ flex: 1, padding: 2,  backgroundColor : '#fff' }}>

          <FlatList

            data={this.state.dataSource}

            renderItem={({ item }) => <View style={{ flex: 1, flexDirection: 'column', margin: 2 }}>

              <TouchableHighlight
                underlayColor={"#C5C6D0"}
                // onPress={this.onGalleryDetail.bind(this)}
                onPress={() => this.onGalleryDetail(item)}
              >
                <Image
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    alignItems: 'center',
                    height: hp(25),
                    position: 'relative'
                  }}
                  source={require("../imgs/gallery_bg.jpg")}
                ></Image>

              </TouchableHighlight>



              <Image
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: hp(6),
                  width: wp(35),
                  position: 'absolute',
                  alignSelf: 'center',
                  top: hp(6),
                  resizeMode: 'contain'
                }}
                source={require("../imgs/logo.png")}
              // onPress={() => this.onGalleryDetail(item)}
              ></Image>


              <Text
                style={{
                  color: 'orange',
                  padding: 10,
                  fontSize: 18,
                  textAlign: 'center',
                  top: hp(14),
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: wp(95),
                  position: 'absolute',
                  fontFamily: 'Prompt-Bold'

                }}
                numberOfLines={1}
                onPress={() => this.onGalleryDetail(item)}>{item.name}


              </Text>

            </View>
            }

            numColumns={this.state.GridColumnsValue ? 1 : 2}

            key={(this.state.GridColumnsValue) ? 'ONE COLUMN' : 'TWO COLUMN'}

            keyExtractor={(item, index) => index}

          />



        </View>
      </SafeAreaView>

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
    height: 130,
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
  logoutReducers: state.logoutReducers
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App)