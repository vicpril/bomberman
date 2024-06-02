import { Suspense } from 'react'
import { isUserLoading } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import './App.scss'
import { Loader } from '@/shared/ui/Loader'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/widgets/Footer'

function App() {
    const { theme } = useTheme()

    const isLoadingUserData = useSelector(isUserLoading)

    const content = isLoadingUserData ? <Loader /> : <Outlet />

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
                        <div className="container">{content}</div>
                    </Suspense>
                </main>
                <footer>
                    <div className="container">
                        <Footer />
                    </div>
                </footer>
            </div>

            <div id="modals" />
        </div>
    )
}

export default App
