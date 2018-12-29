import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  Dimensions
} from 'react-native';

import WebView from 'react-native-android-fullscreen-webview-video';

import {
  Container,
  Header,
  Left,
  Right,
  Button,
  //Icon,
  Body,
  Content,
} from 'native-base';

import Icon from 'react-native-ionicons'
import { Actions } from 'react-native-router-flux';

export default class PlayVideo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      canGoBack : false,
      width:  Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      embed_url : this.props.embed_url
    }
    console.log(`this.state.embed_url constructor PlayVideo is : ${this.state.embed_url}`);
  }

 onNavigationStateChange(navState) {
   console.log('onNavigationStateChange done ..');
  this.setState({
    canGoBack: navState.canGoBack
  });
}

onBack() {
  console.log('press back button done ..');
  Actions.pop();
}

  render() {
    return (
      <View style={ { flex : 1 } }>
          
        <View>
          <TouchableOpacity onPress ={this.onBack.bind(this)} >
             <Icon name="arrow-back"></Icon>
          </TouchableOpacity>
       </View>
          
          <WebView
            ref={ WEBVIEW_REF => this.webview  = WEBVIEW_REF }
            style={{ flex: 1,marginTop:20,height:this.state.height,width:this.state.width }}
            onNavigationStateChange= {this.onNavigationStateChange.bind(this)}
            source={{uri: this.state.embed_url }}
          /> 
      </View>
    );
  }
}