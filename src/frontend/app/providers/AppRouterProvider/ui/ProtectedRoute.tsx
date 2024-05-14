import { ReactNode, useCallback } from 'react'
import { Navigate, Outlet, To } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StateSchema } from '../../StoreProvider'
import { AppRouteGuard } from '../types'

interface ProtectedRouteProps {
    children?: ReactNode
    guards: AppRouteGuard[]
    redirectTo?: To
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { children = <Outlet />, guards, redirectTo = '/' } = props

    const state = useSelector((state: StateSchema) => state)

    const isAllowed = useCallback(() => !guards.some((guard) => guard(state) === false), [guards, state])

    return isAllowed() ? children : <Navigate to={redirectTo} replace />
}
