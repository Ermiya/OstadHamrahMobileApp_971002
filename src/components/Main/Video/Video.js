import React, { Component } from 'react';
import { Image,TouchableOpacity,View,ImageBackground } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-jalaali';
import * as Common from './../../Common';
import { showMessage, hideMessage } from "react-native-flash-message";
import images from '../../../assets/images/allImage';
import * as OHApi from '../../OHApi';
import ReadMore from 'react-native-read-more-text';
import IonIcons from 'react-native-ionicons';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

export default class Video extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      media_id: '',
      embed_url: '',
      manifest: '',
      duration: '',
      view: '',
      title: '',
      description: '',
      createTime: '',
      updateTime: '',
      art_files: null,
      isLiked : this.props.video.IsLiked,
      likeCount : this.props.video.LikeCount
    }

    console.log(`Video constructor this.props.video.IsLiked : ${this.props.video.IsLiked}`);
    console.log(`Video constructor this.props.video.LikeCount : ${this.props.video.LikeCount}`);
  }
  //-----------------------
  async componentDidMount() {
    console.log('Video form componentDidMount started ');

    const { video,userToken } = this.props;
    try {
      const kavimoObj = await OHApi.getKavimoMedia(video.MediaId);
      console.log('kavimoObj : ');
      console.log(kavimoObj);
      if (kavimoObj.response !== 'no_result') {
        this.setState({
          media_id: kavimoObj.response[0].media_id,
          embed_url: kavimoObj.response[0].embed_url,
          manifest: kavimoObj.response[0].manifest,
          duration: kavimoObj.response[0].duration,
          view: kavimoObj.response[0].view,
          title: kavimoObj.response[0].title,
          description: kavimoObj.response[0].description,
          createTime: kavimoObj.response[0].createTime,
          updateTime: kavimoObj.response[0].updateTime,
          art_files: kavimoObj.response[0].art_files
        });

        console.log(`this.state.art_files.thumbnail : ${this.state.art_files}`);
        console.log(`this.state.embed_url : ${this.state.embed_url}`);
      } else {
        throw '';
      }
    } catch (error) {
      console.log('Video form componentDidMount : ');
      console.log(error);
      showMessage({
        description: 'بروز مشکل ، لطفا مجدد سعی نمایید',
        message: "بروز مشکل",
        type: "danger",
      });
      return;
    }
  }
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ marginTop: 5,color:'blue'}} onPress={handlePress}>
        ادامه ...
      </Text>
    );
  }

   _handleTextReady = () => {
    // ...
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ marginTop: 5,color:'blue'  }} onPress={handlePress}>
        خلاصه
      </Text>
    );
  }
  //-----------------------
  render() {
    const { video, userToken } = this.props;
    console.log(`Video page , video : ${video}`);
    return (
      <Card style={{ flex: 0, backgroundColor: Common.BRAND_COLOR_1 }}>
        <CardItem>
          <Left />
          <Right>
            <Thumbnail
              source={require('../../../assets/images/OHImageLogo-min.png')}
            />
          <Body>
             <Text
                style={{ fontFamily: 'IRANSansMobile', fontSize: 13 }}
              >
                { video.Title }
              </Text>

              <Text
                style={{ fontFamily: 'IRANSansMobile(FaNum)' }}
                note
              >
                { moment(this.state.updateTime).fromNow() }
              </Text>

              <Text
                style={{ fontFamily: 'IRANSansMobile(FaNum)' }}
                note
              >
                { `مدت زمان ${Common.secondsToHms(this.state.duration)}` }
              </Text>
            </Body>
          </Right>
        </CardItem>




        <CardItem cardBody>
           <TouchableOpacity style={{ flex:1 }} onPress={ () => Actions.push('playVideo', { embed_url: this.state.embed_url }) }  >
          <ImageBackground
            source={this.state.art_files !== null ? { uri: this.state.art_files.thumbnail } : require('../../../assets/images/noPicture.png')}
            style={{ height: 200, width: null, flex: 1,justifyContent:'center',alignItems:'center' }}
          >
            <View style={{ flex:1,justifyContent:'center',alignItems:'center',alignSelf:'stretch',backgroundColor:'rgba(0,0,0,0.4)' }}>
               <Thumbnail source={require('../../../assets/images/playVideo.png')} large style={{ backgroundColor:'transparent' }}/>
            </View>
          </ImageBackground>
          </TouchableOpacity>
        </CardItem>





        <CardItem>
           <Left>
            <Text  style={{ fontFamily: 'IRANSansMobile(FaNum)' }} note>
              { `${this.state.view} نفردیده اند` }
            </Text>
           </Left>

           <Right>
              <View style={{ flexDirection:'row' }}>
              <Text  style={{ fontFamily: 'IRANSansMobile(FaNum)' }} note> { this.state.likeCount } </Text>
              <TouchableOpacity onPress={ async ()=> {
                let apiName = "";
                    try {
                           if(this.state.isLiked) {
                            const likeCount = await OHApi.disLikeContent(video.LessonContentId,userToken);
                            console.log(`LikeCount : ${ likeCount }`);
                            this.setState({ isLiked: false,likeCount: likeCount });
                           } else {
                              const likeCount = await OHApi.likeContent(video.LessonContentId,userToken);
                              console.log(`LikeCount : ${likeCount}`);
                              this.setState({ isLiked: true,likeCount: likeCount });
                           }

                        } catch (error) {
                          console.log('Video form like/disLike : ');
                          console.log(error);
                          showMessage({
                            description: 'بروز مشکل ، لطفا مجدد سعی نمایید',
                            message: "بروز مشکل",
                            type: "danger"
                          });
                          return;
                        }
              }}>
                <Icon type="FontAwesome" name="heart" style={{ color:this.state.isLiked ? '#ff4d4d' : '#cccccc' }}/>
              </TouchableOpacity>
              </View>
           </Right>

        </CardItem>



        <CardItem>
          <Left />
             <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={this._renderTruncatedFooter}
                renderRevealedFooter={this._renderRevealedFooter}
                onReady={this._handleTextReady}
              >
                <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 13 }}>
                  { video.Description }
                </Text>
              </ReadMore>
        </CardItem>
      </Card>
    );
  }
  //-----------------------
}
