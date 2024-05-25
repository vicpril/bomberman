import { getAccessToken, initUserData } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ReactNode, useEffect } from 'react'

interface AppInitProviderProps {
    children: ReactNode
}

export const AppInitProvider = (props: AppInitProviderProps) => {
    const { children } = props
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Init User Data
        const token = getAccessToken()
        if (token) dispatch(initUserData())
    })

    return children
}
