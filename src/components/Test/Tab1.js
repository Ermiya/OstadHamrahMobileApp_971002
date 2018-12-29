import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
import TestPage from './TestPage';
import { Actions } from 'react-native-router-flux';

export default class Tab1 extends Component {

   
  render() {

     return (
      <Container>
        <Header />
        <Content>
          <Button onPress={ ()=> {
               console.log('button pressed ....');
               Actions.replace('testPage');
          }}>
            <Text>Click Me!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}