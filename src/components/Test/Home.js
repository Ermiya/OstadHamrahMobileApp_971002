import React, { Component } from 'react';
import { form } from './Home.css';
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
import { AsyncStorage, FlatList ,View } from 'react-native';
import Product from './Product';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      //page: 1,
      loaded: false,
      refreshing: false,
      userToken : ''
    }
  }

  componentWillMount() {
    const userToken = AsyncStorage.getItem('UserToken');
    this.setState({ userToken : userToken },()=> {
      console.log('Page : Home,Api Token : '+userToken);
      this.getProducts();
    });
  }

  renderItem({ item }) {
    // console.log(item);
    return <Product product={item} />
  }

  async getProducts() {
    //const { page } = this.state;
    try {
    const result = await fetch(`http://5.160.65.115/api/lesson?Token=${this.state.userToken}`);
    console.log('user token : ');
    console.log(this.state.userToken);
    console.log(result);
    const json = await result.json();
    let products = json.data;
    this.setState({
      products: products,
      refreshing: false,
    });
    // if (products.length > 0) {
    //   console.log(page, json);
    //   this.setState(prevState => ({
    //     products: prevState.page === 2 ? products : [...prevState.products, ...products],
    //     page: json.data.current_page,
    //     refreshing: false,
    //   }));
    // }
    //this.setState({ loaded: false });
    } catch(error) {
      console.log(error);
    }
  }

  // handleLoadMore() {
  //   if (this.state.products.length >= 6) {
  //     console.log('loadMore run'+this.state.page);
  //     this.setState({
  //       page: this.state.page + 1,
  //       loaded: true,
  //     }, () => this.getProducts());
  //   }
  // }

  // handleFooter() {
  //   if (!this.state.loaded) {
  //     return null;
  //   }

  //   return <Spinner />
  // }

  handleRefresh() {
    //this.setState({ page: 2, refreshing: true }, () => this.getProducts());
    this.setState({ refreshing: true }, () => this.getProducts());
  }

  render() {
    return (
      <Container>
                <Header style={{ backgroundColor : '#34495e'}} androidStatusBarColor="#2c3e50" iosBarStyle="light-content">
                    <Left>
                        <Icon name="md-menu" onPress={() => Actions.drawerOpen() } style={{ color : 'white' , fontWeight : 500 }}/>
                    </Left>
                    <Right>
                        <Text style={{ fontFamily : 'IRANSansMobile' , color: 'white'}}>صفحه اصلی</Text>
                    </Right>
                </Header>
            <FlatList
              data={this.state.products}
              renderItem={this.renderItem}
              keyExtractor={item => item.LessonId.toString()}
              ListEmptyComponent={() => <Spinner />}
              //onEndReached={this.handleLoadMore.bind(this)}
              //onEndReachedThreshold={0.5}
              //ListFooterComponent={this.handleFooter.bind(this)}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh.bind(this)}
              //initialNumToRender={1}
            />
       
       </Container>
    );
  }
}
