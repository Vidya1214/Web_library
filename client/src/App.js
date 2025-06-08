import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BrowseBooks from './pages/BrowseBooks';
import BrowseRooms from './pages/BrowseRooms';
import ReservationFormBook from './pages/ReservationFormBook';
import ReservationFormRoom from './pages/ReservationFormRoom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse-books"
          element={
            <ProtectedRoute>
              <BrowseBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse-rooms"
          element={
            <ProtectedRoute>
              <BrowseRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reserve-book"
          element={
            <ProtectedRoute>
              <ReservationFormBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reserve-room"
          element={
            <ProtectedRoute>
              <ReservationFormRoom />
            </ProtectedRoute>
          }
        />

        {/* Optional: Fallback Route for unmatched paths */}
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
