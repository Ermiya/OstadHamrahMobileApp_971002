import React, { Component } from 'react';
import { form } from './EventList.css';
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
import Event from './Event';
import * as Common from '../../Common';
import * as OHApi from '../../OHApi';

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      page: 1,
      loaded: false,
      refreshing: false,
      userToken:''
    }
  }

   componentWillMount() {
       console.log('EventList getUserToken AsyncStorage : ' + AsyncStorage.getItem('UserToken'));

    //console.log(await this.getEvents());

    AsyncStorage.getItem('User_Token').then((userToken) => {
      console.log('EventList getUserToken AsyncStorage 2: ');
       console.log(userToken);
       if (userToken !== null) {
         this.setState({ userToken:userToken },()=> {
          this.getEvents();
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

  renderItem({ item }) {
    return <Event event={item} />
  }

  async getEvents() {
    // const { page } = this.state;
    // try {
    // const result = await fetch(`http://roocket.org/api/products?page=${page}`);
    // console.log(result);
    // const json = await result.json();
    // let videoes = json.data.data;

    // if (products.length > 0) {
    //   console.log(page, json);
    //   this.setState(prevState => ({
    //     products: prevState.page === 1 ? videoes : [...prevState.videoes, ...videoes],
    //     page: json.data.current_page,
    //     refreshing: false,
    //   }));
    // }
    // this.setState({ loaded: false });
    // } catch(error) {
    //   console.log(error);
    // }
    const { page } = this.state;
    console.log(page);

      console.log('test debug 222'); 
      console.log(AsyncStorage.getItem('User_Token'));
      console.log(this.state.userToken);
      
     const response = await OHApi.getEventList2(this.state.userToken);
      //const response = await OHApi.getEventList2(userToken);

     console.log('getEventList length : ');
      console.log(response.length);

    if(response.length > 0) {
    this.setState({
      events :response
    });
  }
  else
  {
    this.setState({
      events :[
             { 
               Id : 1,
               ImgUrl : 'e',
               Title:'رویدادی وجود ندارد',
               updated_at : '2016-05-02T00:00:00',
               Description : 'رویدادی وجود ندارد'        
             }
      ]
    });
  }
      console.log('this.state.events');

    console.log(this.state.events);
    // this.setState({
    //   events:[
    //     { 
    //       Id : 1,
    //       ImgUrl : 'http://5.160.65.115/Resource/Img/Event/8ac69a28-17c2-455f-b710-48979d95a5d2.jpg',
    //       Title:'مدیریت یا رهبری',
    //       updated_at : '2016-05-02T00:00:00',
    //       Description : 'مشتریان در حالت سنتی به تعداد نفرات کمی دسترسی داشتند ولی با تکیه بر گروه ها و کانال ها در شبکه های اجتماعی، هر نفر ممکن است به راحتی صدای اعتراضش به میلیون ها نفر برسد.'        
    //     },
    //     { 
    //       Id : 2,
    //       ImgUrl : 'http://5.160.65.115/Resource/Img/Event/efbd7332-5c5b-4538-9cd8-34abbc98ffad.jpg',
    //       Title:'عناصربرند ، نام برند',
    //       updated_at : '2018-10-02T00:00:00',
    //       Description : 'نام برند یکی از انتخاب­ های بنیادین است، زیرا اغلب، نقش اصلی را در میان عناصر برند بازی می­کند و تداعیات ذهنی قدرتمندی را در زمینه ­ی محصول به صورت فشرده ، مختصر و مفید ارائه می دارد. نام­ها در زمره­ ی موثرترین ابزارهای ارتباط برند با مخاطبان به شمار می ­آیند . آگهی­ های تبلیغاتی معمولاً حداکثر به مدت پنجاه ثانیه نمایش داده می شوند، در حالی که مشتری­ها به سادگی تنها در مدت چند ثانیه نام برند را مورد توجه قرار می دهند و مفهوم آن را در ذهن ثبت می کنند یا آن را به حافظه­ ی خود می سپارند.'        
    //     },
    //     { 
    //       Id : 3,
    //       ImgUrl : 'http://ostadhamrah.com/wp-content/uploads/2017/05/%D9%82%DB%8C%D9%85%D8%AA-%DA%AF%D8%B0%D8%A7%D8%B1%DB%8C-%D8%A7%D8%B3%D9%86%D8%A7%D8%AF-788x365.jpg',
    //       Title:'قیمت گذاری',
    //       updated_at : '2018-08-02T00:00:00',
    //       Description : 'برای شما به عنوان تولید کننده بسیار ساده است که یک محصول را قیمت گذاری کنید تا این که چندین محصول را داشته باشید. زمانی که یک محصول تولید می شود، همه هزینه های ثابت که در تولیدی (کارخانه) اتفاق می افتد مربوط به همان تک محصول است. اما در حالتی که ما چندین محصول داریم، تاثیر هزینه های ثابت بین کالاهای مختلف باید به طور متناسب پخش شود.'        
    //     },
    //     { 
    //       Id : 4,
    //       ImgUrl : 'http://5.160.65.115/Resource/Img/Event/efbd7332-5c5b-4538-9cd8-34abbc98ffad.jpg',
          
    //       Title:'مزایای هدف',
    //       updated_at : '2018-10-10T00:00:00',
    //       Description : 'هدف گذاری؛ امکان تدوین شاخص­ها و معیارها و ارزیابی عملکرد را فراهم می­نماید . هدف گذاری؛ امکان مقایسه نتایج و پیامدها را فراهم می کند. هدف گذاری؛ انحراف در عملکرد ها و برنامه ها را مشخص می کند.'        
    //     }
    //   ]
    // });

  }

  handleLoadMore() {
    if (this.state.events.length >= 6) {
      console.log('loadMore run'+this.state.page);
      this.setState({
        page: this.state.page + 1,
        loaded: true,
      }, () => this.getEvents());
    }
  }

  handleFooter() {
    if (!this.state.loaded) {
      return null;
    }

    return <Spinner />
  }

  handleRefresh() {
    this.setState({ page: 1, refreshing: true }, () => this.getEvents());
  }

  render() {
    return (
      <Container>
                <Header style={{ backgroundColor : Common.BRAND_COLOR_3}} androidStatusBarColor={Common.BRAND_COLOR_3} iosBarStyle="light-content">
                    <Left />
                    <Right>
                        <Text style={{ fontFamily : 'IRANSansMobile' , color: Common.BRAND_COLOR_2}}>رویدادها</Text>
                    </Right>
                </Header>
            <FlatList
              data={this.state.events}
              renderItem={this.renderItem}
              keyExtractor={item => item.Id.toString()}
              ListEmptyComponent={() => <Spinner />}
              onEndReached={this.handleLoadMore.bind(this)}
              onEndReachedThreshold={0.5}
              ListFooterComponent={this.handleFooter.bind(this)}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh.bind(this)}
              initialNumToRender={1}
            />
       
       </Container>
    );
  }
}
