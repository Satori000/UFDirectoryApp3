/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  /* your code here */
  code: {type: String, required: true, unique: true },
  name: {type: String, required: true, unique: false },
  coordinates: {
    latitude: {type: Number, required: false, unique: false},
    longitude: {type: Number, required: false, unique: false}
  },
  address: {type: String, required: false, unique: false}
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  /* your code here */
  this.created_at = new Date();
  this.created_at = new Date();
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
