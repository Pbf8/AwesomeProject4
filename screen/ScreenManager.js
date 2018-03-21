import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';



import LoginScreen   		 from './LoginScreen';
import TabNavigator    		 from './AdminScreen';
import ClienteScreen    	 from './ClienteScreen';
import RegistrazioneScreen 	 from './RegistrazioneScreen';
import CarrelloScreen 		 from './CarrelloScreen';
import StoricoAcquistiScreen 	 from './StoricoAcquistiScreen';
import HomeScreen		 from './HomeScreen';
import ElencoProdotti 		 from './ElencoProdotti';




const Screens = StackNavigator({
  HomeScreen: 		 {screen: HomeScreen},
  LoginScreen:   	 {screen: LoginScreen},
  AdminScreen:  	 {screen: TabNavigator},
  ClienteScreen:	 {screen: ClienteScreen},
  RegistrazioneScreen: 	 {screen: RegistrazioneScreen},
  CarrelloScreen: 	 {screen: CarrelloScreen},
  StoricoAcquistiScreen: {screen: StoricoAcquistiScreen},
  ElencoProdotti:	 {screen: ElencoProdotti},
	
});

export default Screens;
