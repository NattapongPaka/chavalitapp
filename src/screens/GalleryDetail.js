import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Modal
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import stringsoflanguages from "./stringsoflanguages";
import { connect } from "react-redux";

//----------------------------------------------------------------------------------
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
const numColumns = 2;
//----------------------------------------------------------------------------------
class GalleryDetail extends React.Component {
  static navigationOptions = {
    headermode: "float",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../imgs/doctor.png")}
        style={[
          { resizeMode: "contain", width: 26, height: 26 },
          { tintColor: tintColor }
        ]}
      />
    ),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "white",
      style: {
        backgroundColor: "#f06823"
      }
    }
  };

  // GetItem(item) {  Alert.alert(item);}

  constructor() {
    super();

    this.state = {
      GridColumnsValue: 2,

      ButtonDefaultText: "CHANGE TO GRIDVIEW",

      isLoading: true,
      modalVisible: false,
      dataGetAlbum: [],
      selected: ""
    };
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={{ flex: 1, margin: 1 }}>
        <TouchableHighlight
          underlayColor={"#C5C6D0"}
          //onPress={this.onGalleryDetail.bind(this)}
          onPress={() => {
            this.toggleModal(true, (p = item.name_pic));
          }}
        >
          <Image
            style={styl.ImageComponentStyle}
            source={{ uri: item.name_pic }}
          ></Image>
        </TouchableHighlight>
      </View>
    );
  };

  toggleModal(visible, p) {
    // this.setState({ modalVisible: visible, selected: p });
    this.props.navigation.navigate("Gallery_show", { image: p });
  }

  componentDidMount() {
    this.get_album();
  }

  get_album() {
    const id_album = this.props.navigation.getParam("id");
    console.log("category_album_id :" + id_album);
    var data = new FormData();
    data.append("id", id_album);
    axios
      .get(
        "http://chavalitapp.revocloudserver.com/chavalit_backoffice/api/function.php?fnc=get_pic_allbum&category_album_id=" +
          id_album
      )
      .then(respons => {
        //console.log(respons)
        this.setState({
          dataGetAlbum: respons.data,
          isLoading: false
        });
        console.log(this.state.dataGetAlbum);
      });
  }

  ChangeGridValueFunction = () => {
    if (this.state.GridColumnsValue === true) {
      this.setState({
        GridColumnsValue: true,
        ButtonDefaultText: "CHANGE TO GRIDVIEW"
      });
    } else {
      this.setState({
        // GridColumnsValue: false,
        // ButtonDefaultText: "CHANGE TO LISTVIEW"
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    const img_data = this.props.navigation.getParam("img");
    const name = this.props.navigation.getParam("name");
    return (
      <SafeAreaView style={{ backgroundColor: "#F06823", flex: 1 }}>
        <View
          style={{
            backgroundColor: "#F06823",
            height: "9%",
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
            <TouchableHighlight
              underlayColor={"#C5C6D0"}
              onPress={() => this.props.navigation.goBack()}
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
              {stringsoflanguages.p67}
            </Text>
          </View>

          <View>
            {this.props.logoutReducers.member_id != null ? ( //show data member
              <View style={{ margin: 5, flexDirection: "column" }}>
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
            ) : null}
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Image
            resizeMode="stretch"
            style={{ height: "30%", width: "100%", position: "relative" }}
            source={require("../imgs/gallery_bg.jpg")}
          ></Image>

          <Image
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: hp(6),
              width: wp(35),
              position: "absolute",
              alignSelf: "center",
              top: hp(6),
              resizeMode: "contain"
            }}
            source={require("../imgs/logo.png")}
          ></Image>

          <Text
            style={{
              color: "orange",
              padding: 10,
              fontSize: 18,
              textAlign: "center",
              top: hp(14),
              alignItems: "center",
              alignSelf: "center",
              width: wp(95),
              position: "absolute",
              fontFamily: "Prompt-Bold"
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View style={{ backgroundColor: "#F06823", height: "4%", top: 5 }} />

          <View style={{ flex: 1, margin: 5, top: 5 }}>
          <FlatList
        data={formatData(this.state.dataGetAlbum, numColumns)}
        //style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
            <Modal
              animationType={"fade"}
              transparent={false}
              style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
              visible={this.state.modalVisible}
              isVisible={false}
              onRequestClose={() => {
                console.log("Modal has been closed.");
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  borderColor: "rgba(0,0,0,0.5)",
                  //padding: 100,
                  justifyContent: "center",
                  borderRadius: 15
                }}
              >
                {/* <Text style={{
                  color: '#3f2949',
                  marginTop: 10
                }}>Modal is open!</Text> */}

                <Image
                  resizeMode="contain"
                  style={{
                    height: 500,
                    width: "98%",
                    borderWidth: 1,
                    borderColor: "gray",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 25,
                    resizeMode: "stretch"
                  }}
                  source={{ uri: this.state.selected }}
                ></Image>

                <TouchableHighlight
                  onPress={() => {
                    this.toggleModal(!this.state.modalVisible);
                  }}
                >
                  <Text
                    style={{
                      color: "#3f2949",
                      fontSize: 15,
                      textAlign: "right",
                      alignItems: "flex-end",
                      fontFamily: "Prompt-Bold"
                    }}
                  >
                    CLOSE
                  </Text>
                </TouchableHighlight>
              </View>
            </Modal>

            {/* <TouchableOpacity
          style={styles.ButtonStyle}
          activeOpacity={.5}
          onPress={this.ChangeGridValueFunction} >

          <Text style={styles.ButtonInsideTextStyle}> {this.state.ButtonDefaultText} </Text>

        </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styl = StyleSheet.create({
  textSecond: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 300
  },
  rect: {
    backgroundColor: "#F06823",
    height: "11%"
  },
  MainContainer: {
    // Setting up View inside content in Vertically center.
    justifyContent: "center",
    flex: 1,
    margin: 10
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  ImageComponentStyle: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    height: 130,
    backgroundColor: "#4CAF50"
  },
  
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    // height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
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
)(GalleryDetail);

// export default GalleryDetail;