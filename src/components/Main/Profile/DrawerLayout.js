import React, { Component } from 'react';
import {
  View,
  Text,
  Item,
  Thumbnail,
} from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Common from '../../Common';

export default class DrawerLayout extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Common.BRAND_COLOR_3 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 15,
          }}
        >
          <Thumbnail
            source={require('./../../../assets/images/OHImageLogo-min.png')}
            style={{ width: "45%", height: 100 }}
          />
        </View>

        <Item
          style={{ padding: 10, justifyContent: "flex-end" }}
          onPress={() => Actions.replace('profile')}
        >
          <Text
            style={{
              fontFamily: "IRANSansMobile",
              marginRight: 10,
              color: Common.BRAND_COLOR_2,
            }}
          >
            پروفایل
          </Text>
          <Icon
            name="user-circle"
            size={30}
            color={Common.BRAND_COLOR_1}
          />
        </Item>

        <Item
          style={{ padding: 10, justifyContent: "flex-end" }}
          onPress={() => Actions.replace('faq')}
        >
          <Text
            style={{
              fontFamily: "IRANSansMobile",
              marginRight: 10,
              color: Common.BRAND_COLOR_2,
            }}
          >
            سوالات متداول
          </Text>
          <Icon
            name="question-circle"
            size={30}
            color={Common.BRAND_COLOR_1}
          />
        </Item>

        <Item
          style={{ padding: 10, justifyContent: "flex-end" }}
          onPress={() => Actions.replace('aboutUs')}
        >
          <Text
            style={{
              fontFamily: "IRANSansMobile",
              marginRight: 10,
              color: Common.BRAND_COLOR_2,
            }}
          >
            درباره ما
          </Text>
          <Icon
            name="info-circle"
            size={30}
            color={Common.BRAND_COLOR_1}
          />
        </Item>

        <Item
          style={{ padding: 10, justifyContent: "flex-end" }}
          onPress={() => Actions.replace('contactUs')}
        >
          <Text
            style={{
              fontFamily: "IRANSansMobile",
              marginRight: 10,
              color: Common.BRAND_COLOR_2,
            }}
          >
            تماس با ما
          </Text>
          <Icon name="at" size={30} color={Common.BRAND_COLOR_1} />
        </Item>
      </View>
    );
  }
}
