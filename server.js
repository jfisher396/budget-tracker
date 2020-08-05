const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://user1:password1>@ds137101.mlab.com:37101/heroku_flnhj3wq", 
  {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

 app.get("/", function (req, res) {
   res.json(path.join(__dirname, "public/index.html"));
 });

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});