import { SelectOption } from '@/shared/ui/Select'

export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT'
}

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

export enum ArticleView {
  BIG = 'BIG',
  SMALL = 'SMALL'
}
