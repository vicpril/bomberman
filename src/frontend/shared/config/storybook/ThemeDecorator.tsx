import { FC } from 'react'
import cls from '@/app/App.scss'

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
