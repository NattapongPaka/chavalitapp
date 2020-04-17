import React, { Component } from 'react'
import { Image,Text, View, TouchableHighlight } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export class Gallery_show extends Component {
    render() {
        var images = this.props.navigation.getParam("image");
        return (
            <View style={{ flex : 1 , justifyContent : 'center' , alignSelf : 'center'}}>
                <Image
                    style = {{ height : hp(50) , width : wp(97)}}
                    resizeMode = 'contain'
                    source={{uri: images}}
                />
                <TouchableHighlight onPress={() => { this.props.navigation.goBack() }}>
                  <Text style={{
                    color: '#3f2949',
                    fontSize: 18,
                    textAlign: 'center',
                    //alignItems: 'center',
                    fontFamily: 'Prompt-Bold'

                  }}>CLOSE</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default Gallery_show
