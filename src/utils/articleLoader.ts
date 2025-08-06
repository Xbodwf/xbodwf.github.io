import type { Article } from '../types'

interface ArticleMetadata {
  id: string
  filename: string
  title: string
  description: string
}

interface FilesConfig {
  articles: ArticleMetadata[]
}

// 解析 YAML front matter
export const parseFrontMatter = (yamlContent: string) => {
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

// 加载文章配置
export const loadArticlesConfig = async (): Promise<FilesConfig> => {
  try {
    const response = await fetch('/articles/files.json')
    if (!response.ok) {
      throw new Error('Failed to load articles config')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading articles config:', error)
    // 返回默认配置作为后备
    return {
      articles: [
        { id: '1', filename: '1.md', title: '文章 1', description: '' },
        { id: '2', filename: '2.md', title: '文章 2', description: '' },
        { id: '3', filename: '3.md', title: '文章 3', description: '' }
      ]
    }
  }
}

// 加载单个文章
export const loadArticle = async (id: string): Promise<Article | null> => {
  try {
    const config = await loadArticlesConfig()
    const articleMeta = config.articles.find(article => article.id === id)
    
    if (!articleMeta) {
      return null
    }
    
    const response = await fetch(`/articles/${articleMeta.filename}`)
    if (!response.ok) {
      return null
    }
    
    const content = await response.text()
    const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    
    if (!frontMatterMatch) {
      return null
    }
    
    const frontMatter = parseFrontMatter(frontMatterMatch[1])
    const articleContent = content.slice(frontMatterMatch[0].length).trim()
    
    return {
      id: articleMeta.id,
      title: frontMatter.title || articleMeta.title,
      description: frontMatter.description || articleMeta.description,
      content: articleContent,
      createdAt: frontMatter.date || new Date().toISOString(),
      updatedAt: frontMatter.updated || frontMatter.date || new Date().toISOString(),
      category: frontMatter.category || '',
      tags: frontMatter.tags || [],
      authors: frontMatter.authors || []
    }
  } catch (error) {
    console.error('Error loading article:', error)
    return null
  }
}

// 加载所有文章
export const loadAllArticles = async (): Promise<Article[]> => {
  try {
    const config = await loadArticlesConfig()
    const articlePromises = config.articles.map(articleMeta => loadArticle(articleMeta.id))
    const articles = await Promise.all(articlePromises)
    return articles.filter(Boolean) as Article[]
  } catch (error) {
    console.error('Error loading all articles:', error)
    return []
  }
}

// 搜索文章（按ID或标题）
export const searchArticles = async (query: string): Promise<Article[]> => {
  if (!query.trim()) {
    return []
  }
  
  const config = await loadArticlesConfig()
  const searchTerm = query.toLowerCase()
  
  // 首先检查是否是精确的ID匹配
  const exactIdMatch = config.articles.find(article => article.id === query)
  if (exactIdMatch) {
    const article = await loadArticle(exactIdMatch.id)
    return article ? [article] : []
  }
  
  // 然后进行标题和描述的模糊搜索
  const matchingMeta = config.articles.filter(article => 
    article.id.toLowerCase().includes(searchTerm) ||
    article.title.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm)
  )
  
  const articlePromises = matchingMeta.map(meta => loadArticle(meta.id))
  const articles = await Promise.all(articlePromises)
  return articles.filter(Boolean) as Article[]
}