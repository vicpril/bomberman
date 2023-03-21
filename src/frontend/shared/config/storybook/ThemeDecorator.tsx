import 'app/styles/index.scss'
import { FC } from 'react'

interface Props {
  themeName: string
}

export const ThemeDecorator: FC<Props> = ({ children, themeName }) => (
  <div
    className={`app ${themeName}`}
    // style={{ padding: '10px' }}
  >
    {children}
  </div>
)
