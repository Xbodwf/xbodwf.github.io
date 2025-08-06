class ThemeManager {
  private static instance: ThemeManager
  private loadingPromises: Map<string, Promise<void>> = new Map()

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager()
    }
    return ThemeManager.instance
  }

  async loadHighlightTheme(theme: 'light' | 'dark'): Promise<void> {
    const themeKey = `hljs-${theme}`
    
    // 如果正在加载相同主题，返回现有的 Promise
    if (this.loadingPromises.has(themeKey)) {
      return this.loadingPromises.get(themeKey)!
    }

    // 检查是否已经加载了相同的主题
    const existingSameTheme = document.querySelector(`link[data-hljs-theme][data-theme-type="${theme}"]`)
    if (existingSameTheme) {
      // 移除其他主题
      this.removeOtherThemes(theme)
      return Promise.resolve()
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      const newLink = document.createElement('link')
      newLink.rel = 'stylesheet'
      newLink.setAttribute('data-hljs-theme', 'true')
      newLink.setAttribute('data-theme-type', theme)
      
      if (theme === 'dark') {
        newLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
      } else {
        newLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
      }
      
      newLink.onload = () => {
        // 新主题加载完成后，移除旧主题
        this.removeOtherThemes(theme)
        this.loadingPromises.delete(themeKey)
        resolve()
      }
      
      newLink.onerror = () => {
        console.error(`Failed to load highlight.js theme: ${theme}`)
        this.loadingPromises.delete(themeKey)
        reject(new Error(`Failed to load theme: ${theme}`))
      }
      
      document.head.appendChild(newLink)
    })

    this.loadingPromises.set(themeKey, loadPromise)
    return loadPromise
  }

  private removeOtherThemes(currentTheme: string): void {
    const allThemes = document.querySelectorAll('link[data-hljs-theme]')
    allThemes.forEach(link => {
      if (link.getAttribute('data-theme-type') !== currentTheme) {
        link.remove()
      }
    })
  }

  // 预加载主题
  async preloadThemes(): Promise<void> {
    try {
      await Promise.all([
        this.loadHighlightTheme('light'),
        this.loadHighlightTheme('dark')
      ])
    } catch (error) {
      console.warn('Failed to preload some themes:', error)
    }
  }
}

export default ThemeManager