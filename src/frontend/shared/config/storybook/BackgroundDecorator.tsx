import { DecoratorFn } from '@storybook/react'

export const BackgroundDecorator: DecoratorFn = (Story, { parameters }) => {
    const color = parameters.background === 'inverted' ? '--bg-color-inverted' : '--bg-color'
    return (
        <div style={{ backgroundColor: `var(${color})` }}>
            <Story />
        </div>
    )
}
