import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import {getContacts} from './config/Api'
import { SafeAreaView } from "react-navigation"
import axios from 'axios';

export default class Home extends Component<Props> {
static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: "All Contacts",
    headerRight: (
        <Button
        onPress={() => navigation.navigate('AddContacts')}
        title="Add"
        color="black"
        />
    ),
});

constructor (props) {
    super(props);
    const {item} = props;
    this.state = {
      list : []
    };
  }
    async componentDidMount() {
      this.fristLoad()
  }

  fristLoad(){
    axios.get('https://simple-contact-crud.herokuapp.com/contact')
    .then(res =>{
        this.setState({list : res.data.data})
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.navigation.state.params.refresh){
      this.fristLoad()
    }
  }
  
  render() {
    if(this.state.list.length < 1){
      return(
        <ActivityIndicator size="small" color="#0000ff" />
      )
    }else{
    return (
      <SafeAreaView style={{flex:1, backgroundColor : 'white'}}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
        {<FlatList
            data={this.state.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
              onPress={()=>{this.props.navigation.navigate('DetailContacts',{item : item})}}
              style={{
              width:'100%', shadowRadius: 3,
              shadowColor: "#727272",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 1 },
              borderWidth:1,
              marginTop:10, flexDirection:'row'}}>
              <Image source={{uri: item.photo == 'N/A' ? 'http://emblemsbattlefield.com/uploads/posts/2014/10/facebook-default-photo-male_1.jpg' : item.photo}} 
              style={{width:40, height:40, borderRadius:20, margin:10}}/>
                <View style={{flexDirection:'column', justifyContent:'center'}}>
                 <Text>{item.firstName}</Text>
                 <Text>{item.age}</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                  axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${item.id}`).then((res)=>{
                    this.props.navigation.navigate('Home', {refresh: true})
                  })
                }} style={{justifyContent:'flex-start', left:0}}>
                  <Image source={require('./assets/ic_close.png')}/>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            />}
        </View>   
      </SafeAreaView>
    );
  }
}
}

const styles = {
 card :{
   
 }
};