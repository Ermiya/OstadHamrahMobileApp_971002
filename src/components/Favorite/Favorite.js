import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  CheckBox,
  Thumbnail,
  Spinner,
} from 'native-base';
import styles from './Favorite.css';
import {
  Image,
  AsyncStorage,
  ScrollView,
  FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as OHApi from './../OHApi';
import Favorite_Item from './Favorite_Item';
import { showMessage, hideMessage } from "react-native-flash-message";

export default class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteList: [],
      userToken: this.props.userToken,
    };
  }

  async componentWillMount() {
    try {
      console.log('Favorite_Component getUserToken componentWillMount : ');
      console.log(this.state.userToken);
      if (this.state.userToken !== null) {
        const list = await OHApi.getFavoriteList(this.state.userToken);
        console.log('favoriteList : ');
        console.log(list);
        if (list.length > 0) {
          this.setState({ favoriteList: list });
        }
      } else {
        throw { message: 'بروز مشکل ، لطفا مجدد سعی نمایید' };
      }
    } catch (error) {
      console.log('favorite form componentWillMount : ');
      console.log(error);
      showMessage({
        description: 'بروز مشکل ، لطفا مجدد سعی نمایید',
        message: "بروز مشکل",
        type: "danger",
      });
      return;
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Icon active name="md-bookmark" style={styles.headerIcon} />
          </Left>
          <Right>
            <Text style={styles.headerText}>علاقه مندیها</Text>
          </Right>
        </Header>

        <Content style={styles.content}>
          <ScrollView>
            <FlatList
              data={this.state.favoriteList}
              renderItem={({ item, index }) => (
                <Favorite_Item
                  Id={item.Id}
                  Title={item.Title}
                  Icon={item.Icon}
                  Precedence={item.Precedence}
                  userToken={this.state.userToken}
                />)}
              keyExtractor={item => item.Id.toString()}
              ListEmptyComponent={() => <Spinner />}
            />
          </ScrollView>
        </Content>

        <Button full>
          <Text
            style={styles.buttonText}
            onPress={() => Actions.replace('tabbar')}
          >
            ادامه
          </Text>
        </Button>
      </Container>
    );
  }
}
