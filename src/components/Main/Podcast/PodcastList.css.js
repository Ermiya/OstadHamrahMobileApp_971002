
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Common from '../../Common';

export const form = EStyleSheet.create({
    container :{
        flex:1,
        backgroundColor:Common.BRAND_COLOR_1
    },
    header :{
        backgroundColor:Common.BRAND_COLOR_3
    },
    headerText :{
        fontSize:14,
        fontFamily:'IRANSansMobile',
        color:'white'
    },
    form :{
        padding : 20
    },
    item :{
        borderRadius : 5,
        marginBottom : 10,
        marginLeft : 10,
        marginRight : 10
    },
    formItemInput :{
        fontSize:14,
        fontFamily:'IRANSansMobile',
        padding : 10
    },
    formSubmitButton :{
        borderRadius : 5,
        marginBottom : 10,
        marginLeft : 10,
        marginRight : 10,
        backgroundColor:'#7f8c8d'
    }
});

export default index = EStyleSheet.create({
    container : {
        backgroundColor:'#34495e',
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
    text :{
        fontSize:16,
        textAlign:'center',
        fontFamily:'IRANSansMobile',
        color:'white'
    }
});