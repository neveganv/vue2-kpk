const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://snakes:4321ytrewq@kpk-website.lxw28.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
db.news = require("./news")(mongoose);
db.user = require("./user")(mongoose);
db.position = require("./position")(mongoose);
db.newsCategory = require("./newsCategory")(mongoose);
db.group = require("./shedule/group")(mongoose);
db.classes = require("./shedule/class")(mongoose);
db.shedul = require("./shedule/shedule")(mongoose);
db.page = require("./page")(mongoose);
db.specialty = require("./specialty")(mongoose);
db.coolNews = require("./news/coolNews")(mongoose);

module.exports = db;