import { render, screen } from '@testing-library/react'
import { Button, ButtonTheme } from './Button'

describe('Button component', () => {
  test('Test created', () => {
    render(<Button>TEST</Button>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })

  test('Test clear theme', () => {
    render(<Button theme={ButtonTheme.Clear}>TEST</Button>)
    expect(screen.getByText('TEST')).toHaveClass('clear')
    // screen.debug()
  })
})
