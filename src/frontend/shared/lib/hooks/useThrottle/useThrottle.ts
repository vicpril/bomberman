import { useCallback, useRef } from 'react'

export const useThrottle = <P>(callback: (...args: P[]) => void, delay: number) => {
    const cooldown = useRef(false)

    return useCallback(
        (...args: P[]) => {
            if (!cooldown.current) {
                callback(...args)
                cooldown.current = true

                setTimeout(() => {
                    cooldown.current = false
                }, delay)
            }
        },
        [callback, delay],
    )
}
