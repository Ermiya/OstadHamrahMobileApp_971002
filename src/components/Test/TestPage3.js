import React, { Component } from 'react';
import Video from 'react-native-video';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import PropTypes from 'prop-types';
import { I18nManager, WebView } from 'react-native';
import {
  Container,
  Header,
  Left,
  Icon,
  Right,
  Text,
  Spinner,
  Button,
} from 'native-base';
import * as OHApi from './../OHApi';
import * as axios from 'axios';
import * as Common from './../Common';

const BASE_KAVIMO_URL = 'https://kavimo.com/api/v1/';
const MEDIA_KAVIMO_URL = BASE_KAVIMO_URL + 'medias/?access-token=' + Common.KAVIMO_ACCESS_TOKEN;
const MEDIA_KAVIMO_URL_TEST = 'https://kavimo.com/temp/test';

export default class TestPage3 extends Component {
  
  constructor(props) {
    super(props);

    const decoded = jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjA5MTI3MTcwNjI3IiwibmFtZWlkIjoiMCIsInJvbGUiOiJBbm9ueW1vdXMiLCJuYmYiOjE1NDA2MzQxMTksImV4cCI6MTU3MjE3MDExOSwiaWF0IjoxNTQwNjM0MTE5LCJpc3MiOiJraW15YSIsImF1ZCI6Ik9zdGFkSGFtcmFoIn0.NmXLq9BgEsj14klX20KZqE00W28gx4ztWnfI2aO0DJQ');
    console.log('Test userToken Decode is : ' + decoded)
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          // ref={WEBVIEW_REF}
          style={{ flex: 1 }}
          // onNavigationStateChange= {this.onNavigationStateChange.bind(this)}
          source={{ uri: 'https://kavimo.com/medias/yizx8yhyesyx/view' }}
        />
      </View>
    );
  }
}
