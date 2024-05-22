import { useSelector } from 'react-redux'
import { StateSchema } from '@/app/providers/StoreProvider'

type Selector<T, P extends unknown[]> = (state: StateSchema, ...args: P) => T
type Hook<T, P extends unknown[]> = (...args: P) => T
type Result<T, P extends unknown[]> = [Hook<T, P>, Selector<T, P>]

export function buildSelector<T, P extends unknown[]>(selector: Selector<T, P>): Result<T, P> {
    const useSelectorHook = (...args: P) => useSelector((state: StateSchema) => selector(state, ...args))
    return [useSelectorHook, selector]
}
