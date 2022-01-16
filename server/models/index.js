const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.URL;
db.news = require("./news")(mongoose);
db.user = require("./user")(mongoose);
db.position = require("./position")(mongoose);
db.newsCategory = require("./newsCategory")(mongoose);
db.group = require("./shedule/group")(mongoose);
db.classes = require("./shedule/class")(mongoose);
db.shedul = require("./shedule/shedule")(mongoose);
db.page = require("./page")(mongoose);
db.folder = require("./folder")(mongoose);
db.specialty = require("./specialty")(mongoose);
db.coolNews = require("./news/coolNews")(mongoose);
db.prepareCourse = require("./prepareСourse")(mongoose);
db.partner = require("./partner")(mongoose);

module.exports = db;