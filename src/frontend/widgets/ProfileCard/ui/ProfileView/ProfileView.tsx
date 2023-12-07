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
import { HStack, VStack } from '@/shared/ui/Stack'

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
    <VStack gap="32" className={classNames(cls.ProfileView, {}, [className])}>
      {
        profileData
        && (
          <>
            <HStack
              align="center"
              justify="center"
              className={cls.avatarContainer}
            >
              <img className={cls.avatar} src={profileData?.avatar || defaultAvatar} alt={t('Аватар')} />
            </HStack>
            <VStack gap="32" className={cls.infoContainer}>
              <ProfileField
                className="username"
                label={t('Пользователь')}
                value={profileData?.username}
              />
              <ProfileField
                className="firstname"
                label={t('Фамилия')}
                value={profileData?.firstname}
              />
              <ProfileField
                className="lastname"
                label={t('Имя')}
                value={profileData?.lastname}
              />
              <ProfileField
                className="age"
                label={t('Возраст')}
                value={profileData?.age}
              />
              <ProfileField
                className="currency"
                label={t('Валюта')}
                value={profileData?.currency}
              />
              <ProfileField
                className="country"
                label={t('Страна')}
                value={profileData?.country}
              />
            </VStack>
          </>
        )
      }
    </VStack>
  )
}
