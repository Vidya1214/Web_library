import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestReservation = () => {
  const [books, setBooks] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookId, setBookId] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('/api/data/books').then(res => setBooks(res.data));
    axios.get('/api/data/rooms').then(res => setRooms(res.data));
  }, []);

  const submitBookReservation = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reservations/books', { bookId, pickupDate, userId: user._id });
      alert('Book reservation submitted!');
    } catch (err) {
      alert('Book reservation failed!');
    }
  };

  const submitRoomReservation = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reservations/rooms', { roomId, date, slot, userId: user._id });
      alert('Room reservation submitted!');
    } catch (err) {
      alert('Room reservation failed!');
    }
  };

  return (
    <div>
      <h2>📚 Book Reservation</h2>
      <form onSubmit={submitBookReservation}>
        <select value={bookId} onChange={e => setBookId(e.target.value)} required>
          <option value="">Select a Book</option>
          {books.map(book => (
            <option key={book._id} value={book._id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={pickupDate}
          onChange={e => setPickupDate(e.target.value)}
          required
        />
        <button type="submit">Reserve Book</button>
      </form>

      <h2>🏛 Room Reservation</h2>
      <form onSubmit={submitRoomReservation}>
        <select value={roomId} onChange={e => setRoomId(e.target.value)} required>
          <option value="">Select a Room</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Time Slot (e.g., 10:00-11:00)"
          value={slot}
          onChange={e => setSlot(e.target.value)}
          required
        />
        <button type="submit">Reserve Room</button>
      </form>
    </div>
  );
};

export default RequestReservation;
