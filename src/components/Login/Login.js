import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  AsyncStorage
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';
import * as OHApi from './../OHApi';
import { showMessage, hideMessage } from "react-native-flash-message";
import styles from './Login.css';
import { Actions } from 'react-native-router-flux';
import * as Common from './../Common';

const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 10;
const countryPickerCustomStyles = {};
let userAnonymusToken = '';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enterCode: false,
      spinner: false,
      country: {
        cca2: 'IR',
        callingCode: '98'
      },
      mobileNo:'',
      anonymusToken : ''
    };
  }
  //---------------------------------------------------------------------------------------------------------
  _getCode = async () => {
    this.setState({ spinner: true });
      try {
        const inputVal = this.refs.form.getValues();
        console.log(inputVal.phoneNumber.length);
        console.log('this.state.country : ');
        console.log(this.state.country);
        if( inputVal.phoneNumber.length < 10 ) {
         throw { message : 'شماره تلفن را کامل وارد نمائید' };
        }
        //---
        const fullMobileNo = this.state.country.callingCode+inputVal.phoneNumber;
        console.log('fullMobileNo : '+fullMobileNo);
        userAnonymusToken = await OHApi.getAuthenticateAnonymousToken(fullMobileNo);
        console.log('Anonymus Token : ');
        console.log(userAnonymusToken.Token);
        if ( userAnonymusToken.StatusCode !== 1 ) {
           switch (userAnonymusToken.StatusCode) {
            case -1://InputMismatch
              throw { message : 'عدم سازگاری ورودی کاربر' } ;
              break;
            case -2://KeyMismatch
              throw  { message : 'کلید برنامه اشتباه است' } ;
              break;
            case -3://UserUnregistered
              throw { message : 'کاربر نامعتبر است' } ;
              break;
            default:
              throw { message : 'مشکل در برقراری ارتباط' } ;
              break;
          }
        }
        //---
        const responseData = await OHApi.getVerifyCode(userAnonymusToken.Token,fullMobileNo);
        console.log(responseData);
        if (responseData.StatusCode !== 1) {
           switch (responseData.StatusCode) {
            case -1://InputMismatch
              throw { message : 'عدم سازگاری ورودی کاربر' } ;
              break;
            case -2://KeyMismatch
              throw  { message : 'کلید برنامه اشتباه است' } ;
              break;
            case -3://UserUnregistered
              throw { message : 'کاربر نامعتبر است' } ;
              break;
            default:
              throw { message : 'مشکل در برقراری ارتباط' } ;
              break;
          }
        }
        console.log('VerifyCode : '+responseData.VerifyCode);
        this.setState({
          spinner: false,
          enterCode: true,
          verification: responseData.VerifyCode,
          anonymusToken:userAnonymusToken.Token
        });
        this.refs.form.refs.textInput.setNativeProps({ text: '' });
          this.setState( { spinner: false },
            ()=>  {
                    showMessage({ 
                      description: "کد تایید برای شما باموفقیت ارسال شد",
                      message: "ارسال موفق", 
                      type: "success"
                    }) ;
                    this.refs.form.refs.textInput.focus();
                    this.setState({ mobileNo : fullMobileNo });
                  }
          );
      } catch (error) {
          //"success"(green), "warning" (orange), "danger" (red), "info" (blue) and "default" (gray).
          this.setState( { spinner: false },
          ()=>  showMessage({ 
                              description: error.message,
                              message: "بروز مشکل", 
                              type: "danger"
                            }) 
        );
      }
  }
  //--------------------------------------------------------------------------------------------------
  _verifyCode = async () => {
    this.setState({ spinner: true });
      try {
        this.refs.form.refs.textInput.blur();
        const inputVal = this.refs.form.getValues();
        const code = inputVal.code;
        console.log('inputVal code : '+code);
        console.log('this.state.verification : '+this.state.verification);
        if(code.length < 6) {
          throw { message : 'کد تایید را کامل وارد کنید' }
        }
        if(code === this.state.verification ) {
             this._getUserToken(this.state.anonymusToken,this.state.mobileNo)
                                   .then((userToken)=>{
                                                  console.log('asyncStorage userToken before add : ');
                                                  console.log(userToken);                                   

                                                       AsyncStorage.setItem('User_Token',JSON.stringify(userToken))
                                                       .then(()=>{
                                                             this.setState({ spinner: false },()=> {
                                                             showMessage({ 
                                                             description: "شما شماره تلفن خود را با موفقیت تایید کرده اید",
                                                             message: "تایید موفق", 
                                                             type: "success"
                                                       });
                                                       Actions.replace('favorite',{userToken});
                                                      });
                                                       })
                                                       .catch((error)=>{
                                                           console.log('Login_Component catch _storeUserToken : ');
                                                           console.log(error);
                                                           throw error;
                                                       })
                                             
                                   })
                                   .catch((error)=> {
                                     this.setState({ spinner: false },()=>{
                                        showMessage({ 
                                           description: error.message,
                                           message: "بروز مشکل", 
                                           type: "danger"
                                         });
                                        return;
                                     });
                                   });
             
        } else {
             this.setState( { spinner: false },()=>  showMessage({ 
                                                                description: "کد تایید اشتباه است",
                                                                message: "بروز مشکل", 
                                                                type: "danger"
                                                              }) 
                          );
        }
      } catch (error) {
         console.log('Login_Component catch _verifyCode methode : ');
         console.log(error);
         this.setState( { spinner: false },()=>  showMessage({ 
                                                                description: error.message,
                                                                message: "بروز مشکل", 
                                                                type: "danger"
                                                              }) 
                       );
      }
  }
//-------------------------------------------------------------
 _getUserAnonymusToken = async (mobileNo) => {
   try {
   let responseData = await OHApi.getAuthenticateAnonymousToken(mobileNo);
   console.log('Anonymous verification response : ');
   console.log(responseData);
   if (responseData.StatusCode !== 1) {
      switch (responseData.StatusCode) {
       case -1://InputMismatch
         throw { message : 'عدم سازگاری ورودی کاربر' } ;
         break;
       case -2://KeyMismatch
         throw  { message : 'کلید برنامه اشتباه است' } ;
         break;
       case -3://UserUnregistered
         throw { message : 'کاربر نامعتبر است' } ;
         break;
       default:
         throw { message : 'مشکل در برقراری ارتباط' } ;
         break;
     }
   }
   let anonimousToken = responseData.Token;
   console.log('anonimousToken : ');
   console.log(anonimousToken);
   return anonimousToken;

   } catch (error) {
      console.log('Login_Component catch _getUserAnonymusToken method : ');
      console.log(error);
      throw error;
   }
 }  
//-------------------------------------------------------------
  _getUserToken = async (userAnonymusToken,mobileNo) => {
   try {
   let responseData = await OHApi.getAuthenticateToken(userAnonymusToken,mobileNo);
   console.log('user token response : ');
   console.log(responseData);
   if (responseData.StatusCode !== 1) {
      switch (responseData.StatusCode) {
       case -1://InputMismatch
         throw { message : 'عدم سازگاری ورودی کاربر' } ;
         break;
       case -2://KeyMismatch
         throw  { message : 'کلید برنامه اشتباه است' } ;
         break;
       case -3://UserUnregistered
         throw { message : 'کاربر نامعتبر است' } ;
         break;
       default:
         throw { message : 'مشکل در برقراری ارتباط' } ;
         break;
     }
   }
   let userToken = responseData.Token;
   console.log('userToken : ');
   console.log(userToken);
   return userToken;

   } catch (error) {
      console.log('Login_Component catch _getUserAnonymusToken method : ');
      console.log(error);
      throw error;
   }
 }  
//-------------------------------------------------------------
  _onChangeText = (val) => {
    if (!this.state.enterCode) return;
    if (val.length === MAX_LENGTH_CODE)
        this._verifyCode();
  }
//------------------------------------------------------------
  _tryAgain = () => {
    this.setState({ enterCode: false },()=>{
      this.refs.form.refs.textInput.setNativeProps({ text: this.refs.form.getValues().phoneNumber });
      this.refs.form.refs.textInput.focus();
    });
  }
//-------------------------------------------------------------
  _getSubmitAction = () => {
    this.state.enterCode ? this._verifyCode() : this._getCode();
  }
//-------------------------------------------------------------
  _changeCountry = (country) => {
    this.setState({ country });
    this.refs.form.refs.textInput.focus();
  }
//-------------------------------------------------------------
  _renderFooter = () => {
    if (this.state.enterCode)
      return (
        <View>
          <TouchableOpacity style={styles.tryAgainbutton} onPress={this._tryAgain}>
            <Text style={styles.buttonText}>ارسال کد تایید جدید</Text>
          </TouchableOpacity>
        </View>
      );

    return (
      <View>
        <Text style={styles.disclaimerText}>با لمس «ارسال کد تأیید» بالا، ما یک پیام کوتاه برای تایید شماره تلفن خود به شما ارسال میکنیم.</Text>
      </View>
    );
  }
//--------------------------------------------------------------
  _renderCountryPicker = () => {
    if (this.state.enterCode)
      return (
        <View />
      );

    return (
      <CountryPicker
        ref={'countryPicker'}
        closeable
        filterable
        filterPlaceholder="نام کشور"
        transparent={true}
        showCallingCode={true}
        style={styles.countryPicker}
        onChange={this._changeCountry}
        cca2={this.state.country.cca2}
        styles={countryPickerCustomStyles}
        translation='eng'/>
    );
  }
//--------------------------------------------------------------------
  _renderCallingCode = () => {
    if (this.state.enterCode)
      return (
        <View />
      );

    return (
      <View style={styles.callingCodeView}>
        <Text style={styles.callingCodeText}>+{this.state.country.callingCode}</Text>
      </View>
    );

  }
//---------------------------------------------------------------------
  render() {
    let headerText = `${this.state.enterCode ? 'کد تایید' : 'شماره تلفن'} شما چیست ؟`
    let buttonText = this.state.enterCode ? 'تایید کد ارسال شده' : 'ارسال کد تایید';
    let textStyle = this.state.enterCode ? {
      height: 50,
      textAlign: 'center',
      fontFamily:'IRANSansMobile(FaNum)',
      fontSize:34
    } : {};

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{headerText}</Text>
        <Form ref={'form'} style={styles.form} >
          <View style={{ flexDirection: 'row' }}>
            
            {this._renderCountryPicker()}
            {this._renderCallingCode()}
            
            <TextInput
              ref={'textInput'}
              name={this.state.enterCode ? 'code' : 'phoneNumber' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this._onChangeText}
              placeholder={this.state.enterCode ? '_ _ _ _ _ _' : ''}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              style={[ styles.textInput, textStyle ]}
              returnKeyType='go'
              autoFocus
              placeholderTextColor={Common.BRAND_COLOR_1}
              selectionColor={Common.BRAND_COLOR_1}
              maxLength={this.state.enterCode ? MAX_LENGTH_CODE : MAX_LENGTH_NUMBER}
              onSubmitEditing={this._getSubmitAction}
           />
          </View>

          <TouchableOpacity style={styles.button} onPress={this._getSubmitAction}>
            <Text style={styles.buttonText}>{ buttonText }</Text>
          </TouchableOpacity>

          {this._renderFooter()}

        </Form>

        <Spinner
          visible={this.state.spinner}
          textContent={'لطفا منتظر باشید ...'}
          textStyle={{ color: '#fff',fontFamily:'IRANMobileSans',fontSize:20 }} />
      
      </View>
    );
  }
}
