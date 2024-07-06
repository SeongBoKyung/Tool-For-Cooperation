const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb://localhost:27017/tool-for-cooperation')
    .then(() => {
        console.log("MongoDB Connected!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR!!!");
        console.log(err);
    });
};

module.exports = connectDB;