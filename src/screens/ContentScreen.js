import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import stringsoflanguages from './stringsoflanguages';
export default class second extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Title', 'Default Title'),
    };
  };
  componentDidMount() {
    var that = this;
    var heading = '';
    if (this.props.navigation.state.params.JSON_Clicked_Item == 'en') {
      heading = 'Selected Language English';
    } else if (
      this.props.navigation.state.params.JSON_Clicked_Item == 'th'
    ) {
      heading = 'Selected Language Thai';
    } 
    that.props.navigation.setParams({
      Title: heading,
    });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.text}> {stringsoflanguages.p1}</Text>
        <Text style={styles.text}> {stringsoflanguages.p2} </Text>
        <Text style={styles.text}> {stringsoflanguages.p3}</Text>
        <Text style={styles.text}> {stringsoflanguages.p4} </Text>
        <Text style={styles.text}> {stringsoflanguages.p5}</Text>
     
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  text: {
    color: '#191919',
    fontSize: 25,
    marginTop: 15
  },
});