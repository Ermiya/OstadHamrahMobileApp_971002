import React, { Component } from 'react';
import styles from './VideoList.css';
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
import * as Common from './../../Common';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as OHApi from '../../OHApi';

export default class VideoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoes: [],
      page: 1,
      loaded: false,
      refreshing: false,
      courseId: props.CourseId === undefined ? null : props.CourseId,
      userToken: '',
      lastPage:0
    }

    console.log(`VideoList constructor this.state.courseId : ${this.state.courseId}`);
  }
  //------------------------
  componentDidMount() {
    AsyncStorage.getItem('User_Token').then((userToken) => {
      console.log('VideoList getUserToken AsyncStorage : ');
      console.log(userToken);
      if (userToken !== null) {
          this.setState({ userToken: userToken });
          console.log(`VideoList componentDidMount after this.setState userToken: userToken : ${userToken}`);
          this.getVideoes();
          console.log(`VideoList componentDidMount after this.getVideoes `);
      }
    }).catch((error) => {
      console.log('VideoList catch AsyncStorage userToken : ');
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
  async getVideoes() {
    const { page, courseId, userToken } = this.state;
     console.log(`page : ${page} courseId : ${courseId} userToken : ${userToken}`);
    try {
      console.log('before OHApi.getPagedVideoList ');
      const list = await OHApi.getPagedVideoList(userToken, page, courseId);
      console.log('after OHApi.getPagedVideoList ');
      console.log('videoList : ');
      console.log(list);
      if (list.LessonVideoPagedItems.length > 0) {
        this.setState(prevState => ({
          videoes: prevState.page === 1 ? list.LessonVideoPagedItems : [
            ...prevState.videoes,
            ...list.LessonVideoPagedItems,
          ],
          page: page,
          refreshing: false,
          lastPage : list.LastPage
        }));
      }
      this.setState({ loaded: false });
    } catch (error) {
      console.log('VideoList getVideoes method : ');
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
    if (this.state.videoes.length >= 6 && this.state.page <= this.state.lastPage) {
      console.log('loadMore run' + this.state.page);
      this.setState({
        page: this.state.page + 1,
        loaded: true,
      }, () => {
          this.getVideoes();
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
    this.setState({ page: 1, refreshing: true }, () => this.getVideoes());
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
              ویدیوها
            </Text>
          </Right>
        </Header>

        <FlatList
          data={this.state.videoes}
          renderItem={({ item, index }) => (
            <Video
              video={item}
              userToken={this.state.userToken}
            />)}
          keyExtractor={item => item.MediaId}
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
