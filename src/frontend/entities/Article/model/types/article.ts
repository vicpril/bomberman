import { User } from '@/entities/User'
import { SelectOption } from '@/shared/ui/Select/Select'

export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: string[];
  title?: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export enum ArticleType {
  ALL = 'ALL',
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS'
}

export const articleTypeOptions: SelectOption<ArticleType>[] = [
  { value: ArticleType.ALL, label: 'Все' },
  { value: ArticleType.ECONOMICS, label: 'Экономика' },
  { value: ArticleType.IT, label: 'Айти' },
  { value: ArticleType.SCIENCE, label: 'Наука' },
]

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
  user: User
}

export enum ArticleView {
  BIG = 'BIG',
  SMALL = 'SMALL',
}
