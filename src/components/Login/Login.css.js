import EStyleSheet from 'react-native-extended-stylesheet';
import * as Common from './../Common';

export default EStyleSheet.create({
  countryPicker: {
     alignItems: 'center',
     justifyContent: 'center'
  },
  container: {
    flex: 1,
    //backgroundColor:Common.BRAND_COLOR_1
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    fontFamily:'IRANSansMobile',
    margin: 20,
    color: '#4A4A4A',
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontFamily:'IRANSansMobile(FaNum)',
    fontSize:34,
    color: Common.BRAND_COLOR_3
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: Common.BRAND_COLOR_3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
   tryAgainbutton: {
    marginTop: 7,
    height: 50,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily:'IRANSansMobile',
    fontSize: 16
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    fontFamily:'IRANSansMobile',
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    fontFamily:'IRANSansMobile',
    color: 'grey'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 34,
    color: Common.BRAND_COLOR_3,
    fontFamily:'IRANSansMobile(FaNum)',
   // fontWeight: 'bold',
    paddingRight: 10
  }
});
