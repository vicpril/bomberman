import { Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/app/providers/ThemeProvider'
import { userActions } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
// import { Sidebar } from '@/widgets/Sidebar'
import { AppRouter } from './providers/AppRouter'
import './App.scss'

function App() {
  const { theme } = useTheme()

  const dispatch = useDispatch()
  dispatch(userActions.initAuthData())

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="contentPage">
          {/* <Sidebar /> */}
          <AppRouter />
        </div>
      </Suspense>

      <div id="modals" />
    </div>
  )
}

export default App
