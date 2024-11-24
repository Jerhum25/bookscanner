import React, { useState } from 'react';
import Scanner from './components/Scanner';
import BookInfo from './components/BookInfo';
import axios from 'axios';
import './styles/App.scss';

const App = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  const handleDetected = (isbn) => {
    setError("");
    axios
      .get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
      .then((response) => {
        const data = response.data[`ISBN:${isbn}`];
        if (data) {
          setBook(data);
        } else {
          setError("Livre non trouvé.");
        }
      })
      .catch(() => {
        setError("Erreur lors de la récupération des données.");
      });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Scanner de livres</h1>
      <Scanner onDetected={handleDetected} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BookInfo book={book} />
    </div>
  );
};

export default App;
