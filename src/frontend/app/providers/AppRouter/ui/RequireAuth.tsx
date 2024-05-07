import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getUserAuthData } from '@/entities/User'
import { GetRoutePaths } from '@/shared/const/router'
import { UserRoles } from '@/shared/const/UserRoles'

interface RequireAuthProps {
    children: JSX.Element
    roles?: UserRoles[]
}

export const RequireAuth = (props: RequireAuthProps) => {
    const { children, roles } = props

    const authData = useSelector(getUserAuthData)

    if (!authData?.id) {
        return <Navigate to={GetRoutePaths.main()} replace />
    }

    if (roles && !roles.some((role) => !!authData.roles?.includes(role))) {
        return <Navigate to={GetRoutePaths.forbidden()} replace />
    }

    return children
}
