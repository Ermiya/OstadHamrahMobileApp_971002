import React, { Component } from 'react';
import { View,I18nManager,Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Router ,Scene ,Tabs ,Drawer,Stack } from 'react-native-router-flux';
import FlashMessage from "react-native-flash-message";
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import {setJSExceptionHandler,setNativeExceptionHandler} from 'react-native-exception-handler';
import * as Common from './src/components/Common';
import Splash from './src/components/Splash/Splash';
import Login from './src/components/Login/Login';
import Favorite from './src/components/Favorite/Favorite';
import AboutUs from './src/components/Main/AboutUs/AboutUs';
import ContactUs from './src/components/Main/ContactUs/ContactUs';
import Course from './src/components/Main/Course/Course';
import Event from     './src/components/Main/Event/Event';
import EventView from './src/components/Main/Event/EventView';
import EventList from './src/components/Main/Event/EventList';
import Podcast from './src/components/Main/Podcast/Podcast';
import PodcastView from './src/components/Main/Podcast/PodcastView';
import PodcastList from './src/components/Main/Podcast/PodcastList';
import FAQ from './src/components/Main/FAQ/FAQ';
import Profile from './src/components/Main/Profile/Profile';
import VideoList from './src/components/Main/Video/VideoList';
import PlayVideo from './src/components/Main/Video/PlayVideo';
import DrawerLayout from './src/components/Main/Profile/DrawerLayout';
import Icon from 'react-native-vector-icons/FontAwesome';

import testDeckSwiper from './src/components/Test/testDeckSwiper';

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
        'خطای غیرمنتظره رخ داده است',
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

        ما باید برنامه را مجددا راه اندازی کنیم.
        `,
      [{
        text: 'راه اندازی مجدد',
        onPress: () => {
          RNRestart.Restart();
        }
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler);
setNativeExceptionHandler((errorString) => {
    //You can do something like call an api to report to dev team here
    //...
    //...
   // When you call setNativeExceptionHandler, react-native-exception-handler sets a
   // Native Exception Handler popup which supports restart on error in case of android.
   // In case of iOS, it is not possible to restart the app programmatically, so we just show an error popup and close the app.
   // To customize the popup screen take a look at CUSTOMIZATION section.
    Alert.alert(
        'خطای غیرمنتظره رخ داده است',
        `
        Error: ${ errorString }

        ما باید برنامه را مجددا راه اندازی کنیم.
        `,
      [{
        text: 'راه اندازی مجدد',
        onPress: () => {
          RNRestart.Restart();
        }
      }]
    );
});

EStyleSheet.build();
//I18nManager.forceRTL(true);

type Props = {};

const MyTabIcon = ({selected,title}) => {
  return(
    //<Text style={{ color:selected?'red':'black' }} >{title}</Text>
    //<FontAwesomeIcon style={{ color:selected?'red':'black' }} icon="podcas" />
    <Icon name="camera" size={30} color="red" />
  );
}

export default class App extends Component<Props> {
   render() {
    return (
      <View style={{ flex:1 }}>

      <Router>

        <Scene hideNavBar>
          <Scene key="splash" component={Splash} title="Splash" />
          <Scene key="eventList" component={EventList} title="Event" />
          <Scene key="EventView" component={EventView} title="EventView" />
          <Scene key="PodcastList" component={PodcastList} title="PodcastList" />
          <Scene key="PodcastView" component={PodcastView} title="PodcastView" />

          <Scene key="testDeckSwiper" component={testDeckSwiper} title="testDeckSwiper" initial />

            <Scene key="login"     component={Login}     title="Login" />
            <Scene key="favorite"  component={Favorite}  title="favorite" />

          <Scene key="root" hideNavBar>
            <Drawer
              key="drawer"
              contentComponent ={ DrawerLayout }
              drawerPosition="right"
              drawerWidth={250}
              icon={ ({ tintColor }) => <Icon name="user" size={30} color={tintColor} /> }
              title="مشخصات من"
              titleStyle={{ fontFamily:'IRANSansMobile' }}
            >
                <Scene hideNavBar>
                <Scene hideNavBar>
                  <Scene key="profile" component={Profile} initial />
                  <Scene key="faq" component={FAQ} />
                  <Scene key="aboutUs" component={AboutUs} />
                  <Scene key="contactUs" component={ContactUs} />
                </Scene>

                 <Tabs
                  key="tabbar"
                  tabBarStyle={{ backgroundColor:Common.BRAND_COLOR_3,flexDirection:'row-reverse',paddingTop:5 }}
                  animationEnabled={true}
                  swipeEnabled={true}
                  tabBarPosition="bottom"
                  activeTintColor={ Common.BRAND_COLOR_1 }
                  inactiveTintColor= { Common.BRAND_COLOR_2 }
                >

            <Scene key="course" icon={ ({ tintColor }) => <Icon name="graduation-cap" size={30} color={tintColor} /> } title="دوره ها" titleStyle={{ fontFamily:'IRANSansMobile' }}>
               <Scene component={ Course } title="Course"/>
              </Scene>

              <Scene key="video" icon={ ({ tintColor }) => <Icon name="film" size={30} color={tintColor} /> } title="ویدیوها" titleStyle={{ fontFamily:'IRANSansMobile' }}  initial >
               <Scene key="videoList" component={ VideoList } hideNavBar initial />
               <Scene key="playVideo" component={PlayVideo} hideNavBar />
              </Scene>

              <Scene key="event" icon={ ({ tintColor }) => <Icon name="calendar" size={30} color={tintColor} /> } title="رخدادها" titleStyle={{ fontFamily:'IRANSansMobile' }} >
               <Scene component={EventList} title="Event" hideNavBar/>
              </Scene>

              <Scene key="PodcastList" icon={ ({ tintColor }) => <Icon name="podcast" size={30} color={tintColor} /> } title="پادکست" titleStyle={{ fontFamily:'IRANSansMobile' }} >
               <Scene component={PodcastList} title="PodcastList" hideNavBar/>
              </Scene>

            </Tabs>

            </Scene>
           </Drawer>

          </Scene>
        </Scene>
      </Router>

      <FlashMessage position="top"
                    icon="auto"
                    duration={3000}
                    style={{ flexDirection:'row',justifyContent:'space-between' }}
      />

      </View>
    );
  }
}
