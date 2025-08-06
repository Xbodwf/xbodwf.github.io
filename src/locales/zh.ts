import type { Translations } from './index'

export const zh: Translations = {
  // 导航相关
  nav: {
    home: '首页',
    about: '关于',
    articles: '文章',
    download: '下载',
    help: '帮助',
    search: {
      placeholder: '搜索文章...',
    }
  },

  // 搜索相关
  search: {
    resultsCount: '找到 {count} 个结果',
    noResults: '没有找到相关文章',
    placeholder: '搜索 页面 文章 和 内容',
    inputPlaceholder: '开始输入以搜索文章...'
  },

  // 每日一言
  quote: {
    title: '每日一言',
    loading: '加载中...',
    error: '获取失败，请稍后重试'
  },

  // 欢迎页面
  welcome: {
    title: '欢迎来到我的个人博客',
    description: '在这里分享技术心得、生活感悟和学习笔记。希望我的文章能对你有所帮助。'
  },

  // 关于页面
  about: {
    title: '关于本站',
    blog: {
      title: '技术博客',
      desc: '记录学习过程中的技术心得，分享开发经验和解决方案。'
    },
    tech: {
      title: '技术栈',
      desc: '主要使用 React、TypeScript、Node.js 等现代前端技术栈。'
    },
    me: {
      title: '关于我',
      desc: '一名热爱编程的开发者，喜欢探索新技术，乐于分享知识。'
    }
  },

  // 主页内容
  home: {
    mainContent: {
      title: '主要项目',
      subtitle: '探索我的开源项目和创作内容'
    },
    contact: {
      title: '联系方式',
      subtitle: '欢迎与我交流和合作',
      email: '发送邮件',
      bilibili: '访问 Bilibili 空间'
    },
    footer: {
      products: {
        title: '产品',
        github: 'GitHub 仓库',
        projects: '开源项目',
        downloads: '下载中心'
      },
      resources: {
        title: '资源',
        documentation: '文档',
        tutorials: '教程',
        community: '社区'
      },
      community: {
        title: '社区',
        discussions: '讨论',
        issues: '问题反馈',
        contributions: '贡献指南'
      },
      contact: {
        title: '联系',
        email: '邮箱联系',
        social: '社交媒体',
        feedback: '意见反馈'
      }
    }
  },

  // 文章相关
  posts: {
    title: '最新文章'
  },

  // 文章列表
  articleList: {
    title: '文章列表',
    description: '探索技术文章、开发经验和思考分享',
    loading: '加载中...',
    empty: {
      title: '暂无文章',
      description: '还没有发布任何文章，请稍后再来查看。'
    },
    readMore: '阅读全文 →'
  },

  article: {
    loading: '文章加载中...',
    notFound: '文章未找到',
    error: '文章加载失败',
    author: '作者',
    readTime: '阅读时间',
    publishedAt: '发布于',
    updatedAt: '更新于',
    tags: '标签',
    category: '分类',
    backToHome: '返回首页'
  },

  // 404页面
  notFound: {
    title: '404',
    subtitle: '页面未找到',
    description: '抱歉，您访问的页面不存在或已被移动。',
    backToHome: '返回首页'
  },

  // 通用
  common: {
    loading: '加载中...',
    error: '出错了',
    retry: '重试',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    search: '搜索',
    filter: '筛选',
    sort: '排序',
    more: '更多',
    less: '收起',
    showMore: '显示更多',
    showLess: '显示更少'
  },

  // 时间相关
  time: {
    justNow: '刚刚',
    minutesAgo: '分钟前',
    hoursAgo: '小时前',
    daysAgo: '天前',
    weeksAgo: '周前',
    monthsAgo: '个月前',
    yearsAgo: '年前',
    minute: '分钟',
    minutes: '分钟',
    hour: '小时',
    hours: '小时',
    day: '天',
    days: '天',
    week: '周',
    weeks: '周',
    month: '个月',
    months: '个月',
    year: '年',
    years: '年'
  },

  // 站点信息
  site: {
    title: 'Xbodwf'
  }
}