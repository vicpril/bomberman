import {
  MutableRefObject, ReactNode, memo, useEffect, useRef,
} from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { getUiScrollByPath, uiActions } from '@/features/UI'
import { StateSchema } from '@/app/providers/StoreProvider'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'

interface PageProps {
  className?: string
  children?: ReactNode
  onScrollEnd?: () => void;
  saveScroll?: boolean
}

const Page = memo((props: PageProps) => {
  const {
    className,
    children,
    onScrollEnd,
    saveScroll = false,
  } = props

  const dispatch = useAppDispatch()

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd,
  })

  const { pathname } = useLocation()

  const scrollPosition = useSelector((state: StateSchema) => getUiScrollByPath(state, pathname))

  const onScroll = useThrottle((e: Event) => {
    const newPosition = (e.target as Document).scrollingElement?.scrollTop
    dispatch(uiActions.setScrollPosition(
      {
        path: pathname,
        position: newPosition ?? 0,
      },
    ))
  }, 500)

  useEffect(() => {
    if (saveScroll) {
      document.addEventListener('scrollend', onScroll)
    }
    return () => { document.removeEventListener('scrollend', onScroll) }
  }, [onScroll, saveScroll])

  useMountEffect(() => {
    // wrapperRef.current.scrollTop = scrollPosition
    document.scrollingElement?.scrollTo({ top: scrollPosition })
  })

  return (
    <main
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      // onScroll={onScroll}
    >
      {children}
      {onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
    </main>

  )
})

export { Page }
