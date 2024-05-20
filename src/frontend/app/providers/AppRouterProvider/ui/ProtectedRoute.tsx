import { ReactNode } from 'react'
import { Navigate, Outlet, To } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRouteGuard } from '../types'
import { StateSchema } from '../../StoreProvider'

interface ProtectedRouteProps {
    children?: ReactNode
    guards: AppRouteGuard[]
    redirectTo?: To
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { children = <Outlet />, guards, redirectTo = '/' } = props

    const isAllowedSelector = (state: StateSchema) => !guards.some((guard) => guard(state) === false)

    const isAllowed = useSelector(isAllowedSelector)

    return isAllowed ? children : <Navigate to={redirectTo} replace />
}
