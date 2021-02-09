const mongoose = require('mongoose');

mongoose.connect('mongobd://localhost/APIRest', { useMongoCliente: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;