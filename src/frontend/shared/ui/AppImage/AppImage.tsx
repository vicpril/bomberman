import {
  ImgHTMLAttributes, ReactElement, memo, useLayoutEffect, useState,
} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppImage.module.scss'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement>{
  className?: string
  src: string,
  fallback?: ReactElement
  errorFallback?: ReactElement
  alt?:string
}

const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    src,
    alt = 'image',
    fallback,
    errorFallback,
    ...others
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useLayoutEffect(() => {
    const img = new Image()
    img.onload = () => {
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsLoading(false)
      setIsError(true)
    }
    img.src = src ?? ''
  }, [src])

  if (isLoading && fallback) {
    return fallback
  }

  if (isError && errorFallback) {
    return errorFallback
  }

  return (
    <img
      className={classNames(cls.AppImage, {}, [className])}
      src={src}
      alt={alt}
      {...others}
    />

  )
})

export { AppImage }
