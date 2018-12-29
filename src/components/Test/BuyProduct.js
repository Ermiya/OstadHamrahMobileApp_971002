import React,{ Component } from 'react';
import { Container,Header,Left,Icon,Right,Text,Spinner,Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { WebView,AsyncStorage,View } from 'react-native';
import { form } from './Home.css'; 

export default class BuyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_token : null
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('api_token',(error,api_token)=> this.setState({ api_token }));
    }
    
    render() {
        const { product } = this.props;

        console.log(`product_id : ${product.id} , api_token : ${this.state.api_token}`);

        return(
            <Container style={ form.container } >
                <Header style={ form.header } androidStatusBarColor="#34495e" iosBarStyle="light-content">
                    <Left>
                       <Button transparent onPress={()=>Actions.reset('home')}>
                            <Icon name="md-arrow-back"/>
                       </Button>
                    </Left>
                    
                    <Right>
                        <Text style={ form.headerText }>  { product.title }  </Text>
                    </Right>
                </Header>

                { 
                   this.state.api_token === null ? this.renderLoading() : this.renderWebView(product,this.state.api_token)
                }
                 
            </Container>
        );
    }

    renderLoading() {
        return <View style={{ flex:1,justifyContent:'center',alignItems:'center' }}>
            <Spinner />
        </View>
    }

    renderWebView(product) {
        return <WebView source={{ uri: 'http://roocket.org/api/product/buy',method:'POST',body:`product_id=${product.id}&api_token=${this.state.api_token}}` }} 
                        startInLoadingState={true}
                        renderLoading={this.renderLoading}
               />
    }

}