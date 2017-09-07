'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config.js');
mongoose.Promise = require('bluebird');
//mongoose.Promise = global.Promise
/* Connect to your database */
mongoose.connect('mongodb://shakeeb:loosevoon@ds129434.mlab.com:29434/ufdirectoryassignment3', {
  useMongoClient: true
  /* other options */
});

/*
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://shakeeb:loosevoon@ds129434.mlab.com:29434/ufdirectoryassignment3';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.
});*/

//var connection = mongoose.connection;
/*mongoose.connection.on('error', function (err) {
 console.log("fuck");
});*/

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */




 var content;
 // First I want to read the file
 fs.readFile('./listings.json', function read(err, data) {
     if (err) {
         throw err;
     }
     content = data;

     // Invoke the next step here however you like
     var obj = JSON.parse(data);
     console.log(obj.entries[0].code);

     addEntries(obj.entries);
        // Put all of the code here (not the best solution)
          // Or put the next step in a function and invoke it
 });

function addEntries(entries) {
var listing = mongoose.model('Listing', Listing.listingSchema);
entries.forEach( function (entry) {
  var newListing;
  if (entry.coordinates != undefined && entry.address != undefined) {
    //console.log("heeeeey1");
    newListing = listing({
      code: entry.code,
      name: entry.name,
      coordinates: {
        latitude: entry.coordinates.latitude,
        longitude: entry.coordinates.longitude
      },
      address: entry.address
    });
  } else {
    //console.log("heeeeey2");
    newListing = listing({
      code: "HAL",
      name: "fuck this shit",
      coordinates: {
        latitude: 4.2,
        longitude: 89.6
      },
      address: "hello"

    });
    /*newListing = Listing({
      code: entry.code,
      name: entry.name,
      coordinates: {
        latitude: undefined,
        longitude: undefined
      },
      address: undefined
    }); */
  }
  console.log(mongoose.connection.readyState);

  console.log(newListing);
  newListing.save(function(err) {
    if (err)
     throw err;

    console.log('Listing created!');
  });
});

}
/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
