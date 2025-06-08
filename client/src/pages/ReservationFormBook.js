import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationFormBook = ({ userId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookIdFromState = location.state?.bookId || '';
  const [pickupDate, setPickupDate] = useState('');

  useEffect(() => {
    if (!bookIdFromState) {
      alert('No book selected for reservation. Redirecting to browse books.');
      navigate('/browse-books');
    }
  }, [bookIdFromState, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reservations/book', {
        userId,
        bookId: bookIdFromState,
        pickupDate,
      });
      alert('Book reservation submitted!');
      navigate('/dashboard'); // Redirect after success (optional)
    } catch (error) {
      alert('Error submitting reservation. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p><strong>Book ID:</strong> {bookIdFromState}</p>
      <label>Pickup Date: </label>
      <input
        type="date"
        value={pickupDate}
        onChange={e => setPickupDate(e.target.value)}
        required
      />
      <button type="submit">Reserve Book</button>
    </form>
  );
};

export default ReservationFormBook;
