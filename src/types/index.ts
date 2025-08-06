export interface Hitokoto {
  id: number
  uuid: string
  hitokoto: string
  type: string
  from: string
  from_who: string | null
  creator: string
  creator_uid: number
  reviewer: number
  commit_from: string
  created_at: string
  length: number
}

export interface Author {
  name: string
  email?: string
  website?: string
  github?: string
}

export interface Article {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags: string[]
  authors: Author[]
  description?: string
  category?: string
}

export type Theme = 'light' | 'dark'
export type Language = 'zh' | 'en' | 'ja'