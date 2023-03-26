import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Modal } from './Modal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <>
        <Story />
        <div id="modals" />
      </>
    ),
  ],
} as ComponentMeta<typeof Modal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  children: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium laboriosam hic impedit nam cupiditate dignissimos iusto magni accusamus quod doloremque corporis vel, vero nisi, fuga pariatur. Officiis corporis veritatis nihil fugit ad, tempora fugiat nesciunt dignissimos, deserunt explicabo sapiente asperiores assumenda ipsa suscipit illum? Ullam facilis officiis nihil quos eum!',
}
