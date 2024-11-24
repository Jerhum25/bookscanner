import React from "react";
import "../styles/BookInfo.scss";

const BookInfo = ({ book }) => {
  if (!book) return <p>Aucun livre scanné pour le moment.</p>;
console.log(book);

  return (
    <div className="book-info">
      <h2>{book.title}</h2>
      <p>
        <strong>Auteur(s):</strong>{" "}
        {book.authors.map((author) => author).join(", ")}
      </p>
      <p>
        <strong>Éditeur:</strong> {book.publisher}
      </p>
      <p>
        <strong>Publié en:</strong> {book.publishDate}
      </p>
      {/* <img src={book.cover.medium} alt="book" /> */}
    </div>
  );
};

export default BookInfo;
