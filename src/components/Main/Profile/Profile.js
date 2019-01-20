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
import * as OHApi from '../../OHApi';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      family: '',
      education: '',
      email: '',
      nationalCode: '',
      job: '',
      userToken: '',
    }
  }

  componentWillMount() {


    console.log(' getUserToken AsyncStorage : ' + AsyncStorage.getItem('UserToken'));

    //console.log(await this.getEvents());

    AsyncStorage.getItem('User_Token').then((userToken) => {
      console.log('userGet  getUserToken AsyncStorage 2: ');
      console.log(userToken);
      if (userToken !== null) {
        // this.setState({ userToken:userToken },()=> {
        this.setState({ userToken: userToken }, () => {
          OHApi.GetUserProfile(userToken);
          //console.log(this.state.events);
        });
      } else {
        Actions.reset('root');
      }
    }).catch((error) => {
      console.log('AsyncStorage catch AsyncStorage userToken : ');
      console.log(error);
      throw error;
    });
  }

  updateValue(text, field) {
    // console.warn(text);
    console.log(text);
    if (field == 'name') { this.setState({ name: text }) }
    else if (field == 'family') { this.setState({ family: text }) }
    else if (field == 'education') { this.setState({ education: text }) }
    else if (field == 'email') { this.setState({ email: text }) }
    else if (field == 'nationalCode') { this.setState({ nationalCode: text }) }
    else if (field == 'job') { this.setState({ job: text }) }
  }

  submit() {
    let collection = {};
    collection.name = this.state.name;
    collection.family = this.state.family;
    collection.education = this.state.education;
    collection.email = this.state.email;
    collection.nationalCode = this.state.nationalCode;
    collection.job = this.state.job;

    console.log(collection);



    AsyncStorage.getItem('User_Token').then((userToken) => {
      console.log('Update User getUserToken AsyncStorage 2: ');
      console.log(userToken);
      if (userToken !== null) {
          OHApi.UpdateUser(collection,userToken);
        
      } else {
        Actions.reset('root');
      }
    }).catch((error) => {
      console.log('AsyncStorage catch AsyncStorage userToken : ');
      console.log(error);
      throw error;
    });


  }
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
              <CheckBox checked={true} />
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

          <Tab style={styles.headerTabText} heading="مشخصات" >


            <Form>

              <Item fixedLabel >
                <Label />

                <Thumbnail large source={{ uri: 'http://ostadhamrah.com/wp-content/uploads/2017/04/g.jpg' }} />

              </Item>

              <Item fixedLabel>
                <Input style={styles.ItemInput}
                  onChangeText={(text) => this.updateValue(text, 'name')} >
                  <Text > سامان</Text>

                </Input>
                <Label>نام</Label>
              </Item>

              <Item fixedLabel>
                <Input style={styles.ItemInput}
                  onChangeText={(text) => this.updateValue(text, 'family')} >
                  <Text on> دریایی</Text>
                </Input>
                <Label> نام خانوادگی</Label>
              </Item>

              <Item fixedLabel>
                <Input style={styles.ItemInput}
                  onChangeText={(text) => this.updateValue(text, 'education')} >
                  <Text > نرم افزار </Text>
                </Input>
                <Label>رشته تحصیلی</Label>
              </Item>

              <Item fixedLabel>
                <Input style={styles.ItemInput}
                  onChangeText={(text) => this.updateValue(text, 'email')} >
                  <Text > Saman.Daryaie@gmail.com</Text>
                </Input>
                <Label style={styles.LableText}>ایمیل</Label>
              </Item>

              <Item fixedLabel>
                <Input style={styles.ItemInput}
                  onChangeText={(text) => this.updateValue(text, 'nationalCode')}  >
                  <Text > 0050067598</Text>
                </Input>
                <Label style={styles.LableText}>کد ملی</Label>
              </Item>

              <Item fixedLabel>
                <Input style={styles.ItemInput} onChangeText={(text) => this.updateValue(text, 'job')} >
                  <Text > مهندس نرم افزار</Text>
                </Input>
                <Label>شغل</Label>
              </Item>

            </Form>
            <Button block style={{ margin: 15, marginTop: 10 }} onPress={() => this.submit()}>
              <Text>ویرایش</Text>
            </Button>

          </Tab>

        </Tabs>


      </Container>
    );
  }
}
