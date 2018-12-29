import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-jalaali';
import * as Common from './../../Common';
import PodcastView from './PodcastView';




export default class Podcast extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    const { podcast } = this.props;
    console.log(`product page , product : ${podcast}`);
    return (

      // <Card style={{ flex: 0, backgroundColor: Common.BRAND_COLOR_1 }} bordered button onPress={() => Actions.push('PodcastView', { podcast })}>

      //   <CardItem >

      //     <Left>
      //       {/* <Thumbnail source={{ uri: event.ImgUrl }} /> */}

      //       <Body>

      //         <Text note>{moment(podcast.updated_at).fromNow()}</Text>
      //         {/* <Text note>{ moment(product.updated_at).format('jYYYY/jM/jD') }</Text> */}


      //       </Body>
      //     </Left>
      //     <Right>
      //       <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 18, fontWeight: 'bold' }}>
      //         {podcast.Title}

      //       </Text>
      //     </Right>
      //   </CardItem>

      //   <CardItem cardBody button onPress={() => Actions.push('PodcastView', { podcast })} >
      //     <Image
      //       source={{ uri: podcast.ImgUrl }}
      //       style={{ height: 100, width: 70, flex: 1 }}
      //     />
      //   </CardItem>

      //   {/* {<CardItem button onPress={() => Actions.push('EventView', { event })}>

      //     <Right>
      //       <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 18 , fontWeight:'bold' }}>
      //         {event.Title}
      //       </Text>
      //       </Right>

      //   </CardItem>} */}
      //   <Text></Text>


      // </Card>


      <Content>
        <List>
          <ListItem avatar >
            <Left>
          {/*<Text style={{ fontFamily: 'IRANSansMobile', fontSize: 8 ,height: 75   }} note>
          {moment(podcast.updated_at,'h:mm').fromNow()} 
          </Text> */}
        </Left> 
            <Body style={{ height: 75 }}>
              <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 18, fontWeight: 'bold' }}
                button onPress={() => Actions.push('PodcastView', { podcast })}>
                {podcast.Title}
              </Text>

            </Body>
            <Right transparent style={{ height: 75 }}>


              <Thumbnail source={{ uri: podcast.ImgUrl }} />
            </Right>
          </ListItem>
        </List>
      </Content>


    );
  }

}
