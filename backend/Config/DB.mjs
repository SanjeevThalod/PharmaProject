import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.DB_KEY;

const DB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('Mongo Connected');
    } catch (error) {
        console.log(error);
    }
}

export default DB;
