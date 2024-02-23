import { classNames } from '@/shared/lib/classNames/classNames'
import bombImage from '@/shared/assets/icons/bomb.png'
import cls from './Loader.module.scss'

export enum LoaderSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l'
}

interface LoaderProps {
  size?: LoaderSize
  className?: string
}

export const Loader = (props: LoaderProps) => {
  const { size = LoaderSize.L, className } = props

  return (
    <div className={classNames(cls.loadingIndicator, {}, [className, cls[size]])}>
      <img className={classNames(cls.image, {}, [cls.rotating])} src={bombImage} alt="bomb" />
    </div>

  )
}
