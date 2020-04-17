import React, { Component } from 'react';

import { PixelRatio,SafeAreaView,StyleSheet, View, Platform, Text, FlatList, TouchableHighlight, Alert, ActivityIndicator, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import stringsoflanguages from './stringsoflanguages';
import { connect } from 'react-redux'

class App extends Component {

  constructor() {
    super();

    this.state = {

      GridColumnsValue: true,

      ButtonDefaultText: 'CHANGE TO GRIDVIEW',

      isLoading: true,
      dataSource: []

    }
  }

  componentDidMount() {
    this.test1()

  }

  test1() {
    fetch('http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_article')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          console.log(this.state.dataSource)
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

  onContentDetail(con) {
    console.log(con);
    this.props.navigation.navigate("ContentDetail", { id: con.id, img: con.pic_cover, name: con.title })
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

      <SafeAreaView style={{ flex: 1, backgroundColor: '#F06823', }}>
        
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
                }}>{stringsoflanguages.p80}</Text>
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
        



        <View style={{ flex: 1, backgroundColor : '#fff'}}> 

          <FlatList

            data={this.state.dataSource}

            renderItem={({ item }) => <View style={{ flex: 1, flexDirection: 'column', margin: 2 }}>
              <TouchableHighlight onPress={() => this.onContentDetail(item)}>

                <Image
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    alignItems: 'center',
                    height: hp(25),
                    position: 'relative',
                    resizeMode: 'stretch'
                    

                   

                   

                  }}
                  source={{ uri: item.pic_cover }}
                />
              </TouchableHighlight>
              <Text

                // onPress={this.GetGridViewItem.bind(this, item.flower_name)}
                style={{
                  color: '#fff',
                  padding: 10,
                  fontSize: 18,
                  textAlign: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  top: hp(18),
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: wp(95),
                  position: 'absolute',
                  fontFamily: 'Prompt-Light'

                }}
                numberOfLines={1} >{item.title}

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



  ButtonStyle: {

    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#FF9800',
    width: '100%',
    height: 50,
    fontFamily: 'Prompt-Light'
  },

  ButtonInsideTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Prompt-Light'
  }

});

const mapStateToProps = (state) => ({
  logoutReducers: state.logoutReducers
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App)