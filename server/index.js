const express = require("express")
const cors = require("cors")

const app = express()

// Middleware
app.use(express.static("../dist"));

app.use(express.urlencoded({
    limit: '15mb',
    extended: true,
}));

app.use(express.json({
    limit: '15mb',
}));

app.use(cors())

// SPA
app.get("*", (req, res) => {
    res.sendFile("../dist/index.html");
});
//routes
app.use('/api/news', require('./routes/api/news'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/position', require('./routes/api/position'))
app.use('/api/newsCategory', require('./routes/api/newsCategory')) 
app.use('/api/group', require('./routes/api/shedule/group'))
app.use('/api/class', require('./routes/api/shedule/class'))
app.use('/api/shedule', require('./routes/api/shedule/shedule'))
app.use('/api/page', require('./routes/api/page'))
app.use('/api/folder', require('./routes/api/folder'))
app.use('/api/specialty', require('./routes/api/specialty'))
app.use('/api/coolNews', require('./routes/api/news/coolNews'))

//DB
function start() {
    const db = require("./models");
    db.mongoose.connect(db.url, {
        useNewUrlParser: true,
    }).then(() => {
        console.log("Connected to the database!");
    }).catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

    //Port
    app.listen(8000, () => {
        console.log("Server running on http://localhost:8000");
    });
}

start()
