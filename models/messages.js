const mongoose = require('mongoose');

const Message = mongoose.model('Message', {
  name: {type: String},
  message: {type: String}
});

module.exports = Message;
