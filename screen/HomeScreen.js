
import React from 'react';
import {StyleSheet, Button ,Text, View, ImageBackground , Platform } from 'react-native';
import { YellowBox } from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

YellowBox.ignoreWarnings([
  'Warning: Failed prop type',

]);



export default class App extends React.Component {
 


render() {
return (

<ImageBackground
	source={require('./fotoAlimenti/image.jpeg')}
	style={styles.container}>

	<View style={styles.overlayContainer}>
	<Button
          title="Appazon"
	 color="#841505"
	 onPress={() =>
	 {		   
		this.props.navigation.navigate('LoginScreen');   
	 }}  
         
	/>
	</View>

</ImageBackground>

);
}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: 10,
		backgroundColor: 'rgba(200,200,530, 0.2)',
		
	},
	overlayContainer: {
		flex: 1,
		backgroundColor: 'rgba(100,100,330, 0.25)',
		 
	},
	text: {
		fontSize: 80,
		color: 'black',
	}
});
