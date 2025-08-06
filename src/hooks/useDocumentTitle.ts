import { useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const useDocumentTitle = (title: string) => {
  const { t, language } = useLanguage()
  
  useEffect(() => {
    const previousTitle = document.title
    const defaultTitle = t('site.title')
    
    // 设置新标题
    if (title && title !== defaultTitle) {
      document.title = `${title} - ${defaultTitle}`
    } else {
      document.title = defaultTitle
    }
    
    // 清理函数：组件卸载时恢复默认标题
    return () => {
      document.title = previousTitle
    }
  }, [title, t, language]) // 添加 language 依赖，确保语言切换时标题也会更新
}

export default useDocumentTitle