import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { ArticlesFilters } from './ArticlesFilters'
import { ArticleSortProps } from '../../model/types/articlesFilters'
import { articleFiltersReducer } from '../../model/slices/articlesFiltersSlice'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'features/ArticlesFilters',
    component: ArticlesFilters,
    args: {
        children: 'ArticlesFilters',
    },
} as ComponentMeta<typeof ArticlesFilters>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticlesFilters> = (args) => <ArticlesFilters {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
    StoreDecorator(
        {
            articleFilters: {
                search: '',
                sort: ArticleSortProps.VIEWS,
                order: 'asc',
            },
        },
        {
            articleFilters: articleFiltersReducer,
        },
    ),
]
