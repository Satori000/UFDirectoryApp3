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
//mongoose.Promise = require('bluebird');
//mongoose.Promise = global.Promise
/* Connect to your database */
//console.log(config.db.uri);
mongoose.connect(config.db.uri, {
  useMongoClient: true
});

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
     //console.log(obj.entries[0].code);

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
    newListing = Listing({
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
    newListing = Listing({
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
  //console.log(mongoose.connection.readyState);

  //console.log(newListing);
  newListing.save(function(err) {
    if (err) {
      console.log('Error');
      throw err;
    }


    console.log('Listing created!');
  });
});

}
/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
