import { ReactNode } from 'react'

interface Props {
  themeName: string
  children?: ReactNode
}

export const ThemeDecorator = ({ children, themeName }: Props) => (
  <div
    className={`app ${themeName}`}
  >
    {children}
  </div>
)
