import React, { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js'
import { ContentCopy, Check } from '@mui/icons-material'
import { useTheme } from '../../contexts/ThemeContext'
import ThemeManager from '../../utils/themeManager'
import './CodeBlock.css'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'text', 
  className = '' 
}) => {
  const codeRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const [themeLoading, setThemeLoading] = useState(false)
  const { theme } = useTheme()

  // 获取语言显示名称
  const getLanguageDisplayName = (lang: string): string => {
    const languageMap: Record<string, string> = {
      'js': 'JavaScript',
      'javascript': 'JavaScript',
      'ts': 'TypeScript',
      'typescript': 'TypeScript',
      'jsx': 'JSX',
      'tsx': 'TSX',
      'py': 'Python',
      'python': 'Python',
      'java': 'Java',
      'cpp': 'C++',
      'c': 'C',
      'cs': 'C#',
      'csharp': 'C#',
      'php': 'PHP',
      'rb': 'Ruby',
      'ruby': 'Ruby',
      'go': 'Go',
      'rust': 'Rust',
      'swift': 'Swift',
      'kotlin': 'Kotlin',
      'dart': 'Dart',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sass': 'Sass',
      'less': 'Less',
      'json': 'JSON',
      'xml': 'XML',
      'yaml': 'YAML',
      'yml': 'YAML',
      'toml': 'TOML',
      'ini': 'INI',
      'sql': 'SQL',
      'bash': 'Bash',
      'sh': 'Shell',
      'powershell': 'PowerShell',
      'ps1': 'PowerShell',
      'dockerfile': 'Dockerfile',
      'makefile': 'Makefile',
      'markdown': 'Markdown',
      'md': 'Markdown',
      'text': 'Text',
      'txt': 'Text',
      'plaintext': 'Text'
    }
    
    return languageMap[lang.toLowerCase()] || lang.toUpperCase()
  }

  useEffect(() => {
    const loadTheme = async () => {
      setThemeLoading(true)
      try {
        const themeManager = ThemeManager.getInstance()
        await themeManager.loadHighlightTheme(theme)
      } catch (error) {
        console.error('Failed to load theme:', error)
      } finally {
        setThemeLoading(false)
      }
    }

    loadTheme()
  }, [theme])

  useEffect(() => {
    if (!themeLoading && codeRef.current) {
      // 清除之前的高亮
      codeRef.current.removeAttribute('data-highlighted')
      codeRef.current.className = `language-${language}`
      
      // 应用语法高亮
      try {
        hljs.highlightElement(codeRef.current)
      } catch (error) {
        console.error('Highlight error:', error)
      }
    }
  }, [code, language, theme, themeLoading])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
      // 降级方案：使用传统的复制方法
      const textArea = document.createElement('textarea')
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div className={`code-block ${className} ${themeLoading ? 'theme-loading' : ''}`}>
      <div className="code-header">
        <span className="code-language">
          {getLanguageDisplayName(language)}
        </span>
        <button
          className="copy-button"
          onClick={copyToClipboard}
          aria-label="Copy code to clipboard"
          title={copied ? 'Copied!' : 'Copy'}
        >
          {copied ? <Check /> : <ContentCopy />}
          <span className="copy-text">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
      <pre className="code-pre"><code ref={codeRef} className={`language-${language}`}>{code}</code></pre>
    </div>
  )
}

export default CodeBlock