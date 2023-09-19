const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;
const dbPort = process.env.DB_NAME;

async function connect () {
    try {
        await mongoose.connect(`${mongoURL}${dbPort}`);
        console.log("Successful Connection")
    } catch (error) {
        console.log("Failed Connection")
    }
}

module.exports = { connect }
