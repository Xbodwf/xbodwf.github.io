import type { Translations } from './index'

export const ja: Translations = {
  // ナビゲーション
  nav: {
    home: 'ホーム',
    about: 'について',
    articles: '記事',
    download: 'ダウンロード',
    help: 'ヘルプ',
    search: {
      placeholder: '記事を検索...',
    }
  },

  // 検索
  // 搜索相关
  search: {
    resultsCount: '{count} 件の結果が見つかりました',
    noResults: '記事が見つかりませんでした',
    placeholder: 'ページ、記事、コンテンツを検索',
    inputPlaceholder: '記事を検索するために入力を開始...'
  },

  // 今日の一言
  quote: {
    title: '今日の一言',
    loading: '読み込み中...',
    error: '読み込みに失敗しました。後でもう一度お試しください'
  },

  // ウェルカム
  welcome: {
    title: '私の個人ブログへようこそ',
    description: 'ここでは技術的な洞察、人生の考察、学習ノートを共有しています。私の記事があなたのお役に立てれば幸いです。'
  },

  // について
  about: {
    title: 'このサイトについて',
    blog: {
      title: '技術ブログ',
      desc: '学習過程での技術的な洞察を記録し、開発経験とソリューションを共有しています。'
    },
    tech: {
      title: '技術スタック',
      desc: '主にReact、TypeScript、Node.jsなどのモダンなフロントエンド技術を使用しています。'
    },
    me: {
      title: '私について',
      desc: 'プログラミングを愛する開発者で、新しい技術を探求し、知識を共有することを楽しんでいます。'
    }
  },

  // ホームコンテンツ
  home: {
    mainContent: {
      title: '主要プロジェクト',
      subtitle: 'オープンソースプロジェクトとクリエイティブコンテンツを探索'
    },
    contact: {
      title: '連絡先',
      subtitle: 'コラボレーションやコミュニケーションをお気軽にどうぞ',
      email: 'メールを送信',
      bilibili: 'Bilibiliスペースを訪問'
    },
    footer: {
      products: {
        title: '製品',
        github: 'GitHubリポジトリ',
        projects: 'オープンソースプロジェクト',
        downloads: 'ダウンロードセンター'
      },
      resources: {
        title: 'リソース',
        documentation: 'ドキュメント',
        tutorials: 'チュートリアル',
        community: 'コミュニティ'
      },
      community: {
        title: 'コミュニティ',
        discussions: 'ディスカッション',
        issues: '問題フィードバック',
        contributions: '貢献ガイド'
      },
      contact: {
        title: '連絡',
        email: 'メール連絡',
        social: 'ソーシャルメディア',
        feedback: 'フィードバック'
      }
    }
  },

  // 投稿
  posts: {
    title: '最新記事'
  },

  // 記事リスト
  articleList: {
    title: '記事一覧',
    description: '技術記事、開発経験、洞察を探索',
    loading: '読み込み中...',
    empty: {
      title: '記事がありません',
      description: 'まだ記事が公開されていません。後でもう一度確認してください。'
    },
    readMore: '続きを読む →'
  },

  article: {
    loading: '記事を読み込み中...',
    notFound: '記事が見つかりません',
    error: '記事の読み込みに失敗しました',
    author: '著者',
    readTime: '読了時間',
    publishedAt: '公開日',
    updatedAt: '更新日',
    tags: 'タグ',
    category: 'カテゴリ',
    backToHome: 'ホームに戻る'
  },

  // 404ページ
  notFound: {
    title: '404',
    subtitle: 'ページが見つかりません',
    description: '申し訳ございませんが、お探しのページは存在しないか移動されました。',
    backToHome: 'ホームに戻る'
  },

  // 共通
  common: {
    loading: '読み込み中...',
    error: 'エラー',
    retry: '再試行',
    cancel: 'キャンセル',
    confirm: '確認',
    save: '保存',
    edit: '編集',
    delete: '削除',
    search: '検索',
    filter: 'フィルター',
    sort: 'ソート',
    more: 'もっと',
    less: '少なく',
    showMore: 'もっと見る',
    showLess: '少なく表示'
  },

  // 時間
  time: {
    justNow: 'たった今',
    minutesAgo: '分前',
    hoursAgo: '時間前',
    daysAgo: '日前',
    weeksAgo: '週間前',
    monthsAgo: 'ヶ月前',
    yearsAgo: '年前',
    minute: '分',
    minutes: '分',
    hour: '時間',
    hours: '時間',
    day: '日',
    days: '日',
    week: '週',
    weeks: '週',
    month: 'ヶ月',
    months: 'ヶ月',
    year: '年',
    years: '年'
  },

  // サイト
  site: {
    title: 'Xbodwf'
  }
}