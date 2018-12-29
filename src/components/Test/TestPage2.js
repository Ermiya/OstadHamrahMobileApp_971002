import React, { Component } from 'react';
import { View, StyleSheet, Button, WebView } from 'react-native';
//import { Constants } from 'expo';


export default class TestPage2 extends Component {
constructor(props) {
    super(props);

    this.state={
        showWebView: false
    }
}

onNavigationStateChange = navState => {
//    if (navState.url.indexOf('https://www.google.com') === 0) {
//    const regex = /#access_token=(.+)/;
//    const accessToken = navState.url.match(regex)[1];
//    console.log(accessToken);
//  }
};

renderContent() {
 return (
   <WebView
     source={{
       uri: 'https://www.google.com',
    }}
   //  onNavigationStateChange={this.onNavigationStateChange}
     startInLoadingState
     scalesPageToFit
     javaScriptEnabled
     style={{ flex: 1 }}
   />
 );
}

render() {
 return (
   <View style={styles.container}>
     { this.state.showWebView && this.renderContent() }
     <Button
       //style={styles.paragraph}
       title="Login"
       onPress={() => this.setState({showWebView: true})}
     />
   </View>
 );
}
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   paddingTop: 10,//Constants.statusBarHeight,
   backgroundColor: '#ecf0f1',
 },
});