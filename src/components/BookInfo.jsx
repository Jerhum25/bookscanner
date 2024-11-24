import React from "react";
import "../styles/BookInfo.scss";
const BookInfo = ({ book }) => {
  if (!book) return <p>Aucun livre scanné pour le moment.</p>;
console.log(book.cover.small);

  return (
    <div className="book-info">
      <h2>{book.title}</h2>
      <p>
        <strong>Auteur(s):</strong>{" "}
        {book.authors.map((author) => author.name).join(", ")}
      </p>
      <p>
        <strong>Éditeur:</strong> {book.publishers[0].name}
      </p>
      <p>
        <strong>Publié en:</strong> {book.publish_date}
      </p>
      <img src={book.cover.medium} alt="book" />
    </div>
  );
};

export default BookInfo;
