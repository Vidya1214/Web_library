import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationFormRoom = ({ userId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomIdFromState = location.state?.roomId || '';
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  useEffect(() => {
    if (!roomIdFromState) {
      alert('No room selected for reservation. Redirecting to browse rooms.');
      navigate('/browse-rooms');
    }
  }, [roomIdFromState, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reservations/room', {
        userId,
        roomId: roomIdFromState,
        date,
        timeSlot,
      });
      alert('Room reservation submitted!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error submitting reservation. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p><strong>Room ID:</strong> {roomIdFromState}</p>
      <label>Date: </label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <label>Time Slot: </label>
      <input
        type="text"
        value={timeSlot}
        onChange={e => setTimeSlot(e.target.value)}
        required
      />
      <button type="submit">Reserve Room</button>
    </form>
  );
};

export default ReservationFormRoom;
