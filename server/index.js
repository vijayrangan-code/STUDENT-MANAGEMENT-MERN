const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./routes/studentcontroller");
app.use("/", routes);

// listen
app.listen(5000, () => {
  console.log("listening port 5000");
});
