import React, { Component } from 'react';
import Video from 'react-native-video';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import PropTypes from 'prop-types';
import { I18nManager } from 'react-native';
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

import WebView from 'react-native-android-fullscreen-webview-video';
// import Stream from 'react-native-video-stream';

const Frisbee = require('frisbee');

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
const BASE_KAVIMO_URL = 'https://kavimo.com/api/v1/';
const MEDIA_KAVIMO_URL = BASE_KAVIMO_URL + 'medias/?access-token=' + Common.KAVIMO_ACCESS_TOKEN;
const MEDIA_KAVIMO_URL_TEST = 'https://kavimo.com/temp/test';


export default class TestVideo extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     manifestUrl: '',
  //     thumbnail: null,
  //     videoScript: '',
  //     embed_url: '',
  //     canGoBack : false
  //   }
  // }

  //async componentWillMount() {
    //  const kavimoAuthStatus = OHApi.getKavimoAuthenticate()
    //  .then( (kavimoAuthJson )=>{
    //    if(!kavimoAuthJson.success) {
    //      console.log(kavimoAuthJson);
    //      return;
    //    }


    // OHApi.getKavimoMedia('s1atj36l9jhp')
    //   .then((kavimoMediaJson) => {
    //     console.log('kavimoMediaJson geted : ');
    //     console.log(kavimoMediaJson);
    //     if (!kavimoMediaJson.success || kavimoMediaJson.response === 'no_result') {
    //       console.log(kavimoMediaJson);
    //       return;
    //     }
    //     console.log('manifest url get : ');
    //     console.log(kavimoMediaJson.response[0].manifest);
    //     this.setState({
    //       manifestUrl: kavimoMediaJson.response[0].manifest,
    //       videoScript: kavimoMediaJson.response[0].embed_script,
    //     }, () => {
    //       console.log('this.state.manifestUrl : ' + this.state.manifestUrl);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('TestVideo OHApi.getKavimoMedia error : ');
    //     console.log(error);
    //   });


    //  })
    //  .catch((error)=>{
    //    console.log('TestVideo OHApi.getKavimoAuthenticate error : ');
    //    console.log(error);
    //  });


    // axios.post(MEDIA_KAVIMO_URL,
    // {
    //   media_id: 's1atj36l9jhp',
    // },
    // {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'HTTP_REFERER': 'http://www.ostadhamrah.com',
    //     'HTTP_USER_AGENT': 'MY-UA-STRING',
    //     'HTTP_ACCEPT_LANGUAGE': 'fa-ir'
    //   },
    // })
    //   .then((response) => {
    //     setTimeout(() => {

    //     },4000);

    //       console.log('getKavimoMedia json : ');
    //        console.log(response);
    //        this.setState({ manifestUrl : response.data.response[0].manifest,
    //                        videoScript: response.data.response[0].embed_script,
    //                        embed_url:response.data.response[0].embed_url},()=>{
    //        console.log('this.state.manifestUrl : ' + this.state.manifestUrl );
    //        console.log('this.state.videoScript : ' + this.state.videoScript );
    //        console.log('this.state.embed_url   : ' + this.state.embed_url );
    //        });
    //     //return response;
    //   })
    //   .catch((error) => {
    //     console.log('OHApi_Component catch getAuthenticateToken method : ');
    //     console.log(error);
    //     throw error;
    //   });


  // var xhr = new XMLHttpRequest();
  // xhr.addEventListener("readystatechange", function () {
  //   if (this.readyState === 4) {
  //         console.log(this.responseText);

  //         //  this.setState({ manifestUrl : response.data.response[0].manifest,videoScript: response.data.response[0].embed_script,embed_url:response.data.response[0].embed_url},()=>{
  //         //  console.log('this.state.manifestUrl : ' + this.state.manifestUrl );
  //         //  console.log('this.state.videoScript : ' + this.state.videoScript );
  //         //  console.log('this.state.embed_url : ' + this.state.embed_url );
  //   // });

  //   }
  // });
  // xhr.open("POST", Common.MEDIA_KAVIMO_URL);
  // xhr.send(JSON.stringify({"media_id":"s1atj36l9jhp"}));


    // const api = new Frisbee({ baseURI: MEDIA_KAVIMO_URL });

    // const res = await api.post(MEDIA_KAVIMO_URL,
    //  {
    //     headers: { 'Accept': 'application/json',
    //                'Content-Type': 'application/json',
    //                'HTTP_REFERER': 'http://www.ostadhamrah.com',
    //                'HTTP_USER_AGENT': 'MY-UA-STRING',
    //                'HTTP_ACCEPT_LANGUAGE': 'fa-ir' },
    //     body:{ media_id: 'cemyy9gyfmsz' }
    //  });

    //  console.log('res  : ');
    //  console.log(res);

    //   this.setState({ manifestUrl : res.body.response[0].manifest },()=>{
    //        console.log('this.state.manifestUrl : '+this.state.manifestUrl );
    //   });
  //}

  // renderLoading() {
  //   return (
  //     <View
  //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //     >
  //       <Spinner />
  //     </View>
  //   )
  // }
//--------------------------------------
  // onNavigationStateChange(navState) {
  //     this.setState({
  //       canGoBack: navState.canGoBack
  //     });
  // }

  // onBack() {
  //     this.WEBVIEW_REF.goBack();
  // }

  render() {
    // let html = `
    //     <!DOCTYPE html>
    //     <html>
    //     <head>
    //     	<title>Page Title</title>
    //     </head>
    //     <body style="background-color:'#3498db'">
    //       ${this.state.videoScript}
    //     </body>
    //     </html>
    // `;

    // let html2 = `
    //   <!DOCTYPE html>
    //   <html>
    //   <body>

    //   <iframe src="https://www.aparat.com/video/video/embed/vt/frame/pid/0/showadstart/no/showvideo/yes/videohash/KGysS?data[as]=1" style="height:500px" >
    //     <p>Your browser does not support iframes.</p>
    //   </iframe>

    //   </body>
    //   </html>
    // `;
    // let jsCode = this.state.videoScript;

    return (
      <View style={{ flex: 1 }}>
        {/* <Video
          source={{
            uri: this.state.manifestUrl,
          }} // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }} // Store reference
          //onBuffer={this.onBuffer} // Callback when remote video is buffering
         // onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}

           headers={{
            'HTTP_REFERER': 'http://www.ostadhamrah.com',
            'HTTP_USER_AGENT': 'MY-UA-STRING',
            'HTTP_ACCEPT_LANGUAGE': 'fa-ir'
          }}
          bufferConfig={{
            minBufferMs: 10000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
          controls={true} // IOS
          muted={false} //All Platform
          paused={false} //All Platform
          playInBackground={false}//All Platform
          //poster="https://baconmockup.com/300/200/"//All Platform
          repeat={false}//All Platform
          ignoreSilentSwitch={"obey"} // IOS
        /> */}




        {/* <VideoPlayer
          // source = {{ uri : "https://kavimo.com/medias/cemyy9gyfmsz/7e3ce9644a12b0cb767ff21fe2b57212f236446d6bcfefa731382e39b0aeafaeOTPA/pl/aobWChFC12MmYjAR80xe_qVitQk59Y2N.m3u8" }}
          source={{
            uri: 'https://www.aparat.com/video/video/embed/vt/frame/pid/0/showadstart/no/showvideo/yes/videohash/KGysS?data[as]=1' //this.state.manifestUrl,
          }} // http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8      'https://kavimo.com/temp/test'
          // headers={{
          //   //'Authorization': 'bearer some-token-value',
          //   //'X-Custom-Header': 'some value',
          //   'HTTP_REFERER': 'http://www.ostadhamrah.com',
          //   'HTTP_USER_AGENT': 'MY-UA-STRING',
          //   'HTTP_ACCEPT_LANGUAGE': 'fa-ir'
          // }}

          // poster = { this.state.thumbnail }
          // posterResizeMode = "stretch"
          // navigator={ this.props.navigator }
          // controlTimeout={2000}
          // seekColor="#e67e22"
          // VideoStyle={{ position: 'absolute' }}
          // style={{ flexDirection: 'row-reverse' }}
        /> */}





        {/* <Stream
        started={false} // start your stream
        cameraFronted={true} // camera front or back
        url='http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8' // your rtmp publish url
        landscape={false} // landscape mode
        onReady={() => {}} // streaming ready
        onPending={() => {}} // streaming ready to start
        onStart={() => {}} // streaming start
        onError={() => {}} // straming error
        onStop={() => {}} // streaming stop
        /> */}




        {/* <WebView source={{
                          uri: 'http://roocket.org/api/product/buy',
                          method:'POST',
                          body:`product_id=${product.id}&api_token=${this.state.api_token}}`
                        }}
                        startInLoadingState={true}
                        renderLoading={this.renderLoading}
               /> */}





        {/* <WebView
              //originWhitelist={['*']}
              source={{ html: html }}
               startInLoadingState={true}
               renderLoading={this.renderLoading}
               javaScriptEnabled={true}
               domStorageEnabled={true}
               //injectedJavaScript={ this.state.videoScript}
      /> */}




        {/* <WebView
                style={styles.webView}
                ref="myWebView"
                //source={{ html: html }}
                // source={{ 
                //   uri:'https://www.aparat.com/video/video/embed/vt/frame/pid/0/showadstart/no/showvideo/yes/videohash/KGysS?data[as]=1' ,
                //   //uri:'https://www.aparat.com//video/video/embed/videohash/KGysS/vt/frame',
                //    method:'GET'
                // }}
                source={{ html : html2 }}
                //html={html}
                //injectedJavaScript={jsCode}
                javaScriptEnabledAndroid={true}
                javaScriptEnabled={true}
            >
        </WebView> */}





        {/* <WebView
          // source={{ uri: 'https://www.aparat.com/video/video/embed/vt/frame/pid/0/showadstart/no/showvideo/yes/videohash/KGysS?data[as]=1' }}
          source={{ uri: 'https://kavimo.com/medias/s1atj36l9jhp/view' }}
        /> */}
        {/* <TouchableOpacity
            disabled={!this.state.canGoBack}
            onPress={this.onBack.bind(this)}
        >
        <Text >Go Back</Text>
        </TouchableOpacity> */}

        
          <WebView
            //ref={WEBVIEW_REF}
            style={{flex: 1}}
            //onNavigationStateChange= {this.onNavigationStateChange.bind(this)}
           source={{uri: 'https://kavimo.com/medias/fld3b8gnkka0/view'}}
          /> 
        

      </View>
    );
  }

  }




// Later on in your styles..
// const styles = StyleSheet.create({
//   backgroundVideo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     flex:1
//   },
// });
