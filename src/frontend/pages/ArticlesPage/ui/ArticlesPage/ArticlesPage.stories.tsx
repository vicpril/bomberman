import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { Article } from '@/entities/Article'
import ArticlesPage from './ArticlesPage'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
// import { articleFiltersReducer } from '@/features/ArticlesFilters'

const article: Article = {
  id: '1',
  img: '',
  createdAt: '',
  views: 111,
  user: { id: '1', username: '123' },
  blocks: [],
  type: [],
  title: 'Тестовая статья',
  subtitle: 'статья',
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'pages/articles/ArticlesPage',
  component: ArticlesPage,
  args: {
    children: 'ArticlesPage',
  },
} as ComponentMeta<typeof ArticlesPage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({
  articlesPage: {
    entities: {
      1: { ...article, id: '1' },
      2: { ...article, id: '2' },
      3: { ...article, id: '3' },
      4: { ...article, id: '4' },
      5: { ...article, id: '5' },
      6: { ...article, id: '6' },
      7: { ...article, id: '7' },
    },
    ids: ['1', '2', '3', '4', '5', '6', '7'],
  },
}, {
  articlesPage: articlesPageReducer,
  // articleFilters: articleFiltersReducer,
})]
