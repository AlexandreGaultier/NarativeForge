import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BookList from './components/BookList'
import BookReader from './components/BookReader'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <Router>
      <div className={`app ${theme}`}>
        <nav className="nav">
          <div className="nav-content">
            <Link to="/" className="nav-title">NarativeForge</Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Lire</Link>
              <Link to="/create" className="nav-link">Créer</Link>
              <button 
                onClick={toggleTheme} 
                className="theme-toggle"
              >
                {theme === 'dark' ? '☀️ Mode clair' : '🌙 Mode sombre'}
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:bookId" element={<BookReader />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
