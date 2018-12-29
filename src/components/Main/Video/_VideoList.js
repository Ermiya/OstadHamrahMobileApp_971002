import React, { Component } from 'react';
import { form } from './VideoList.css';
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

export default class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoes: [],
      page: 1,
      loaded: false,
      refreshing: false,
      userToken: '',
    }
  }

  componentWillMount() {
    this.getVideoes();
  }

  renderItem({ item }) {
    return <Video video={item} />
  }

  async getVideoes() {
    this.setState({
      videoes: [
        {
          id: 1,
          image: 'http://ostadhamrah.com/wp-content/uploads/2017/04/2-4-1.jpg',
          videoUrl: 'https://kavimo.com/medias/yizx8yhyesyx/view',
          title: 'مدیریت یا رهبری',
          updated_at: '2016-05-02T00:00:00',
          body: 'مشتریان در حالت سنتی به تعداد نفرات کمی دسترسی داشتند ولی با تکیه بر گروه ها و کانال ها در شبکه های اجتماعی، هر نفر ممکن است به راحتی صدای اعتراضش به میلیون ها نفر برسد.',
        },
        {
          id: 2,
          image: 'http://ostadhamrah.com/wp-content/uploads/2017/05/network-788x365.jpg',
          videoUrl: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
          title: 'عناصربرند ، نام برند',
          updated_at: '2018-10-02T00:00:00',
          body: 'نام برند یکی از انتخاب­ های بنیادین است، زیرا اغلب، نقش اصلی را در میان عناصر برند بازی می­کند و تداعیات ذهنی قدرتمندی را در زمینه ­ی محصول به صورت فشرده ، مختصر و مفید ارائه می دارد. نام­ها در زمره­ ی موثرترین ابزارهای ارتباط برند با مخاطبان به شمار می ­آیند . آگهی­ های تبلیغاتی معمولاً حداکثر به مدت پنجاه ثانیه نمایش داده می شوند، در حالی که مشتری­ها به سادگی تنها در مدت چند ثانیه نام برند را مورد توجه قرار می دهند و مفهوم آن را در ذهن ثبت می کنند یا آن را به حافظه­ ی خود می سپارند.',
        },
        {
          id: 3,
          image: 'http://ostadhamrah.com/wp-content/uploads/2017/05/%D9%82%DB%8C%D9%85%D8%AA-%DA%AF%D8%B0%D8%A7%D8%B1%DB%8C-%D8%A7%D8%B3%D9%86%D8%A7%D8%AF-788x365.jpg',
          videoUrl: 'http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8',
          title: 'قیمت گذاری',
          updated_at: '2018-08-02T00:00:00',
          body: 'برای شما به عنوان تولید کننده بسیار ساده است که یک محصول را قیمت گذاری کنید تا این که چندین محصول را داشته باشید. زمانی که یک محصول تولید می شود، همه هزینه های ثابت که در تولیدی (کارخانه) اتفاق می افتد مربوط به همان تک محصول است. اما در حالتی که ما چندین محصول داریم، تاثیر هزینه های ثابت بین کالاهای مختلف باید به طور متناسب پخش شود.',
        },
        {
          id: 4,
          image: 'http://ostadhamrah.com/wp-content/uploads/2017/05/%D9%87%D8%AF%D9%81%DA%AF%D8%B0%D8%A7%D8%B1%DB%8C.jpg',
          videoUrl: 'http://www.streambox.fr/playlists/test_001/stream.m3u8',
          title: 'محاسن و مزایای هدف',
          updated_at: '2018-10-10T00:00:00',
          body: 'هدف گذاری؛ امکان تدوین شاخص­ها و معیارها و ارزیابی عملکرد را فراهم می­نماید . هدف گذاری؛ امکان مقایسه نتایج و پیامدها را فراهم می کند. هدف گذاری؛ انحراف در عملکرد ها و برنامه ها را مشخص می کند.',
        },
      ],
    });
  }

  handleLoadMore() {
    if (this.state.videoes.length >= 6) {
      console.log('loadMore run' + this.state.page);
      this.setState({
        page: this.state.page + 1,
        loaded: true,
      }, () => this.getVideoes());
    }
  }

  handleFooter() {
    if (!this.state.loaded) {
      return null;
    }

    return <Spinner />
  }

  handleRefresh() {
    this.setState({ page: 1, refreshing: true }, () => this.getVideoes());
  }

  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: Common.BRAND_COLOR_3 }}
          androidStatusBarColor={Common.BRAND_COLOR_3}
          iosBarStyle="light-content"
        >
          <Left />
          <Right>
            <Text
              style={{
                fontFamily: 'IRANSansMobile',
                color: Common.BRAND_COLOR_2,
              }}
            >
              ویدیوها
            </Text>
          </Right>
        </Header>
        <FlatList
          data={this.state.videoes}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => <Spinner />}
          // onEndReached={this.handleLoadMore.bind(this)}
          // onEndReachedThreshold={0.5}
          // ListFooterComponent={this.handleFooter.bind(this)}
          // refreshing={this.state.refreshing}
          // onRefresh={this.handleRefresh.bind(this)}
          // initialNumToRender={1}
        />
      </Container>
    );
  }
}
