import {
  MutableRefObject, ReactNode, UIEvent, memo, useRef,
} from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { getUiScroll, getUiScrollByPath } from '@/features/UI/model/selectors/uiSelectors'
import { StateSchema } from '@/app/providers/StoreProvider'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { uiActions } from '@/features/UI'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'

interface PageProps {
  className?: string
  children?: ReactNode
  onScrollEnd?: () => void;
}

const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props

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

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(uiActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }))
  }, 500)

  useMountEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
    </section>

  )
})

export { Page }
