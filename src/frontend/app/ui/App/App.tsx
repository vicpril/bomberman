import { Suspense, useEffect } from 'react'
import { getAccessToken, initUserData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import './App.scss'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Loader } from '@/shared/ui/Loader'

function App() {
    const { theme } = useTheme()

    const dispatch = useAppDispatch()

    const token = getAccessToken()

    useEffect(() => {
        if (token) dispatch(initUserData())
    }, [dispatch, token])

    return (
        <div className={classNames('app', {}, [theme])}>
            <div className="app-content">
                <header>
                    <div className="container">
                        <Navbar />
                    </div>
                </header>
                <main>
                    <Suspense fallback={<Loader />}>
                        <div className="container">
                            <Outlet />
                        </div>
                    </Suspense>
                </main>
            </div>

            <div id="modals" />
        </div>
    )
}

export default App
