import React, { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, Close } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { searchArticles } from '../../utils/articleLoader'
import type { Article } from '../../types'
import './Search.css'

interface SearchProps {
  isGlobal?: boolean
}

const Search: React.FC<SearchProps> = ({ isGlobal = false }) => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 搜索功能
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const performSearch = async () => {
      setLoading(true)
      try {
        const results = await searchArticles(searchValue)
        setSearchResults(results)
        setShowResults(true)
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }

    // 添加防抖
    const timeoutId = setTimeout(performSearch, 300)
    return () => clearTimeout(timeoutId)
  }, [searchValue])

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      
      if (e.key === 'Escape') {
        setShowResults(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleArticleClick = (articleId: string) => {
    navigate(`/p/${articleId}`)
    setShowResults(false)
    setSearchValue('')
  }

  const clearSearch = () => {
    setSearchValue('')
    setShowResults(false)
  }

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="search-highlight">{part}</mark>
      ) : part
    )
  }

  return (
    <div className={`search-wrapper ${isGlobal ? 'search-global' : ''}`} ref={searchRef}>
      <div className="search-container">
        <SearchIcon className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder={t('search.placeholder')}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          onFocus={() => searchValue && setShowResults(true)}
        />
        {searchValue && (
          <button className="search-clear" onClick={clearSearch}>
            <Close />
          </button>
        )}
        <span className="search-shortcut">Ctrl+K</span>
      </div>
      
      {showResults && (
        <div className="search-results">
          {loading ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <span>{t('common.loading')}</span>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="search-results-header">
                {t('search.resultsCount', { count: searchResults.length })}
              </div>
              <div className="search-results-list">
                {searchResults.map((article) => (
                  <div
                    key={article.id}
                    className="search-result-item"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <h3 className="search-result-title">
                      {highlightText(article.title, searchValue)}
                    </h3>
                    {article.description && (
                      <p className="search-result-description">
                        {highlightText(article.description, searchValue)}
                      </p>
                    )}
                    <div className="search-result-meta">
                      <span className="search-result-id">ID: {article.id}</span>
                      {article.category && (
                        <span className="search-result-category">
                          {highlightText(article.category, searchValue)}
                        </span>
                      )}
                      {article.tags.length > 0 && (
                        <div className="search-result-tags">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="search-result-tag">
                              {highlightText(tag, searchValue)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="search-no-results">
              <p>{t('search.noResults')}</p>
              <p className="search-tip">提示：可以输入文章ID或标题进行搜索</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search