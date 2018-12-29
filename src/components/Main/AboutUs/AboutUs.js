import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {
  Container,
  Header,
  Right,
  Left,
  Content,
  Text,
  Icon,
  Card,
  CardItem,
  Body
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './AboutUs.css';
import * as Common from '../../Common';



export default class AboutUs extends Component {
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
            <Text style={styles.headerText}>درباره ما </Text>
          </Right>
        </Header>

        <Content>
          <Card style={{ flex: 0 }}>
            {/* <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem> */}
            <CardItem>
              <Body style={styles.BodyText}>
                <Image source={{ uri: 'http://ostadhamrah.com/wp-content/uploads/2017/05/shnasname.jpg' }} style={{ height: 240, width: 350, flex: 1 }} />
                <Text></Text>
                <Text style={styles.text}>
                 * دارای گواهی ثبت علامت تجاری 1391/191070167 قوه قضاییه
                </Text>
                <Text></Text>

                <Text style={styles.text}>
                 * دارای تاییدیه علمی 117ط/95/ت مرکز مطالعات استراتژیک دانشگاه تهران
                </Text>

                <Text></Text>
                <Text style={styles.text}>
                 * دارای تاییدیه علمی و کیفیت آموزشی 159/1745/415202 مرکز استراتژی و توسعه علوم
                </Text>
                <Text></Text>

                <Text style={styles.text}>
                *  دارای کد شامد(نماد اعتماد دیجیتال)  مرکز فناوری اطلاعات و رسانه های دیجیتال وزارت ارشاد و فرهنگ اسلامی 1-1-693347-65-4-2
                </Text>
                <Text></Text>

                <Text style={styles.text}>
                *  دارای شماره ی مجوز پروانه نمایش 162510/95/154 سازمان امور سینمایی وزارت فرهنگ و ارشاد اسلامی
                  </Text>

              </Body>
            </CardItem>
            {/* <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem> */}
          </Card>
        </Content>


      </Container>
    );
  }
}