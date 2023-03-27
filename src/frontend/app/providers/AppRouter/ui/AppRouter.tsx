import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routerConfig } from '@/shared/config/routerConfig'
import { PageLoader } from '@/widgets/PageLoader/ui/PageLoader'
import cls from './AppRouter.module.scss'

const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <div className={cls.pageWrapper}>
      <Routes>
        {Object.values(routerConfig).map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
      </Routes>
    </div>
  </Suspense>
)

export default AppRouter
