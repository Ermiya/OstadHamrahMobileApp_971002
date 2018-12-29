import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Right,
  Left,
  Content,
  Button,
  Text,
  Form,
  Icon,
  Card,
  CardItem,
  Body
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './ContactUs.css';
import * as Common from '../../Common';



export default class ContactUs extends Component {
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
            <Text style={styles.headerText}>تماس با ما </Text>
          </Right>
        </Header>

        <Content padder style={{ marginTop: 0 }}>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Body>
                <Right>
                  <Text style={styles.text}>
                    آدرس :
                </Text>
                  <Text style={styles.text}>
                    تهران-میرداماد-ابتدای خ حصاری-مجتمع تجاری راز-طبقه دوم-واحد 16
              </Text>
                </Right>
              </Body>
            </CardItem>

             <CardItem>
              <Body>
               
                  <Text style={styles.text}>
                  تلفن|خط ویژه: 222541710-021    
                </Text>
                 
               
              </Body>
            </CardItem>
          </Card>
        </Content>

      </Container>
    );
  }
}