import { FC } from 'react'

interface Props {
  themeName: string
}

export const ThemeDecorator: FC<Props> = ({ children, themeName }) => (
  <div
    className={`app ${themeName}`}
  >
    {children}
  </div>
)
