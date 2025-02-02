import { FC } from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

interface Book {
  id: string;
  title: string;
  description: string;
  cover: string;
  author: string;
  genre: string;
}

const books: Book[] = [
  {
    id: 'heroic-fantasy',
    title: 'Les Chroniques de la Montagne',
    description: 'Un moine guerrier quitte son monastère pour une quête épique dans un monde d\'heroic fantasy.',
    cover: '/covers/mountain.jpg',
    author: 'NarativeForge',
    genre: 'Heroic Fantasy'
  }
  // Autres livres à venir
];

const BookList: FC = () => {
  return (
    <div className="book-list">
      <h1 className="book-list-title">Choisissez votre aventure</h1>
      <div className="books-grid">
        {books.map(book => (
          <Link 
            key={book.id} 
            to={`/book/${book.id}`}
            className="book-card"
          >
            <div className="book-image">
              <span className="book-image-placeholder">📚</span>
            </div>
            <div className="book-content">
              <div className="book-header">
                <h2 className="book-title">{book.title}</h2>
                <span className="book-genre">{book.genre}</span>
              </div>
              <p className="book-description">{book.description}</p>
              <div className="book-footer">
                <span className="book-author">{book.author}</span>
                <span className="start-reading">Commencer l'aventure →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList; 