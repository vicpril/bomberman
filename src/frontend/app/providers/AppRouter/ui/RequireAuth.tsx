import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {
  UserRoles, getUserAuthData,
} from '@/entities/User'
import { RoutePaths } from '@/shared/const/router'

interface RequireAuthProps {
  children: JSX.Element
  roles?: UserRoles[]
}

export const RequireAuth = (props: RequireAuthProps) => {
  const { children, roles } = props

  const authData = useSelector(getUserAuthData)

  if (!authData?.id) {
    return <Navigate to={RoutePaths.main} replace />
  }

  if (roles && !roles.some((role) => !!authData.roles?.includes(role))) {
    return <Navigate to={RoutePaths.forbidden} replace />
  }

  return children
}
