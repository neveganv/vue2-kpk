const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://snakes:4321ytrewq@kpk-website.lxw28.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

module.exports = db;