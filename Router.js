import React from 'react';
import Home from './src/Home';
import DetailContacts from './src/DetailContacts'
import EditContacts from './src/EditContacts'
import AddContacts from './src/AddContacts'
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
    Home : { screen : Home},
    DetailContacts : {screen : DetailContacts},
    EditContacts : {screen : EditContacts},
    AddContacts :{ screen : AddContacts}
})

const AppNav = createAppContainer(AppNavigator);

export default AppNav