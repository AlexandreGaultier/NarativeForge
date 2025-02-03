import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookReader.css';
import CharacterSheet from './CharacterSheet';
import InventorySheet from './InventorySheet';

interface Chapter {
  num: number;
  title: string;
  text: string;
  links: Array<{
    text: string;
    target: number;
  }>;
}

interface BookData {
  chapters: Chapter[];
}

const BookReader: FC = () => {
  const { bookId } = useParams();
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [bookData, setBookData] = useState<BookData | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await fetch(`/books/${bookId}.json`);
        const data = await response.json();
        setBookData(data);
        setCurrentChapter(data.chapters[0]);
      } catch (error) {
        console.error('Erreur lors du chargement du livre:', error);
      }

    };

    loadBook();
  }, [bookId]);

  const goToChapter = (num: number) => {
    if (bookData) {
      const nextChapter = bookData.chapters.find(ch => ch.num === num);
      if (nextChapter) {
        setCurrentChapter(nextChapter);
        window.scrollTo(0, 0);
      }
    }
  };

  if (!currentChapter) {
    return <div className="reader">Chargement...</div>;
  }

  return (
    <div className="reader-container">
      <div className="reader">
        <div className="chapter">
          <div className="chapter-content">
            <div className="chapter-text">{currentChapter.text}</div>
          </div>
          <div className="chapter-choices">
            {currentChapter.links.map((link, index) => (
              <button
                key={index}
                className="choice-button"
                onClick={() => goToChapter(link.target)}
              >
                {link.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="character-sheets">
        <CharacterSheet />
        <InventorySheet />
      </div>
    </div>
  );
};

export default BookReader; 