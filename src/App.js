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
      .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then((response) => {
        const items = response.data.items;
        if (items && items.length > 0) {
          const book = items[0].volumeInfo;
          setBook({
            title: book.title,
            authors: book.authors || ["Auteur inconnu"],
            publisher: book.publisher || "Éditeur inconnu",
            publishDate: book.publishedDate || "Date inconnue",
          });
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
