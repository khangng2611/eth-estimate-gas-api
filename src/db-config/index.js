import {connect} from 'mongoose';
import {} from 'dotenv/config'

const mongoURL = process.env.MONGO_URL;
const dbPort = process.env.DB_NAME;

async function Connection () {
    try {
        await connect(`${mongoURL}${dbPort}`);
        console.log("Successful DB Connection")
    } catch (error) {
        console.log("Failed DB Connection")
    }
}

export { Connection }
