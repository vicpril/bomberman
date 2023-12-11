import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleRecomendationList } from './ArticleRecomendationList'

export default {
  title: 'features/ArticleRecomendationList',
  component: ArticleRecomendationList,
  args: {
    children: 'ArticleRecomendationList',
  },
} as ComponentMeta<typeof ArticleRecomendationList>

const Template: ComponentStory<typeof ArticleRecomendationList> = (args) => <ArticleRecomendationList {...args} />

export const Normal = Template.bind({})
Normal.args = {

}
