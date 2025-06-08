const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reservationRoutes = require('./routes/reservationRoutes');



require('dotenv').config();
const catalogRoutes = require('./routes/catalogRoutes');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', catalogRoutes);
app.use('/api/reservations', reservationRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on 5000')))
  .catch((err) => console.log(err));