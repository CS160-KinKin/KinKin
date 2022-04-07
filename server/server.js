const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');

require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = process.env.ATLAS_URI;
mongoose.connect(db, {useNewUrlParser:true})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongo db connection established')
})


app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});
