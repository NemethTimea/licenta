const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5121;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;

connection.on("error", (error) => {
    throw error;
});

connection.on("disconnected", () => {
    console.log("Disconnected from database!");
});

// End setup connection

connection.once("open", () => {
    console.log("MongoDB database opened");
})

const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/items', itemsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});