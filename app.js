const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require("./routes/auth");

connectDB();

const app = express();

// Set up CORS with specific options
const corsOptions = {
    origin: ['http://localhost:5173', 'https://ristorante-alfiero-server-n8l2utsv4.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

app.use(cors(corsOptions));


// Explicitly handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(bodyParser.json());


// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/auth", authRoutes); // Use the authentication routes

module.exports = app;
