import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleCommentsList } from './ArticleCommentsList'

export default {
  title: 'features/ArticleCommentsList',
  component: ArticleCommentsList,
  args: {
    children: 'ArticleCommentsList',
  },
} as ComponentMeta<typeof ArticleCommentsList>

const Template: ComponentStory<typeof ArticleCommentsList> = (args) => <ArticleCommentsList {...args} />

export const Normal = Template.bind({})
Normal.args = {

}
