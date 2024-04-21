// Express
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

// cors
var cors = require("cors");
app.use(cors());

// body parserd
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "16mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "16mb",
    extended: true,
    parameterLimit: 16000,
  })
);

// mongoose
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// public file
// const path = require('path')
// app.use('/uploads' ,express.static(path.join(__dirname, 'uploads')))

// start
const routes = require("./src/Routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
