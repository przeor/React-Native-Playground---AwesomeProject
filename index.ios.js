/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var { AppRegistry, Image, StyleSheet, Text, View, } = React;


var API_KEY = 'wgcxhbxsrzrmjnzmh4d3hnbg'; 
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json'; 
var PAGE_SIZE = 25; 
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE; 
var REQUEST_URL = API_URL + PARAMS;



var MOCKED_MOVIES_DATA = [ 
  {
    title: 'Title', 
    year: '2015', 
    posters: {
      thumbnail: 'http://i.imgur.com/UePbdph.jpg'
    }
  }, 
];


var AwesomeProject = React.createClass({
  getInitialState: function() { 
    return { movies: null, }; 
  },
  componentDidMount: function() { 
    this.fetchData(); 
  },
  fetchData: function() { 
    fetch(REQUEST_URL) 
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        movies: responseData.movies, 
        error: responseData.error, 
      }); 
    }) 
    .done(); 
  },
  render: function() { 
    console.log(this.state.movies);
    if(this.state.error) {
      return this.renderErrorView();
    } else if (!this.state.movies) { 
      return this.renderLoadingView(); 
    }
    var movie = this.state.movies[0]; 
    return this.renderMovie(movie); 
  },
  renderLoadingView: function() { 
    return ( 
      <View style={styles.container}> 
      <Text> Loading movies... </Text> 
      </View> 
      ); 
  },
  renderErrorView: function() { 
    return ( 
      <View style={styles.container}> 
      <Text> Error: {this.state.error} </Text> 
      </View> 
      ); 
  },
  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F5FCFF', 
  },
  rightContainer: { 
    flex: 1, 
  },
  thumbnail: { 
    width: 53, 
    height: 81, 
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  title: { 
    fontSize: 20, 
    marginBottom: 8, 
    textAlign: 'center', 
  }, 
  year: { 
    textAlign: 'center', 
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
