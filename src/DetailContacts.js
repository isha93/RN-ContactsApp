import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from "react-navigation"

export default class DetailContacts extends Component{
  constructor (props) {
    super(props);
    const {item} = props;
    this.state = {
      item : props.navigation.state.params.item
    };
  }
    render() {
      const { item } = this.state
        return (
          <SafeAreaView style={{flex:1, backgroundColor : 'white'}}>
            <View style={{flex:1}}>
              <Image source={{uri: item.photo == 'N/A' ? 'http://emblemsbattlefield.com/uploads/posts/2014/10/facebook-default-photo-male_1.jpg' : item.photo}} style={{width:100, height:100, borderRadius:50, alignSelf:'center', margin:10}}/>
              <Text style={{alignSelf:'center', fontSize:20}}>{this.state.item.firstName}</Text>
              <View style={{ borderWidth:1, borderRadius:5, width:200, alignContent:'center', justifyContent:'center', alignSelf:'center', margin:10}}>
              <Text style={{margin:10}}><Text>First Name : </Text>{item.firstName}</Text>
              <Text style={{margin:10}}><Text>Last Name : </Text>{item.lastName}</Text>
              <Text style={{margin:10}}><Text>Age : </Text>{item.age}</Text>
              </View>
              <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('EditContacts',{item : item})
              }} style={{borderWidth:1, width:100, alignSelf:'center', backgroundColor:'blue'}}>
                <Text style={{color:'white', alignSelf:'center'}}>Edit Contacts</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      }
}