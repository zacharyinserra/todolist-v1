//nodemon app.js --signal SIGKILL -e js,html,ejs

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["buy", "cook"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  items.push(req.body.newItem);
  res.redirect("/");
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: ""})
})

app.listen(3000, function() {
  console.log("Server running on port 3000...");
});
