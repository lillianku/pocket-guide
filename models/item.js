const mongoose = require('mongoose');

const Item = mongoose.model('Item', {
  item: {type: String},
  details: {type: String}
});

module.exports = Item;
