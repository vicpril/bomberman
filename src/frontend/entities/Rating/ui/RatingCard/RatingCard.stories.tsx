import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RatingCard } from './RatingCard'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/RatingCard',
    component: RatingCard,
    args: {
        children: 'RatingCard',
    },
} as ComponentMeta<typeof RatingCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard {...args} />

export const Normal = Template.bind({})
Normal.args = {}

export const WithRating = Template.bind({})
WithRating.args = {
    rate: 4,
}
