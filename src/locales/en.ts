import type { Translations } from './index'

export const en: Translations = {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    articles: 'Articles',
    download: 'Download',
    help: 'Help',
    search: {
      placeholder: 'Search articles...',
    }
  },

  // Search
  // 搜索相关
  search: {
    resultsCount: 'Found {count} results',
    noResults: 'No articles found',
    placeholder: 'Search pages, articles and content',
    inputPlaceholder: 'Start typing to search articles...'
  },

  // Daily Quote
  quote: {
    title: 'Daily Quote',
    loading: 'Loading...',
    error: 'Failed to load. Please try again later.'
  },

  // Welcome
  welcome: {
    title: 'Welcome to My Personal Blog',
    description: 'Here I share technical insights, life reflections, and learning notes. I hope my articles can be helpful to you.'
  },

  // About
  about: {
    title: 'About This Site',
    blog: {
      title: 'Tech Blog',
      desc: 'Recording technical insights during the learning process, sharing development experience and solutions.'
    },
    tech: {
      title: 'Tech Stack',
      desc: 'Mainly using modern frontend technologies like React, TypeScript, Node.js, etc.'
    },
    me: {
      title: 'About Me',
      desc: 'A developer who loves programming, enjoys exploring new technologies and sharing knowledge.'
    }
  },

  // Home Content
  home: {
    mainContent: {
      title: 'Featured Projects',
      subtitle: 'Explore my open source projects and creative content'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Feel free to reach out for collaboration and communication',
      email: 'Send Email',
      bilibili: 'Visit Bilibili Space'
    },
    footer: {
      products: {
        title: 'Products',
        github: 'GitHub Repository',
        projects: 'Open Source Projects',
        downloads: 'Download Center'
      },
      resources: {
        title: 'Resources',
        documentation: 'Documentation',
        tutorials: 'Tutorials',
        community: 'Community'
      },
      community: {
        title: 'Community',
        discussions: 'Discussions',
        issues: 'Issue Feedback',
        contributions: 'Contribution Guide'
      },
      contact: {
        title: 'Contact',
        email: 'Email Contact',
        social: 'Social Media',
        feedback: 'Feedback'
      }
    }
  },

  // Posts
  posts: {
    title: 'Latest Posts'
  },

  // Article List
  articleList: {
    title: 'Articles',
    description: 'Explore technical articles, development experience and insights',
    loading: 'Loading...',
    empty: {
      title: 'No Articles',
      description: 'No articles have been published yet. Please check back later.'
    },
    readMore: 'Read More →'
  },

  article: {
    loading: 'Loading article...',
    notFound: 'Article not found',
    error: 'Failed to load article',
    author: 'Author',
    readTime: 'Read time',
    publishedAt: 'Published at',
    updatedAt: 'Updated at',
    tags: 'Tags',
    category: 'Category',
    backToHome: 'Back to Home'
  },

  // 404 Page
  notFound: {
    title: '404',
    subtitle: 'Page Not Found',
    description: 'Sorry, the page you are looking for does not exist or has been moved.',
    backToHome: 'Back to Home'
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    more: 'More',
    less: 'Less',
    showMore: 'Show More',
    showLess: 'Show Less'
  },

  // Time
  time: {
    justNow: 'just now',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
    weeksAgo: 'weeks ago',
    monthsAgo: 'months ago',
    yearsAgo: 'years ago',
    minute: 'minute',
    minutes: 'minutes',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days',
    week: 'week',
    weeks: 'weeks',
    month: 'month',
    months: 'months',
    year: 'year',
    years: 'years'
  },

  // Site
  site: {
    title: 'Xbodwf'
  }
}