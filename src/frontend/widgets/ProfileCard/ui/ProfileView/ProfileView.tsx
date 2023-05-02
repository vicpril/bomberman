import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileView.module.scss'
import { Loader } from '@/shared/ui/Loader/Loader'
import ProfileField from '../ProfileField/ProfileField'
import defaultAvatar from '@/shared/assets/icons/logo_img_base.png'
import {
  getProfileData, getProfileIsLoading,
} from '@/entities/Profile'

interface ProfileViewProps {
  className?: string
}

export const ProfileView = (props: ProfileViewProps) => {
  const { className } = props
  const { t } = useTranslation('profile')

  const profileData = useSelector(getProfileData)
  const isLoading = useSelector(getProfileIsLoading)
  // const error = useSelector(getProfileError)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={classNames(cls.ProfileView, {}, [className])}>
      {
        profileData
        && (
          <>
            <div className={cls.avatarContainer}>
              <img className={cls.avatar} src={profileData?.avatar || defaultAvatar} alt={t('Аватар')} />
            </div>
            <div className={cls.infoContainer}>
              <ProfileField
                className={cls.username}
                label={t('Пользователь')}
                value={profileData?.username}
              />
              <ProfileField
                className={cls.firstname}
                label={t('Фамилия')}
                value={profileData?.firstname}
              />
              <ProfileField
                className={cls.lastname}
                label={t('Имя')}
                value={profileData?.lastname}
              />
            </div>
          </>
        )
      }
    </div>
  )
}
