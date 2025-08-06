import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Article from './components/Article/Article'
import ArticleList from './pages/ArticleList/ArticleList'
import NotFound from './pages/NotFound/NotFound'
import './App.css'
import './assets/fonts/fonts.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/p" element={<ArticleList />} />
                <Route path="/p/:id" element={<Article />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App