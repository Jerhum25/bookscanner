import React, { useState } from 'react';
import Scanner from './components/Scanner';
import BookInfo from './components/BookInfo';
import axios from 'axios';
import './styles/App.scss';

const App = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [manualCode, setManualCode] = useState("");

  const handleDetected = (isbn) => {
    fetchBookInfo(isbn);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim() === "") {
      setError("Veuillez entrer un code-barres valide.");
      return;
    }
    fetchBookInfo(manualCode);
  };

  const fetchBookInfo = (isbn) => {
    setError("");
    setBook(null); // Réinitialise les données précédentes
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
      <div className="manual-input">
        <input
          type="text"
          placeholder="Entrez le code-barres ici"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
        />
        <button onClick={handleManualSubmit}>Rechercher</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BookInfo book={book} />
    </div>
  );
};

export default App;
