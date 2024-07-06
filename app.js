const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Serving on port 3000");
});