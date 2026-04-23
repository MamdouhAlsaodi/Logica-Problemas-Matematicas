const mongoose = require('mongoose');
const connectDB = require('./config/db');
const MathProblem = require('./models/MathProblem');
const User = require('./models/User');

const problems = require('./seed-problems.json');
const users = require('./seed-users.json');

async function seed() {
    await connectDB();
    await MathProblem.deleteMany({});
    await User.deleteMany({});
    await MathProblem.insertMany(problems);
    await User.insertMany(users);
    console.log(`✅ Seeded: ${problems.length} problems, ${users.length} users`);
}

module.exports = seed;
