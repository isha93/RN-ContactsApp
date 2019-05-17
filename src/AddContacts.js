import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { SafeAreaView } from "react-navigation"
import { Input, InputGroup, Spinner } from 'native-base';
import Axios from 'axios';
var ImagePicker = require('react-native-image-picker');
const options = {
  title: 'Select Avatar',
  mediaType: 'photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


export default class AddContacts extends Component{
  constructor (props) {
    super(props);
    const {item} = props;
    this.state = {
      item : [],
      fristName : '',
      lastName : '',
      age :'',
      uri :'',
    };
  }

  async componentWillMount(){
    // await this.setState({item : this.props.navigation.state.params.item})
  }


  pickerImage(){
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        alert('Oopss ..','Tidak berhasil mengambil gambar karena '+response.error, 'OK');
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({ uri:response.uri });
      }
    })
  }

  editProfile(){
    const newUser = {
      firstName: this.state.fristName,
      lastName: this.state.lastName,
      age: parseInt(this.state.age) ,
      photo: this.state.uri ? this.state.uri : this.state.item.photo
    }
    Axios.post(`https://simple-contact-crud.herokuapp.com/contact`,newUser).then((res)=>{
      this.props.navigation.navigate('Home', {refresh : true});
      debugger
    }).catch((e)=>{
        debugger
        console.log(e)
    })
  }

    render() {
      const { item } = this.state
      if(item){
        return (
          <SafeAreaView style={{flex:1, backgroundColor : 'white'}}>
            <View style={{flex:1}}>
              <Image source={{uri: this.state.uri != '' ? this.state.uri : 'http://emblemsbattlefield.com/uploads/posts/2014/10/facebook-default-photo-male_1.jpg'}} style={{width:100, height:100, borderRadius:50, alignSelf:'center', margin:10}}/>
              <TouchableOpacity onPress={()=>this.pickerImage()} style={{position:'absolute', alignSelf:'center',marginTop:90, right:170}}>
                <Image source={require('./assets/ic_close.png')} style={{width:30, height:30, transform:[{ rotate:'45deg' }]}}/>
              </TouchableOpacity>
              <Text style={{alignSelf:'center', fontSize:20}}>{this.state.item.firstName}</Text>
              <View style={{ borderWidth:1, borderRadius:5, width:200, alignContent:'center', justifyContent:'center', alignSelf:'center', margin:10}}>
              <InputGroup borderType="underline" style={{height:50,paddingLeft:0, paddingBottom:0}} >
                <Input
                  autoCapitalize='words'
                  color={'black'}
                  placeholder={'Frist Name'}
                  onChangeText={fristName => this.setState({fristName})}
                />
              </InputGroup>
              <InputGroup borderType="underline" style={{height:50,paddingLeft:0, paddingBottom:0}} >
                <Input
                  autoCapitalize='words'
                  color={'black'}
                  placeholder={'Last Name'}
                  onChangeText={lastName => this.setState({ lastName: lastName })}
                />
              </InputGroup>
              <InputGroup borderType="underline" style={{height:50,paddingLeft:0, paddingBottom:0}} >
                <Input
                  autoCapitalize='sentences'
                  color={'black'}
                  placeholder={'Age'}
                  onChangeText={age => this.setState({ age })}
                />
              </InputGroup>
              </View>
              <TouchableOpacity onPress={()=>{
                this.editProfile()
              }} style={{borderWidth:1, width:100, alignSelf:'center', backgroundColor:'blue'}}>
                <Text style={{color:'white', alignSelf:'center'}}>Add Contacts</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      }else{
        return(
          <ActivityIndicator size="small" color="#0000ff" />
        )
      }
    }
}