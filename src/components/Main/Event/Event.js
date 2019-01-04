import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-jalaali';
import * as Common from './../../Common';
import EventView from './EventView';


export default class Event extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    const { event } = this.props;
    console.log(`product page , product : ${event}`);
    return (

      <Card style={{ flex: 0, backgroundColor: Common.BRAND_COLOR_1 }} bordered button onPress={() => Actions.push('EventView', { event })}>

        <CardItem >

          <Left>
            {/* <Thumbnail source={{ uri: event.ImgUrl }} /> */}

          

              <Text note>{moment(event.CreateDate).fromNow()}</Text>
              {/* <Text note>{ moment(product.updated_at).format('jYYYY/jM/jD') }</Text> */}


           
          </Left>
           
          <Right>
            <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 18, fontWeight: 'bold' }}>
              {event.Title}

            </Text>
          </Right>
        </CardItem>

        <CardItem cardBody button onPress={() => Actions.push('EventView', { event })} >
          <Image
            //source={{ uri: 'http://www.daneshgahhamrah.com/Resource/Img/Event/'+ event.ImgUrl }}
            source={{ uri:  event.ImgUrl }}
            style={{ height: 100, width: 70, flex: 1 }}
          />
        </CardItem>

        {/* {<CardItem button onPress={() => Actions.push('EventView', { event })}>

          <Right>
            <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 18 , fontWeight:'bold' }}>
              {event.Title}
            </Text>
            </Right>
           
        </CardItem>} */}
        <Text></Text>


      </Card>
    );
  }
}
