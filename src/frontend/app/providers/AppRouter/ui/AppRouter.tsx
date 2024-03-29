import { Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageLoader } from '@/widgets/PageLoader'
import { AppRoutesProps } from '@/shared/const/router'
import cls from './AppRouter.module.scss'
import { RequireAuth } from './RequireAuth'
import { routerConfig } from '../config/routeConfig'

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
        element={route.authRequired ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
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
