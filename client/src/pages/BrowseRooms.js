// src/pages/BrowseRooms.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/api/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛋️ Available Rooms</h2>
      {rooms.map(room => (
        <div key={room._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h4>{room.name}</h4>
          <p>{room.description}</p>
          <Link
            to="/reserve-room"
            state={{ roomId: room._id }}
            style={{
              textDecoration: 'none',
              color: 'white',
              backgroundColor: '#28a745',
              padding: '6px 12px',
              borderRadius: '4px'
            }}
          >
            Reserve
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrowseRooms;
