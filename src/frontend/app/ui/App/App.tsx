import { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated, userActions } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import './App.scss'
import { Outlet } from 'react-router-dom'

function App() {
    const { theme } = useTheme()

    const dispatch = useDispatch()
    dispatch(userActions.initAuthData())

    const isAuth = useSelector(isAuthenticated)

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <div className="app-content">
                    <header>
                        <div className="container">
                            <Navbar />
                        </div>
                    </header>
                    <main>
                        <div className="container">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </Suspense>

            <div id="modals" />
        </div>
    )
}

export default App
