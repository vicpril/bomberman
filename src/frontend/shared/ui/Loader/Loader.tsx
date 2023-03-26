import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Loader.module.scss'
import bombImage from '@/shared/assets/icons/bomb.png'

export enum LoaderSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l'
}

interface LoaderProps {
  size?: LoaderSize
}

export const Loader = (props: LoaderProps) => {
  const { size = LoaderSize.L } = props

  return (
    <div className={classNames(cls.loadingIndicator, {}, [cls[size]])}>
      <img className={classNames(cls.image, {}, [cls.rotating])} src={bombImage} alt="bomb" />
    </div>

  )
}
