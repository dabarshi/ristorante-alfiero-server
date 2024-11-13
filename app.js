const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require("./routes/auth");

connectDB();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173/', 'https://lovely-cupcake-e5723a.netlify.app/']
}));

app.use(bodyParser.json());


// Routes
app.get('/', function (req, res) {
  res.send('Hello World');
})

app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/auth", authRoutes); // Use the authentication routes

module.exports = app;
