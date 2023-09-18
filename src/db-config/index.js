const mongoose = require('mongoose');

async function connect () {
    try {
        await mongoose.connect('mongodb://18.140.62.59:27017/tram-connect');
        console.log("Successful Connection")
    } catch (error) {
        console.log("Failed Connection")
    }
}

module.exports = { connect }
