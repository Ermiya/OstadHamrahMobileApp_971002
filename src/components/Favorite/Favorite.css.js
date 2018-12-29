import EStyleSheet from 'react-native-extended-stylesheet';
import * as Common from './../Common';

export default EStyleSheet.create({
    container:{
        flex:1
    },
    content:{
        paddingTop : 30
    },
    body :{
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontFamily:'IRANMobileSans',
        fontSize:18
    },
    image:{
        width:25,
        height:25
    },
    button:{
        backgroundColor:Common.BRAND_COLOR_3
    },
    buttonText:{
              fontFamily:'IRANSansMobile',
              fontSize : 19
    },
    headerText:{
        fontFamily:'IRANSansMobile',
        fontSize : 19,
        textAlign:'center',
        color:'white'
    },
    headerIcon :{
        color:'white'
    }
  });