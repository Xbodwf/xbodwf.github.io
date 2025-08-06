import React, { useState, useEffect } from 'react'
import type { Hitokoto } from '../../types'
import { useLanguage } from '../../contexts/LanguageContext'
import './DailyQuote.css'

const DailyQuote: React.FC = () => {
  const [hitokoto, setHitokoto] = useState<Hitokoto | null>(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchHitokoto = async () => {
      try {
        const response = await fetch('https://v1.hitokoto.cn/?encode=json')
        const data = await response.json()
        setHitokoto(data)
      } catch (error) {
        console.error('Failed to fetch daily quote:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHitokoto()
  }, [])

  return (
    <section className="quote-section">
      <div className="container">
        <div className="quote-card">
          <h2 className="quote-title">{t('quote.title')}</h2>
          {loading ? (
            <div className="quote-loading">
              <div className="loading-spinner"></div>
              <span>{t('quote.loading')}</span>
            </div>
          ) : hitokoto ? (
            <div className="quote-content">
              <blockquote className="quote-text">
                "{hitokoto.hitokoto}"
              </blockquote>
              <div className="quote-attribution">
                <span className="quote-source">
                  —— {hitokoto.from_who ? `${hitokoto.from_who}，` : ''}《{hitokoto.from}》
                </span>
              </div>
            </div>
          ) : (
            <div className="quote-error">
              <span>{t('quote.error')}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DailyQuote