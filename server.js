/*---- Including all dependencies ----*/
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var config = require("./config.js");

/*---- Creating the app ----*/
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.get('*', function(req, res) {
    res.sendFile(__dirname + "/public/app/views/index.html");
});

/*---- Server Code ----*/
app.listen(config.port, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Listning on port 3000");
    }
});