
import React, {Component} from 'react';
import { AppRegistry, Alert, Button, FlatList , okCallback,Platform, errorCallback, View,Text,TextInput ,ToastAndroid, StyleSheet ,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27
import { YellowBox } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';



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





class HomeScreen extends React.Component {
 static navigationOptions = {
   title: 'Elenco registrazioni',
};
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      utenti: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      username: null,
      record: [],

    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }






 






  makeRemoteRequest = () => {



/////LA QUERY DI VISUALIZZAZIONE DELL ELENCO DELLE REGISTRAZIONI
 db.transaction((tx) => {
   tx.executeSql('SELECT username , password  FROM user WHERE stato=? ', ["attesa"] , (tx, results  ) => {
		

			
           		 let righe = [results.rows.length];
			for(var i=0;i<results.rows.length;i++) righe[i] = results.rows.item(i);
			this.setState({utenti: righe});
			
			
 		
	
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
          //marginLeft: "100%"
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
	<Text> ciao {this.state.utenti.length} </Text>
	 
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
       

	

	 <FlatList
	
          data={this.state.utenti}
          renderItem={({ item }) => (


	<TouchableOpacity onPress={this._onPress = () => {Alert.alert('Attenzione!','Confermare registrazione utente?',
		[
			{text: 'Annulla'},
			{text: 'Conferma', onPress: () =>{
			ToastAndroid.show('Confermato: '+item.username, ToastAndroid.SHORT);
			db.transaction((tx) => {
			tx.executeSql("UPDATE user SET stato=? WHERE username='"+item.username+"' ", ["attivo"], (tx, results  ) => { });
 
       		 });
		}},
		])}}>











		
            <ListItem
            
              title={`username: ${item.username} `}
              subtitle={`password: ${item.password} `}
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



class SettingsScreen extends React.Component {
static navigationOptions = {
   title: 'Richieste di acquisto',
};
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      acquisti: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      username: null,
      record: [],

    };
  }



  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {



/////LA QUERY DI VISUALIZZAZIONE DELL ELENCO DEGLI ACQUISTI
 db.transaction((tx) => {
   tx.executeSql('SELECT *  FROM acquisto ', [] , (tx, results  ) => {
		

			
           		 let righe = [results.rows.length];
			for(var i=0;i<results.rows.length;i++) righe[i] = results.rows.item(i);
			this.setState({acquisti: righe});
			
			
 		
	
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
          //marginLeft: "100%"
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
	<Text> ciao {this.state.acquisti.length} </Text>
	 
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
       

	

	 <FlatList
	
          data={this.state.acquisti}
          renderItem={({ item }) => (


	<TouchableOpacity onPress={this._onPress = () => {Alert.alert('Attenzione!','Confermare acquisto?',
		[
			{text: 'Annulla'},
			{text: 'Conferma', onPress: () =>{
			ToastAndroid.show('Acquisto confermato', ToastAndroid.SHORT);
			db.transaction((tx) => {
			tx.executeSql("UPDATE acquisto SET stato=? WHERE idAcquisto='"+item.idAcquisto+"' ", ["in spedizione"], 
			(tx, results  ) => { });
 
       		 });
		}},
		])}}>











		
            <ListItem
            
              title={`Acquisto ${item.idAcquisto} `}
              subtitle={`stato: ${item.stato} `}
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

 











export default TabNavigator(
  {
	  
    Settings: { screen: SettingsScreen },
    Home: { screen: HomeScreen },
  
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-person-add${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-menu${focused ? '' : '-outline'}`;
        }

        
  return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);






AppRegistry.registerComponent('AwesomeProject4', () => App);







