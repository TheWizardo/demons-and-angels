import fs from 'fs/promises';
import mongoose from 'mongoose';
import config from './config';

async function connect(): Promise<void> {
    try {
        console.log("Attempting to connect to", config.dbURI);
        const db = await mongoose.connect(config.dbURI);
        console.log("successfully connected to", db.connections[0].name);
    }
    catch (error) {
        console.log("unable to connect to", config.dbURI);
    }
}


export default {
    connect
};