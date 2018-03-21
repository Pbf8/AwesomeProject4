import React, { Component } from "react";
import { Alert, Image ,   View, Text, FlatList, ActivityIndicator , Platform , StyleSheet, TouchableOpacity ,ToastAndroid} from "react-native";
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



export default class ClienteScreen extends Component {
 
 static navigationOptions = {
   title: 'Benvenuto Cliente',
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
      acquisto: 0,
      cerca: 0,

    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }




renderHeader = () => {
    return <SearchBar placeholder="Cerca Prodotto" lightTheme round onChangeText={this._findFunction}/>;
	
  };

_findFunction = cerca => {
    this.setState({ cerca });
  };




  makeRemoteRequest = () => {








 db.transaction((tx) => {
   tx.executeSql('SELECT nomeProdotto , foto , prezzo FROM prodotto ORDER BY nomeProdotto=? DESC ', [this.state.cerca] , (tx, results  ) => {
		

			
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
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
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
		ciao {this.state.data.length} prodotti acquistati:{this.state.count }  
		codice utente:{this.props.navigation.state.params.codUser }
		cerca:{this.state.cerca}
	</Text>
	 
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
       

	

	 <FlatList
	
          data={this.state.data}
          renderItem={({ item }) => (


	<TouchableOpacity 
		onPress={
		this._onPress = () => {
		  
		
		Alert.alert('Acquistare '+item.nomeProdotto+'?' , 'prezzo: '+item.prezzo+' €',
		[
			{text: 'Cancella'},
			{text: 'Acquista', onPress: () => 
			{  
		
			
				 ToastAndroid.show('Aggiunto al carrello!', ToastAndroid.SHORT);
				this.state.arr.splice(this.state.count, 0, item.nomeProdotto);
				this.state.arr.splice(this.state.count+1, 0, item.prezzo);
				
				this.setState({ count: this.state.count+2, }); 
				
		
			}}, 
		])
		


		}
	}>
		
           
	
		
	     <ListItem
              roundAvatar
              title={`${item.nomeProdotto} `}
              subtitle={`${item.prezzo} €`}
	          
		
	avatar={<Image source={{uri: `${item.foto}` }} />}
		//avatar={`${item.foto}`}
            
              containerStyle={{ borderBottomWidth: 0 }}		
            />


	</TouchableOpacity> 
	 )}


          keyExtractor={item => item}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
          />
	
      

	</List>











 <ActionButton buttonColor="rgba(231,76,60,1)"     
	onPress={() => {
	 		db.transaction((tx) => {
	   	 	tx.executeSql('SELECT idAcquisto FROM acquisto WHERE codUser =?', 
		 	[this.props.navigation.state.params.codUser], (tx, results  ) => {
		 	
			var row = results.rows.item(0);
	                this.setState({acquisto: row.idAcquisto});	 
	      	  		});
	  	 	 });
}}>



  <Icon name="md-done-all" style={styles.actionButtonIcon} />
          <ActionButton.Item buttonColor='#9b59b6' title="Carrello" onPress={() => {



if(this.state.count == 0 ) Alert.alert('Ops!', 'Il carrello è ancora vuoto')
else 
{
	this.setState({ array: this.state.arr, });
     this.props.navigation.navigate('CarrelloScreen', {array: this.state.arr , codiceUtente: this.props.navigation.state.params.codUser });}
}}>


            <Entypo name="shopping-cart" style={styles.actionButtonIcon} />
          </ActionButton.Item>
         



	 <ActionButton.Item buttonColor='#3498db' title="Storico acquisti" onPress={() => 
	 {		 
 		 if(this.state.acquisto == 0) Alert.alert("Avviso","Storico acquisti vuoto");
		 else {this.props.navigation.navigate('StoricoAcquistiScreen',{codiceUtente: this.props.navigation.state.params.codUser})}
	}}>


            <Entypo name="shopping-bag" style={styles.actionButtonIcon} />
          </ActionButton.Item>
</ActionButton>










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














































