const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let connected = false;

const connectDB = async () => {
    if (connected) return;
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    connected = true;
    console.log('✅ MongoDB Connected (in-memory)');
};

module.exports = connectDB;
