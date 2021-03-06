var express = require("express");
var ehbs = require('express-handlebars');
var mongoose = require("mongoose");

var app = express();

//var db = require("./models/index");
var PORT = process.env.PORT || 3000;

var mongdb_uri = process.env.mongdb_uri || "mongodb://localhost/mongoHeadlines" || "mongodb://heroku_042v2vt7:tqpvdohndm4ban6plsvc5b6h7i@ds133136.mlab.com:33136/heroku_042v2vt7";

mongoose.connect(mongdb_uri)

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static("public"));
//app.set('views', path.join(__dirname, 'views/'));


app.engine(
    "handlebars",
    ehbs({
        defaultLayout: "main",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
);
app.set("view engine", "handlebars");


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



var syncOptions = {
    force: false,
    // logging: console.log
};
app.listen(PORT, function () {
    console.log("App runnning on port " + PORT);
})