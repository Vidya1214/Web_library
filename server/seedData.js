const mongoose = require('mongoose');
const Book = require('./models/Book');
const Room = require('./models/Room');

mongoose.connect('mongodb://localhost:27017/townbook');

const seed = async () => {
  await Book.deleteMany();
  await Room.deleteMany();

  await Book.insertMany([
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', totalCopies: 5, availableCopies: 3 },
    { title: '1984', author: 'George Orwell', totalCopies: 4, availableCopies: 4 },
  ]);

  await Room.insertMany([
    { name: 'Room A', capacity: 4, availableSlots: ['10:00-11:00', '12:00-1:00'] },
    { name: 'Room B', capacity: 6, availableSlots: ['11:00-12:00', '1:00-2:00'] },
  ]);

  console.log('✅ Seeded');
  process.exit();
};

seed();
