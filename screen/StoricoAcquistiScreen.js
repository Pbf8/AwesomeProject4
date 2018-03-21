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



export default class StoricoAcquistiScreen extends Component {
 
 static navigationOptions = {
   title: 'Storico acquisti',
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
      username: null,
      record: [],
 	array: [],
	arr: [],
	arr2: [],
	count: 0 ,

    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }









  makeRemoteRequest = () => {




 db.transaction((tx) => {
   tx.executeSql('SELECT idAcquisto , stato ,pdf FROM acquisto WHERE codUser=? ', [this.props.navigation.state.params.codiceUtente] , (tx, results  ) => {
	 
		

			
           		 let righe = [results.rows.length];
for(var i=0;i<results.rows.length;i++) righe[i] = results.rows.item(i);
	   	 	 this.setState({data: righe});
	
        });
    });






 
  };




















  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };




  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };




//Linea che separa la lista
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "100%"
        }}
      />
    );
  };


 

 




  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };




  render() {



    return (
	
	<View> 
	<Text> 
		ciao 
	</Text>
	 
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
       

	

	 <FlatList
	
          data={this.state.data}
          renderItem={({ item }) => (


	<TouchableOpacity 
		onPress={
		this._onPress = () => {
		  
		
		Alert.alert('Acquisto '+item.idAcquisto+'?' , 'mostrare elenco prodotti?',
		[
			{text: 'Annulla'},
			{text: 'Ok', onPress: () => {this.props.navigation.navigate('ElencoProdotti',{elenco: item.pdf});} }, 
		])


		}
	}>
		
           
	
		
	     <ListItem
              
              title={`Acquisto ${item.idAcquisto}`}
              subtitle={`${item.stato}`}
	      
            
              containerStyle={{ borderBottomWidth: 0 }}		
            />


	</TouchableOpacity> 
	 )}


          keyExtractor={item => item}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
          />
	
      

	</List>










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




