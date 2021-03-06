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
  'Warning: VirtualizedList',
  'Warning: addStatement',
]);




var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'data25.db', createFromLocation: '~sqliteexample.db'})






export default class LoginScreen extends React.Component {
 
static navigationOptions = {
   title: 'Login',
};













 constructor(props) {
    super(props)
  
 this.state = {
      	username: "null",
	password: "null",
	ruolo: "null",
	stato: "null",
	idUser: "null",
	inputValue: "username",
    	inputValue2: "password",
	reg: 0,
    };

  }













  _handleTextChange = inputValue => {
    this.setState({ inputValue });


 db.transaction((tx) => {
   tx.executeSql('SELECT idUser, username , password , ruolo , stato FROM user WHERE username =?', [this.state.inputValue], (tx, results  ) => {
          var len = results.rows.length;
	
          if(len > 0) {
            // exists owner name John
            var row  = results.rows.item(0);
            var row1 = results.rows.item(0);
	    var row2 = results.rows.item(0);
	    var row3 = results.rows.item(0);
	    var row4 = results.rows.item(0);
            this.setState({username: row.username});
            this.setState({password: row1.password});
            this.setState({ruolo   : row2.ruolo});
            this.setState({stato   : row2.stato});
            this.setState({idUser  : row3.idUser});
	 	 	 	 
          }
 
        });
    });


 
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
          style={{ width: 200, height: 44, padding: 8 }}
	
        />




        <TextInput
          value={this.state.inputValue2}
          onChangeText={this._handleTextChange2}
          style={{ width: 200, height: 44, padding: 8 }}
        />
	<Text>{'Username: '+this.state.inputValue}</Text>
 	<Text>{'Password: '+this.state.inputValue2}</Text>
 
	
	


















        <Button
          title="Login"
         
	
	 onPress={() =>
	 {
	
	
   

	    
	   if(this.state.inputValue == this.state.username && this.state.inputValue2 == this.state.password && this.state.stato == "attivo")
	     {		
			 ToastAndroid.show('Benvenuto '+this.state.username, ToastAndroid.SHORT);
			if(this.state.ruolo == "admin")
		   	{				
		   		 this.props.navigation.navigate('AdminScreen', {itemId: 86 });
			}
			else
			{
		  		 this.props.navigation.navigate('ClienteScreen' , {codUser: this.state.idUser });
			}


	     }else{Alert.alert('Attenzione','credenziali errate o in attesa di approvazione')}
	 }       
	     
     }/>
 









        <Button
          title="Registrazione"
         
	 color="#841584"
	 onPress={() =>
	 {		   
		this.props.navigation.navigate('RegistrazioneScreen');   
	 }       
	     
         }/>
 








      </View>
    );
  }
} 







const styles = StyleSheet.create({
container: {
padding: 20,
 
},
input: {
height: 40,
marginBottom: 20,
color: '#FFF',
paddingHorizontal:10
}
});




















