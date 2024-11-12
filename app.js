const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require("./routes/auth");

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your frontend’s origin
const corsOptions = {
    origin: ['http://localhost:5173', 'https://ristorante-alfiero-server-n8l2utsv4.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include if your requests require cookies/auth headers
  };
  
  app.use(cors(corsOptions));

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/auth", authRoutes); // Use the authentication routes

module.exports = app;
