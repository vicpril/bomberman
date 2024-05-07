import { ReactNode, memo } from 'react'
import { ResizeCallback, useDeviceDetect } from '../hooks/useDeviceDetect'

interface Props {
    children: ReactNode
    onResizeCallback?: ResizeCallback
}

export const MobileView = memo((props: Props) => {
    const { children, onResizeCallback } = props

    const { isMobile } = useDeviceDetect(onResizeCallback)

    if (!isMobile) {
        return null
    }

    return children
})
