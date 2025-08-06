// 语言包的类型定义
export interface Translations {
  // 导航相关
  nav: {
    home: string
    about: string
    articles: string
    download: string
    help: string
    search: {
      placeholder: string
    }
  }

  // 搜索相关
  search: {
    resultsCount: string
    noResults: string
    placeholder: string
    inputPlaceholder: string
  }

  // 每日一言
  quote: {
    title: string
    loading: string
    error: string
  }

  // 欢迎页面
  welcome: {
    title: string
    description: string
  }

  // 关于页面
  about: {
    title: string
    blog: {
      title: string
      desc: string
    }
    tech: {
      title: string
      desc: string
    }
    me: {
      title: string
      desc: string
    }
  }

  // 主页内容
  home: {
    mainContent: {
      title: string
      subtitle: string
    }
    contact: {
      title: string
      subtitle: string
      email: string
      bilibili: string
    }
    footer: {
      products: {
        title: string
        github: string
        projects: string
        downloads: string
      }
      resources: {
        title: string
        documentation: string
        tutorials: string
        community: string
      }
      community: {
        title: string
        discussions: string
        issues: string
        contributions: string
      }
      contact: {
        title: string
        email: string
        social: string
        feedback: string
      }
    }
  }

  // 文章相关
  posts: {
    title: string
  }

  // 文章列表
  articleList: {
    title: string
    description: string
    loading: string
    empty: {
      title: string
      description: string
    }
    readMore: string
  }

  article: {
    loading: string
    notFound: string
    error: string
    author: string
    readTime: string
    publishedAt: string
    updatedAt: string
    tags: string
    category: string
    backToHome: string
  }

  // 404页面
  notFound: {
    title: string
    subtitle: string
    description: string
    backToHome: string
  }

  // 通用
  common: {
    loading: string
    error: string
    retry: string
    cancel: string
    confirm: string
    save: string
    edit: string
    delete: string
    search: string
    filter: string
    sort: string
    more: string
    less: string
    showMore: string
    showLess: string
  }

  // 时间相关
  time: {
    justNow: string
    minutesAgo: string
    hoursAgo: string
    daysAgo: string
    weeksAgo: string
    monthsAgo: string
    yearsAgo: string
    minute: string
    minutes: string
    hour: string
    hours: string
    day: string
    days: string
    week: string
    weeks: string
    month: string
    months: string
    year: string
    years: string
  }

  // 站点信息
  site: {
    title: string
  }
}

// 支持的语言列表
export const SUPPORTED_LANGUAGES = ['zh', 'en', 'ja'] as const

// 语言信息
export const LANGUAGE_INFO = {
  zh: { name: 'Chinese', nativeName: '中文' },
  en: { name: 'English', nativeName: 'English' },
  ja: { name: 'Japanese', nativeName: '日本語' }
} as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]