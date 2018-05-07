const mongoose = require('mongoose');

const Place = mongoose.model('Place', {
  country: {type: String},
  city: {type: String},
  name: {type: String},
  url: {type: String},
  notes: {type: String}
});

module.exports = Place;
