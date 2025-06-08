const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST book reservation
router.post('/book', async (req, res) => {
  const { userId, bookId, pickupDate } = req.body;
  try {
    const newReservation = new Reservation({
      user: userId,
      book: bookId,
      pickupDate
    });
    await newReservation.save();
    res.json({ message: 'Book reservation submitted.' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting book reservation.' });
  }
});

// POST room reservation
router.post('/room', async (req, res) => {
  const { userId, roomId, date, timeSlot } = req.body;
  try {
    const newReservation = new Reservation({
      user: userId,
      room: roomId,
      date,
      timeSlot
    });
    await newReservation.save();
    res.json({ message: 'Room reservation submitted.' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting room reservation.' });
  }
});

// GET reservations by user
router.get('/user/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.userId })
      .populate('book')
      .populate('room');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservations.' });
  }
});

module.exports = router;
