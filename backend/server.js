const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seed = require('./seed');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Math Platform API is running' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

async function start() {
    await connectDB();
    await seed();
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
}

start();
