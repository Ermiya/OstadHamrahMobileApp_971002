import React, { Component } from 'react';

import {
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Thumbnail,
} from 'native-base';
import styles from './Favorite.css';
import * as OHApi from './../OHApi';
import { showMessage, hideMessage } from "react-native-flash-message";
import { AsyncStorage } from 'react-native';

export default class Favorite_Item extends Component {
  constructor(props) {
    super(props);
    const { Id, Title, Icon, Precedence,userToken } = this.props;
    this.state = {
      toggled: false,
      Id: Id,
      Title: Title,
      Icon: Icon,
      Precedence: Precedence,
      userToken : userToken
    };
  }

  componentWillMount() {
      console.log('favorite_item userToken is : '+this.state.userToken);
  }

  render() {
    return (
      <ListItem icon>
        <Left>
          <Switch
            onValueChange={async (value) => {
                try {
                console.log('switcher value :');
                console.log(value);
                
                this.setState({ toggled: value })
                let response = null;
                if(this.state.toggled === true) {
                  response = await OHApi.offUserFavorite(this.state.Id,this.state.userToken);
                } else{
                  response = await OHApi.onUserFavorite(this.state.Id,this.state.userToken);
                }

                console.log(response);

                if(response.StatusCode !== 1)
                    throw response.Message;

                } catch (error) {
                    console.log('Favorite_Item component catch offUserFavorite or onUserFavorite method : ');
                    console.log(error);
                    showMessage({ 
                      description: "بروز مشکل در ثبت علاقه مندی",
                      message: "بروز مشکل", 
                      type: "danger"
                    })
                 }
              }
            }
            value={this.state.toggled}
          />
        </Left>

        <Body style={styles.body}>
          <Text style={styles.text}> { this.state.Title } </Text>
        </Body>

        <Right>
          {/* <Thumbnail
            small
            source={{ uri: this.state.Icon }}
          /> */}
          <Icon name={ this.state.Icon } />
        </Right>
      </ListItem>
    );
  }
}
