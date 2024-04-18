import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { Article } from '@/entities/Article'
import withMock from 'storybook-addon-mock'
import { ArticleRecomendationList } from './ArticleRecomendationList'

const article: Article = {
  id: '1',
  img: 'assets/storybook.jpeg',
  createdAt: '',
  views: 111,
  user: { id: '1', username: '123' },
  blocks: [],
  type: [],
  title: 'Тестовая статья',
  subtitle: 'статья',
}

export default {
  title: 'features/ArticleRecomendationList',
  component: ArticleRecomendationList,
  args: {
    children: 'ArticleRecomendationList',
  },
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRecomendationList>

const Template: ComponentStory<typeof ArticleRecomendationList> = (args) => <ArticleRecomendationList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
Normal.parameters = {
  mockData: [
    {
      url: `${__API_JSON__}/articles?_limit=3`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
      ],
    },
  ],
}
