import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyReservations = () => {
  const [bookReservations, setBookReservations] = useState([]);
  const [roomReservations, setRoomReservations] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchReservations = async () => {
      const res = await axios.get(`/api/reservations/user/${user._id}`);
      setBookReservations(res.data.books || []);
      setRoomReservations(res.data.rooms || []);
    };
    fetchReservations();
  }, [user._id]);

  return (
    <div>
      <h2>📖 My Book Reservations</h2>
      {bookReservations.length === 0 ? <p>No book reservations yet.</p> : (
        <ul>
          {bookReservations.map(res => (
            <li key={res._id}>
              {res.book.title} | Pickup: {res.pickupDate} | Status: {res.status}
            </li>
          ))}
        </ul>
      )}

      <h2>🏛 My Room Reservations</h2>
      {roomReservations.length === 0 ? <p>No room reservations yet.</p> : (
        <ul>
          {roomReservations.map(res => (
            <li key={res._id}>
              {res.room.name} | {res.date} @ {res.slot} | Status: {res.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReservations;
