import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>

      {user.role === 'member' ? (
        <div>
          <h3>📖 Your Book & Room Reservations</h3>
          <p>[To be implemented in Phase 2]</p>
        </div>
      ) : (
        <div>
          <h3>🛠 Pending Requests (Librarian Panel)</h3>
          <p>[To be implemented in Phase 4]</p>
        </div>
      )}

      <button
        onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
