import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get(`/api/reservations/user/${user?._id}`);
        setReservations(res.data);
      } catch (err) {
        console.error('Failed to fetch reservations', err);
      }
    };
    if (user?.role === 'member') {
      fetchReservations();
    }
  }, [user]);

  if (!user) return <p>Loading user data...</p>;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>

      {user.role === 'member' ? (
        <div>
          <h3>📖 Your Book & Room Reservations</h3>
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {reservations.map((res, idx) => (
                <li
                  key={idx}
                  style={{
                    background: '#f1f1f1',
                    marginBottom: '10px',
                    padding: '10px',
                    borderRadius: '5px',
                  }}
                >
                  <strong>{res.book ? '📘 Book' : '🛋️ Room'}:</strong>{' '}
                  {res.book?.title || res.room?.name} <br />
                  <strong>Status:</strong> {res.status} <br />
                  {res.pickupDate && (
                    <>
                      <strong>Pickup Date:</strong>{' '}
                      {new Date(res.pickupDate).toLocaleDateString()} <br />
                    </>
                  )}
                  {res.date && res.timeSlot && (
                    <>
                      <strong>Reserved For:</strong>{' '}
                      {new Date(res.date).toLocaleDateString()} at {res.timeSlot}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: '20px' }}>
            <Link to="/browse-books" style={{ display: 'block', marginBottom: '10px' }}>
              📘 Browse Books
            </Link>
            <Link to="/browse-rooms" style={{ display: 'block' }}>
              🛋️ Browse Reading Rooms
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h3>🛠 Pending Requests (Librarian Panel)</h3>
          <p>[This section will be implemented in Phase 4]</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#d9534f',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
