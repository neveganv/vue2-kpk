const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://snakes:4321ytrewq@kpk-website.lxw28.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
db.optionsList = require("./optionsList")(mongoose);
db.news = require("./news")(mongoose);
db.user = require("./user")(mongoose);
module.exports = db;