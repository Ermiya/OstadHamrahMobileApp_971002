import React, { Component } from 'react';
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
  Spinner,
  Item,
  Label,
  Input,
  Tab,
  Tabs,
  CheckBox,
  ListItem,
  Body,
  Thumbnail
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import styles from './Profile.css';
import * as Common from '../../Common';

export default class Profile extends Component {
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
            <Text style={styles.headerText}>پروفایل</Text>
          </Right>
        </Header>


        {/* <Tabs initialPage={1}  > */}
        <Tabs  >

          <Tab style={styles.headerTabText} heading="علاقه مندی ها">

            <ListItem>

              <Body>
                <Text style={styles.BodyText}>مدیریت</Text>
              </Body>
              <CheckBox  checked={true}/>
            </ListItem>

            <ListItem>
              <Body>
                <Text style={styles.BodyText}>اقتصادی</Text>
              </Body>
              <CheckBox checked={true} />
            </ListItem>

            <ListItem>
              <Body>
                <Text style={styles.BodyText}>فن آوری اطلاعات</Text>
              </Body>
              <CheckBox />
            </ListItem>

            <ListItem>
              <Body>
                <Text style={styles.BodyText}>فرهنگی</Text>
              </Body>
              <CheckBox />
            </ListItem>



          </Tab>
         
          <Tab  style={styles.headerTabText} heading="مشخصات" >


            <Form>

              <Item fixedLabel >
              <Label />
               
                <Thumbnail large source={{ uri: 'http://ostadhamrah.com/wp-content/uploads/2017/04/g.jpg' }} />
               
              </Item>

              <Item fixedLabel>
                <Input  style={styles.ItemInput}>
                  <Text > سامان</Text>
                </Input>
                <Label>نام</Label>
              </Item>

              <Item fixedLabel>
                <Input style={styles.ItemInput} >
                  <Text> دریایی</Text>
                </Input>
                <Label> نام خانوادگی</Label>
              </Item>

              <Item fixedLabel>
                <Input  style={styles.ItemInput}>
                  <Text > نرم افزار </Text>
                </Input>
                <Label>رشته تحصیلی</Label>
              </Item>

              <Item fixedLabel>
                <Input  style={styles.ItemInput}>
                  <Text > Saman.Daryaie@gmail.com</Text>
                </Input>
                <Label style={styles.LableText}>ایمیل</Label>
              </Item>
              
              <Item fixedLabel>
                <Input style={styles.ItemInput} >
                  <Text > 0050067598</Text>
                </Input>
                <Label style={styles.LableText}>کد ملی</Label>
              </Item>

               <Item fixedLabel>
                <Input style={styles.ItemInput} >
                  <Text > مهندس نرم افزار</Text>
                </Input>
                <Label>شغل</Label>
              </Item>

            </Form>
            <Button block style={{ margin: 15, marginTop: 10 }}>
              <Text>ویرایش</Text>
            </Button>

          </Tab>

        </Tabs>


      </Container>
    );
  }
}
