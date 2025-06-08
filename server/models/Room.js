const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  availableSlots: [String],  // e.g., ["10:00-11:00", "11:00-12:00"]
});

module.exports = mongoose.model('Room', roomSchema);
