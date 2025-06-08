// src/pages/BrowseBooks.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrowseBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📚 Available Books</h2>
      {books.map(book => (
        <div key={book._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h4>{book.title}</h4>
          <p>Author: {book.author}</p>
          <Link
            to="/reserve-book"
            state={{ bookId: book._id }}
            style={{
              textDecoration: 'none',
              color: 'white',
              backgroundColor: '#007bff',
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

export default BrowseBooks;
