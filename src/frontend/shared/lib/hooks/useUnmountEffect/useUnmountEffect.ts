import { useEffect } from 'react'

export const useUnmountEffect = (callback: () => void) => {
    useEffect(
        () => () => callback(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )
}
