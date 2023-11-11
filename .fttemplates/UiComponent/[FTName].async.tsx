import { lazy } from 'react'

export const [FTName]Async = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./[FTName]')), 200)
}))
