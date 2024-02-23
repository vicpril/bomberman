import { CSSProperties, useMemo } from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import defaultAvatar from '@/shared/assets/icons/logo_img_base.png'
import cls from './Avatar.module.scss'

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({
  className, src, size, alt,
}: AvatarProps) => {
  const mods: Mods = {}

  const styles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100,
  }), [size])

  return (
    <img
      src={src ?? defaultAvatar}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  )
}
