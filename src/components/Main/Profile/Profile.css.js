import EStyleSheet from 'react-native-extended-stylesheet';
import * as Common from './../../Common';

export default EStyleSheet.create({
  header: {
    backgroundColor: Common.BRAND_COLOR_3
  },
  icon: {
    color: 'white',
    fontWeight: 'bold'
  },
  headerText: {
    fontFamily: 'IRANSansMobile',
    color: 'white',
    fontWeight: 'bold'
  }
  ,
  headerTabText: {
    fontFamily: 'IRANSansMobile',
    color: 'red',
    fontWeight: 'bold'
  }
  ,
  BodyText: {
    fontFamily: 'IRANSansMobile',

  }
  ,
  LableText: {
    fontFamily: 'IRANSansMobile',
    fontSize: 14,
  }
  ,
  ItemInput: {
    fontFamily: 'IRANSansMobile',

    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold'
  }
});
