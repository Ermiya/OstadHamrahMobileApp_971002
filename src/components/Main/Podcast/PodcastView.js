import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-jalaali';
import * as Common from '../../Common';



export default class PodcastView extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

    // this.SeenEventByUser();
    console.log('Seen Podcast');

  }

  render() {
    const { podcast } = this.props;
    console.log(`product page , product : ${podcast}`);
    return (
      <Card style={{ flex: 0, backgroundColor: Common.BRAND_COLOR_1 }}>

        <CardItem>
          <Left >
            <Button style={{ height: 30, backgroundColor: Common.BRAND_COLOR_1 }}
              onPress={() => Actions.pop()}
              rounded>
              {/* <Text style={{ fontFamily:'IRANSansMobile',fontSize:13 }}>مشاهده </Text> */}
              <Icon name="arrow-round-back" size={40} color={Common.BRAND_COLOR_1} />
            </Button>
          </Left>
          <Right>
            {/* <Thumbnail source={{ uri: event.ImgUrl }} /> */}
            <Body>
              <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 13 }}>{podcast.Title}</Text>
              {/* <Text note>{ moment(product.updated_at).format('jYYYY/jM/jD') }</Text> */}
              <Text note>{moment(podcast.updated_at).fromNow()}</Text>
            </Body>
          </Right>
        </CardItem>

        <CardItem cardBody>
          <Image
            source={{ uri: podcast.ImgUrl }}
            style={{ height: 300, width: 150, flex: 2 }}
          />
        </CardItem>

        {<CardItem>
          <Left />
          <Right>
            <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 16 }}>
              {podcast.Title}

            </Text>

          </Right>
        </CardItem>}
        <Text></Text>

        {<CardItem>


          <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 13 }}>
            {podcast.Description}

          </Text>

        </CardItem>
        }

      </Card>
    );
  }
}
