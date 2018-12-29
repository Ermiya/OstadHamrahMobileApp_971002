import EStyleSheet from 'react-native-extended-stylesheet';

export const form = EStyleSheet.create({
    container :{
        flex:1,
        backgroundColor:'#ecf0f1'
    },
    header :{
        backgroundColor:'#7f8c8d'
    },
    headerText :{
        fontSize:14,
        fontFamily:'IRANMobileSans',
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
        fontFamily:'IRANMobileSans',
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
        fontFamily:'IRANMobileSans',
        color:'white'
    }
});