import React, { Component } from "react";
import { Alert, Button,View,Text,FlatList,ActivityIndicator,NavigationActions ,Platform,StyleSheet, TouchableOpacity , ToastAndroid } from "react-native";
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
  
]);



var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'data25.db', createFromLocation: '~sqliteexample.db'})



export default class CarrelloScreen extends Component {
 
 static navigationOptions = {
   title: 'Carrello',
};



 

  





 

  
 


 




  render() {
    return (
	

	<View> 
	<Text> codice utente: {this.props.navigation.state.params.codiceUtente} </Text>
		
		
		<FlatList
			data={ this.props.navigation.state.params.array}
			renderItem={ ({item}) => <Text style={styles.carrello}>{item} </Text>
			}>
		</FlatList>

		<Button
		  title="Conferma Carrello"
		 
		
		 onPress={() =>
		 {	
			

			Alert.alert('Arrivederci!','Potrà ricevere info sul suo acquisto in "storico acquisti');
			 db.transaction((tx) => {
 			  tx.executeSql('SELECT idAcquisto FROM acquisto ORDER BY idAcquisto DESC ',  [] , (tx, results  ) => {

        		  var row  = results.rows.item(0);
         		  this.setState({numeroSuccessivo: row.idAcquisto});
         			 });  
  	 		  }); 

			db.transaction((tx) => {tx.executeSql("INSERT INTO acquisto ( idAcquisto ,codUser ,stato ,pdf) VALUES (?,?,?,?)",
 			[this.state.numeroSuccessivo+1 , this.props.navigation.state.params.codiceUtente , "in attesa"
			,this.props.navigation.state.params.array], (tx, results  ) => { });

  
			 }); 

  			 //this.props.navigation.goBack('ClienteScreen');
			this.props.navigation.navigate('LoginScreen');   
		 }       
		     
		 }/>






		




	
	 
	</View>
	
    );
  }
}

const styles = StyleSheet.create({
  carrello: {
	
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 20,
  },
  
});


























