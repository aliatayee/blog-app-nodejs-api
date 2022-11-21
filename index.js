const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
.then(console.log("Connected to mongo"))
.catch((err) => console.log(err));
app.listen("5000", () => {
    console.log("Backend is running");
})