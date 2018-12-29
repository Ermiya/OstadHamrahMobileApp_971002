
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Common from '../../Common';

export default EStyleSheet.create({
    container :{
        flex:1,
        backgroundColor:Common.BRAND_COLOR_1
    },
    header :{
        backgroundColor:Common.BRAND_COLOR_3
    },
    headerRightText :{
        fontFamily:'IRANSansMobile',
        color: Common.BRAND_COLOR_2,
    }
});
