const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser:true ,
    useUnifiedTopology:true
});

const connection = mongoose.connection;
connection.once("open" , () => 
    console.log("mongoDB connection established seccessfully1!")
);

const articlesRouter = require('./routes/articles');
app.use('/articles', articlesRouter);

app.listen(port, () => console.log(`the app is running on port: ${port}`));

