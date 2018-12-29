import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Right,
  Left,
  Content,
  Text,
  Card,
  Icon,
  CardItem,
  Body
 
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './FAQ.css';
import * as Common from '../../Common';


export default class FAQ extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs
          style={styles.header}
          androidStatusBarColor={Common.BRAND_COLOR_3}
          iosBarStyle="light-content"
        >
          <Left>
            <Icon
              name="md-menu"
              onPress={() => Actions.drawerOpen()}
              style={styles.icon}
            />
          </Left>
          <Right>
            <Text style={styles.headerText}>سوالات متداول </Text>
          </Right>
        </Header>


       

        <Content padder style={{ marginTop: 0 }}>


          <Card style={{ flex: 1 }}>
            <CardItem>

              <Body>
                <Text>
                  سوال 1
              </Text>
              </Body>


            </CardItem>
          </Card>
          <Card style={{ flex: 1 }}>
            <CardItem>
              <Body>
                <Text style={{  textAlign: 'right' }}>
                  پاسخ 1
              </Text>
              </Body>
            </CardItem>
          </Card>



          

        </Content>
      </Container>
    );
  }
}