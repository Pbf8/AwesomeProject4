import React, { Component } from "react";
import { Alert, Image ,   View, Text, FlatList, ActivityIndicator , Platform , StyleSheet, TouchableOpacity } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { YellowBox } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
 'Warning: Failed child context type',
]);



var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'data25.db', createFromLocation: '~sqliteexample.db'})



export default class ElencoProdotti extends Component {
 
 static navigationOptions = {
   title: 'ElencoProdotti',
};

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      elenco: null,
      record: [],
 	array: [],
	arr: [],
	arr2: [],
	count: 0 ,

    };
  }





 






  render() {



    return (
	
	<View>  

		 <Text>
		  {this.props.navigation.state.params.elenco}
		 </Text>
		
 	</View>
	
    );
  }
}



const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
 
});




