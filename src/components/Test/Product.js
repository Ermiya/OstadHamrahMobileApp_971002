import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right,Body } from 'native-base';
import BuyProduct from './BuyProduct';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-jalaali';
//moment.loadPersian({ dialect : 'persian-modern' });

export default class Product extends Component {
  constructor(props) {
      super(props);
  }
  
  render() {
    const { product } = this.props;
    console.log(`product page , product : ${product}`);
    return (
      <Card style={{ flex: 0 }}>

        <CardItem>
          <Left />
          <Right>
            <Thumbnail source={{ uri: product.image }} />
            <Body>
              <Text style={{ fontFamily:'IRANSansMobile',fontSize:13 }}>{ product.title }</Text>
              {/* <Text note>{ moment(product.updated_at).format('jYYYY/jM/jD') }</Text> */}
              <Text note>{ moment(product.updated_at).fromNow() }</Text>
            </Body>
          </Right>
        </CardItem>

        <CardItem cardBody>
            <Image
              source={{ uri: product.image }}
              style={{ height: 200, width: null,flex: 1 }}
            />
        </CardItem>

        <CardItem>
            <Text numberOfLines={3}  style={{ fontFamily:'IRANSansMobile',fontSize:14 }}>
              { product.body }
            </Text>
        </CardItem>

        <CardItem>
          <Left>
            <Button style={{ height:30 }} onPress={()=>Actions.buyProduct({ product })} success>
              <Text style={{ fontFamily:'IRANSansMobile',fontSize:13 }}>خرید محصول</Text>
            </Button>
          </Left>
          <Right>
            <Text style={{ fontFamily:'IRANSansMobile',fontSize:13,color:'blue' }}>{product.price} تومان</Text>
          </Right>
        </CardItem>

      </Card>
    );
  }
}
