import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { GameRateModal } from './GameRateModal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/GameRateModal',
    component: GameRateModal,
    args: {
        children: 'GameRateModal',
    },
    decorators: [
        (Story) => (
            <>
                <Story />
                <div id="modals" />
            </>
        ),
    ],
} as ComponentMeta<typeof GameRateModal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof GameRateModal> = (args) => <GameRateModal {...args} />

export const Normal = Template.bind({})
Normal.args = {
    isOpen: true,
}
Normal.decorators = [StoreDecorator({})]
