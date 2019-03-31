require('dotenv').config();

var keys = require("./keys.js");

var Twitter = require('twitter');

var fs = require("fs");

var getMyTweets = function() {

var client = new Twitter(keys.twitterKeys);
 

var params = {screen_name: '_k_miller'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      for (var i=0; i<tweets.length; i++) {
          console.log([i].created_at);
          console.log("");
          console.log(tweets[i].text);
      }
  }
});
}
var pick = function(caseData, funtionData) {
    switch(caseData) {
        case "my-tweets" :
        getMyTweets();
        break;
        default:
        console.log("LIRI don't know that");
    }
}

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);
 
spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
  
// Store all of the arguments in an array
var nodeArgs = process.argv;

var choice = process.argv[2];
var userInput = process.argv[3];

var axios = require("axios");


// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
//console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
      console.log("\n----------------------------------");
      console.log("Title: " + response.data.Title,
                  "\nReleased: " + response.data.Year,
                  "\nIMdB: " + response.data.imdbRating,
                  "\nRotten Tomatoes: " + response.data.Ratings[1].Value,
                  "\nCountry: " + response.data.Country,
                  "\nLanguage: " + response.data.Language,
                  "\nPlot: " + response.data.Plot,
                  "\nActors: " + response.data.Actors);
      console.log("----------------------------------\n");
  }
);