import React from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useLanguage } from '../../contexts/LanguageContext'
import './NotFound.css'

const NotFound: React.FC = () => {
  const { t } = useLanguage()
  
  useDocumentTitle(t('notFound.subtitle'))

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">{t('notFound.title')}</h1>
        <h2 className="not-found-subtitle">{t('notFound.subtitle')}</h2>
        <p className="not-found-description">
          {t('notFound.description')}
        </p>
        <Link to="/" className="not-found-link">
          {t('notFound.backToHome')}
        </Link>
      </div>
    </div>
  )
}

export default NotFound