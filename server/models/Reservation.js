const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', default: null },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null },
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
  pickupDate: { type: Date }, // for book
  date: { type: Date },       // for room
  timeSlot: { type: String }, // for room
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
