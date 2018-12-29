import React, { Component } from 'react';
import {
  Animated,
  Easing,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import styles from './Splash.style';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

// import Login from './../Login/Login';

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.rotateAnimate = new Animated.Value(0);
    this.widthAnimate = new Animated.Value(0);
    this.heightAnimate = new Animated.Value(0);
  }

  componentWillMount() {
    this.animate();
    
    setTimeout(() => {
      //Actions.reset('root');
      AsyncStorage.getItem('User_Token').then((userToken) => {
      console.log('Splash_Component getUserToken AsyncStorage : ');
      console.log(userToken);
      if (userToken !== null) {
        Actions.replace('tabbar');
        //Actions.tabbar();
      } else {
        //Actions.reset('root');
         Actions.replace('login');
          //Actions.tabbar();
      }
    }).catch((error) => {
      console.log('Splash_Component catch AsyncStorage userToken : ');
      console.log(error);
      throw error;
    });
    }, 7000);
  }

  // componentDidMount() {
  //   AsyncStorage.getItem('UserToken').then((userToken) => {
  //     console.log('Splash_Component getUserToken AsyncStorage : ');
  //     console.log(userToken);
  //     if (userToken !== null) {
  //       Actions.reset('home');
  //     } else {
  //       Actions.reset('root');
  //     }
  //   }).catch((error) => {
  //     console.log('Splash_Component catch AsyncStorage userToken : ');
  //     console.log(error);
  //     throw error;
  //   });
  // }

  animate() {
    this.rotateAnimate.setValue(0);
    this.widthAnimate.setValue(0);
    this.heightAnimate.setValue(0);

    const timingMethod = (value, toValue, duration, Easing, delay = 0) =>
      Animated.timing(value, {
        toValue,
        duration,
        Easing,
        delay,
      });

    Animated.parallel([
      timingMethod(this.rotateAnimate, 1.5, 2000, 3000),
      timingMethod(this.widthAnimate, 130, 3000, 500),
      timingMethod(this.heightAnimate, 100, 3000, 500),
    ]).start();
  }

  render() {
    const rotate = this.rotateAnimate.interpolate({
      inputRange: [0, 1.5],
      outputRange: ['0deg', '360deg'],
    });

    const width = this.widthAnimate.interpolate({
      inputRange: [20, 130],
      outputRange: [20, 130],
    });

    const height = this.heightAnimate.interpolate({
      inputRange: [10, 100],
      outputRange: [10, 100],
    });

    return (

      <LinearGradient
        start={{ x: 0, y: 0 }}
        //colors={['#00BCD4', '#273c75', '#bdc3c7']}
        colors={['#bdc3c7', '#bdc3c7', '#bdc3c7']}
        style={styles.linearGradient}
      >
        <Animated.Image
          style={{ transform: [{ rotate }], width, height }}
          source={require('./../../assets/images/OHImageLogo-min.png')}
        />

        <Animatable.Image
          animation="slideInDown"
          iterationCount={3}
          direction="alternate"
          delay={200}
          source={require('./../../assets/images/OHTextLogo-min.png')}
          style={{ width: 180, height: 40, marginTop: 15 }}
          easing="ease-out-back"
        />
      </LinearGradient>

    );
  }
}
