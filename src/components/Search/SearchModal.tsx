import React, { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, Close } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import type { Article } from '../../types'
import './SearchModal.css'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // 加载所有文章
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articlePromises = [1, 2, 3].map(async (id) => {
          try {
            const response = await fetch(`/articles/${id}.md`)
            if (!response.ok) return null
            
            const content = await response.text()
            const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
            
            if (!frontMatterMatch) return null
            
            const frontMatter = parseFrontMatter(frontMatterMatch[1])
            const articleContent = content.slice(frontMatterMatch[0].length).trim()
            
            return {
              id: id.toString(),
              title: frontMatter.title || `文章 ${id}`,
              description: frontMatter.description || '',
              content: articleContent,
              createdAt: frontMatter.date || new Date().toISOString(),
              updatedAt: frontMatter.updated || frontMatter.date || new Date().toISOString(),
              category: frontMatter.category || '',
              tags: frontMatter.tags || [],
              authors: frontMatter.authors || []
            }
          } catch {
            return null
          }
        })
        
        const loadedArticles = (await Promise.all(articlePromises)).filter(Boolean) as Article[]
        setArticles(loadedArticles)
      } catch (error) {
        console.error('Failed to load articles:', error)
      }
    }
    
    loadArticles()
  }, [])

  // 解析 YAML front matter
  const parseFrontMatter = (yamlContent: string) => {
    const result: any = {}
    const lines = yamlContent.split(/\r?\n/)
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith('#')) continue
      
      const colonIndex = trimmedLine.indexOf(':')
      if (colonIndex === -1) continue
      
      const key = trimmedLine.slice(0, colonIndex).trim()
      const value = trimmedLine.slice(colonIndex + 1).trim()
      
      if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        result[key] = value.slice(1, -1).split(',').map(tag => tag.trim().replace(/['"]/g, ''))
      } else {
        result[key] = value.replace(/['"]/g, '')
      }
    }
    
    return result
  }

  // 搜索功能
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([])
      return
    }

    setLoading(true)
    const searchTerm = searchValue.toLowerCase()
    
    const results = articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      (article.description?.toLowerCase().includes(searchTerm) ?? false) ||
      article.content.toLowerCase().includes(searchTerm) ||
      (article.category?.toLowerCase().includes(searchTerm) ?? false) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
    
    setSearchResults(results)
    setLoading(false)
  }, [searchValue, articles])

  // 键盘事件处理
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // 自动聚焦
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleArticleClick = (articleId: string) => {
    navigate(`/p/${articleId}`)
    onClose()
    setSearchValue('')
  }

  const clearSearch = () => {
    setSearchValue('')
    setSearchResults([])
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

  if (!isOpen) return null

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-modal-input-container">
            <SearchIcon className="search-modal-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder={t('search.placeholder')}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-modal-input"
            />
            {searchValue && (
              <button className="search-modal-clear" onClick={clearSearch}>
                <Close />
              </button>
            )}
          </div>
          <button className="search-modal-close" onClick={onClose}>
            <Close />
          </button>
        </div>
        
        <div className="search-modal-content">
          {loading ? (
            <div className="search-modal-loading">
              <div className="loading-spinner"></div>
              <span>{t('common.loading')}</span>
            </div>
          ) : searchValue ? (
            searchResults.length > 0 ? (
              <>
                <div className="search-modal-results-header">
                  {t('search.resultsCount', { count: searchResults.length })}
                </div>
                <div className="search-modal-results">
                  {searchResults.map((article) => (
                    <div
                      key={article.id}
                      className="search-modal-result-item"
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
              <div className="search-modal-no-results">
                <p>{t('search.noResults')}</p>
              </div>
            )
          ) : (
            <div className="search-modal-empty">
              <p>{t('search.inputPlaceholder')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal