import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, LightMode, DarkMode, Language, ExpandMore } from '@mui/icons-material'
import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import SearchModal from '../Search/SearchModal'
import type { SupportedLanguage } from '../../locales'
import './Header.css'

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t, SUPPORTED_LANGUAGES, LANGUAGE_INFO } = useLanguage()
  const languageRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isNavActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo">
              <Link to="/" className="logo-link">
                <div className="logo-icon">
                  <img src="/favicon.svg" alt="Logo" />
                </div>
                <span className="logo-text">{t('site.title')}</span>
              </Link>
            </div>
          </div>

          <div className="header-right">
            <nav className="header-nav">
              <Link 
                to="/" 
                className={`nav-link ${isNavActive('/') ? 'active' : ''}`}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/p" 
                className={`nav-link ${isNavActive('/p') ? 'active' : ''}`}
              >
                {t('nav.articles')}
              </Link>
              <Link 
                to="/download" 
                className={`nav-link ${isNavActive('/download') ? 'active' : ''}`}
              >
                {t('nav.download')}
              </Link>
              <Link 
                to="/help" 
                className={`nav-link ${isNavActive('/help') ? 'active' : ''}`}
              >
                {t('nav.help')}
              </Link>
            </nav>

            <div className="header-actions">
              <button
                className="icon-button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search />
              </button>

              <button
                className="icon-button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <LightMode /> : <DarkMode />}
              </button>

              <div className="language-dropdown" ref={languageRef}>
                <button
                  className="icon-button language-button"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  aria-label="Select language"
                >
                  <Language />
                  <span className="language-text">
                    {LANGUAGE_INFO[language].nativeName}
                  </span>
                  <ExpandMore className={`dropdown-arrow ${isLanguageOpen ? 'open' : ''}`} />
                </button>

                {isLanguageOpen && (
                  <div className="language-menu">
                    {SUPPORTED_LANGUAGES.map((lang: SupportedLanguage) => (
                      <button
                        key={lang}
                        className={`language-option ${language === lang ? 'active' : ''}`}
                        onClick={() => {
                          setLanguage(lang)
                          setIsLanguageOpen(false)
                        }}
                      >
                        <span className="language-native">
                          {LANGUAGE_INFO[lang].nativeName}
                        </span>
                        <span className="language-english">
                          {LANGUAGE_INFO[lang].name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  )
}

export default Header