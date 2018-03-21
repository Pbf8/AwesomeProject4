import React, { Component } from 'react';
import { Alert, Button, okCallback,Platform, errorCallback, View, Text, TextInput ,ToastAndroid, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27
import { YellowBox } from 'react-native';


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





 export default class RegistrazioneScreen extends React.Component {
 

static navigationOptions = {
   title: 'Registrazione',
};













 constructor(props) {
    super(props)
  
 this.state = {
      
	inputValue: "",
    	inputValue2: "",
	numero: 1,
	num: 0,
    };

  }













  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };





 _handleTextChange2 = inputValue2 => {
    this.setState({ inputValue2 });
  };





  render() {
    return (
      <View style={styles.container}>
  

       <TextInput
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
	placeholder="digitare username"
          style={{ width: 200, height: 44, padding: 8 }}
	
        />




        <TextInput
          value={this.state.inputValue2}
          onChangeText={this._handleTextChange2}
	 placeholder="digitare password"
          style={{ width: 200, height: 44, padding: 8 }}
        />
	<Text>{'Username: '+this.state.inputValue}</Text>
 	<Text>{'Password: '+this.state.inputValue2}</Text>



  
 <Button
            title="Ietro"
                     

		 onPress={() =>
		 {		   
			    db.transaction((tx) => {
   tx.executeSql('SELECT idUser FROM user ORDER BY idUser DESC ',  [] , (tx, results  ) => {
         

          var row  = results.rows.item(0);
          this.setState({numeroSuccessivo: row.idUser});
           });
 
        
    });  
		 }}
	/>











      	<Button
          title="Conferma"
         color="#841584"
	

	 onPress={() =>
	 {	 

		 

if(this.state.inputvalue != "" && this.state.inputValue2 != "")
{
		 


	
db.transaction((tx) => {
   tx.executeSql('SELECT idUser FROM user ORDER BY idUser DESC ',  [] , (tx, results  ) => {
         

          var row  = results.rows.item(0);
          this.setState({numeroSuccessivo: row.idUser});
	
           });
 
        
    }); 




db.transaction((tx) => {
tx.executeSql("INSERT INTO user ( idUser , username , password , ruolo , stato) VALUES (?,?,?,?,?)", [ this.state.numeroSuccessivo+1 , this.state.inputValue , this.state.inputValue2 , "cliente" , "attesa"], (tx, results  ) => { });

  
			 });
	

}else { Alert.alert('Attenzione!','Completare tutti i campi') }
	//Alert.alert("La tua registrazione sarà verificata da un admin")

	 }       
	     
         }/>








<Text> num{this.state.numeroSuccessivo}  </Text>
      </View>
    );
  }
} 







const styles = StyleSheet.create({
container: {
padding: 20
},
input: {
height: 40,
marginBottom: 20,
color: '#FFF',
paddingHorizontal:10
}
});
























