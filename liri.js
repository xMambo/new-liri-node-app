//Required
require('dotenv').config();
var keys = require("./keys.js");
var fs = require("fs");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//Input on CLI
var query = process.argv;
var choice = process.argv[2];
var userInput = process.argv[3];


// node liri.js movie-this
function findMovie(userInput) {
    var queryUrl = ("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy");

    axios.get(queryUrl).then(
        function (response) {
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
        }).catch(function (error) {
        console.log(error);
    });

}

// node liri.js concert-this
function findConcert(userInput) {
    var queryUrl = ("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp");

    axios.get(queryUrl).then(
        function (response) {
            for(var i=0; i < response.data.length; i++){

            console.log("\n----------------------------------");
            console.log("Show: " + response.data[i].lineup[0],
                        "\nVenue: " + response.data[i].venue.name,
                        "\nLocation: " + response.data[i].venue.city + "," + response.data[i].venue.country);

            var responseDate = response.data[i].datetime
            console.log("Date: " + moment(responseDate).format('MM/DD/YYYY'));
            console.log("----------------------------------\n");
            }
        }).catch(function (error) {
        console.log(error);
    });

}

//node liri.js spoitfy-this-song
function spotifySong(userInput) {
    spotify.search({
        type: "track",
        query: userInput
    }, function (err, data) {
        if (err) {
            return console.log("Error occured: " + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log("\n----------------------------------");
            console.log("Artist's name: " + data.tracks.items[i].artists[0].name,
                        "\nSong name: " + data.tracks.items[i].name,
                        "\nPreview URL: " + data.tracks.items[i].preview_url,
                        "\nAlbum Name: " + data.tracks.items[i].album.name);
             console.log("----------------------------------\n");

        }
    });
}

// node-liri-do-what-it-says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        console.log(dataArr);
        chooseLIRI(dataArr[0], dataArr[1]);
    });
}

//Switch statement to determine type selecvted.
function chooseLIRI(choice, userInput) {
    switch (choice) {
        case 'concert-this':
            findConcert(userInput);
            break;
        case 'spotify-this-song':
            spotifySong(userInput);
            break;
        case 'movie-this':
            findMovie(userInput);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Error - try again.");
    };
}

chooseLIRI(choice, userInput);

//Log input to log.txt
var logQuery = query.splice(0,2)
logQuery = "\n" + query.join(" ") + "\n"
console.log(logQuery)

fs.appendFile("log.txt", logQuery, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Log Updated");
    }
});

//Data logger
function dataLog(data) {
    fs.appendFile("log.txt", data, function(err) {

        if (err) {
            console.log(err);
            
        } else {
            console.log("Log Updated");
        }
    });
}