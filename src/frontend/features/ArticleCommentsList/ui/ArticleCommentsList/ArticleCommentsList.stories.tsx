import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
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
    articleId: '1',
}
Normal.decorators = [StoreDecorator({})]
