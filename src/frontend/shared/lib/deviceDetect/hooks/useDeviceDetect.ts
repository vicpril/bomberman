import { useEffect, useState } from 'react'

export type ResizeCallback = (isMobile: boolean) => void

export const useDeviceDetect = (onResizeCallback?: ResizeCallback) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(pointer:coarse)').matches)
            onResizeCallback?.(isMobile)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [isMobile, onResizeCallback])

    return { isMobile }
}
