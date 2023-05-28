import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RoutePaths } from '@/shared/config/routerConfig'
import { getUserAuthData } from '@/entities/User'

interface RequireAuthProps {
  children: JSX.Element
}

export const RequireAuth = (props: RequireAuthProps) => {
  const { children } = props

  const auth = useSelector(getUserAuthData)?.id

  if (!auth) {
    return <Navigate to={RoutePaths.main} replace />
  }

  return children
}
