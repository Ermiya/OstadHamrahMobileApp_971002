import React, { Component } from 'react';
import styles from '../Video/VideoList.css';
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
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, FlatList, View } from 'react-native';
import Video from './Video';
import * as Common from '../../Common';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as OHApi from '../../OHApi';

export default class CourseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      page: 1,
      loaded: false,
      refreshing: false,
      userToken: '',
      lastPage:0
    }
  }
  //------------------------
  componentDidMount() {
    AsyncStorage.getItem('User_Token').then((userToken) => {
      console.log('CourseList getUserToken AsyncStorage : ');
      console.log(userToken);
      if (userToken !== null) {
          this.setState({ userToken: userToken });
          console.log(`CourseList componentDidMount after this.setState userToken: userToken : ${userToken}`);
          this.getCourses();
          console.log(`CourseList componentDidMount after this.getCourses `);
      }
    }).catch((error) => {
      console.log('CourseList catch AsyncStorage userToken : ');
      console.log(error);
      showMessage({
        description: 'بروز مشکل ، لطفا مجدد سعی نمایید',
        message: "بروز مشکل",
        type: "danger",
      });
      return;
    });
  }
 //-----------------------------
  async getCourses() {
    const { page, userToken } = this.state;
     console.log(`page : ${page} userToken : ${userToken}`);
    try {
      console.log('before OHApi.getPagedCourses ');
      const list = await OHApi.getPagedCourses(userToken, page);
      console.log('after OHApi.getPagedCourses ');
      console.log('courseList : ');
      console.log(list);
      if (list.ResultList.length > 0) {
        this.setState(prevState => ({
          videoes: prevState.page === 1 ? list.ResultList : [
            ...prevState.courses,
            ...list.ResultList,
          ],
          page: page,
          refreshing: false,
          lastPage : list.LastPage
        }));
      }
      this.setState({ loaded: false });
    } catch (error) {
      console.log('courseList getCourses method : ');
      console.log(error);
      showMessage({
        description: 'بروز مشکل ، لطفا مجدد سعی نمایید',
        message: "بروز مشکل",
        type: "danger",
      });
      return;
    }
  }
  //----------------------------------
  handleLoadMore() {
    if (this.state.courses.length >= 6 && this.state.page <= this.state.lastPage) {
      console.log('loadMore run courses' + this.state.page);
      this.setState({
        page: this.state.page + 1,
        loaded: true,
      }, () => {
          this.getCourses();
      });
    }
  }
  //------------------------------------
  handleFooter() {
    if (!this.state.loaded) {
      return null;
    }
    return <Spinner />
  }
  //------------------------------------
  handleRefresh() {
    this.setState({ page: 1, refreshing: true }, () => this.getCourses());
  }
  //------------------------------------
  render() {
    return (
      <Container>
        <Header
          style={styles.header}
          androidStatusBarColor={Common.BRAND_COLOR_3}
          iosBarStyle="light-content"
        >
          <Left />
          <Right>
            <Text style={styles.headerRightText} >
              دوره ها
            </Text>
          </Right>
        </Header>

        <FlatList
          data={this.state.courses}
          renderItem={({ item, index }) => (
            <Course
              course={item}
              userToken={this.state.userToken}
            />)}
          keyExtractor={item => item.Id}
          ListEmptyComponent={() => <Spinner />}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.8}
          ListFooterComponent={this.handleFooter.bind(this)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
          // initialNumToRender={1}
        />
      </Container>
    );
  }
}
