import { Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutesProps, routerConfig } from '@/shared/config/routerConfig'
import { PageLoader } from '@/widgets/PageLoader/ui/PageLoader'
import cls from './AppRouter.module.scss'
import { RequireAuth } from './RequireAuth'

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        <div className={cls.pageWrapper}>
          {route.element}
        </div>
      </Suspense>
    )

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authRequired ? <RequireAuth>{element}</RequireAuth> : element}
      />
    )
  }, [])

  return (

    <Routes>
      {Object.values(routerConfig).map(renderWithWrapper)}
    </Routes>
  )
}

export default AppRouter
