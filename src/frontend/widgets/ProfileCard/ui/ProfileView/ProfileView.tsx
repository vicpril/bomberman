import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileView.module.scss'
import { Loader } from '@/shared/ui/Loader/Loader'
import ProfileField from '../ProfileField/ProfileField'
import defaultAvatar from '@/shared/assets/icons/logo_img_base.png'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { Button } from '@/shared/ui/Button/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  Profile, getProfileData, getProfileIsLoading, profileActions,
} from '@/entities/Profile'
import { ProfileEditForm } from '@/features/ProfileEdit'

interface ProfileViewProps {
  className?: string
  readonly?: boolean
}

export const ProfileView = (props: ProfileViewProps) => {
  const { className, readonly } = props
  const { t } = useTranslation('profile')

  const {
    flag: isEditMode, on: onEditMode, off: offEditMode, css: editModeCss,
  } = useFlag(false, '_edit')

  const dispatch = useAppDispatch()

  const profileData = useSelector(getProfileData)
  const isLoading = useSelector(getProfileIsLoading)
  // const error = useSelector(getProfileError)

  const onCancelHandler = offEditMode

  const onUpdateProfileHandler = useCallback((data: Profile) => {
    dispatch(profileActions.updateData(data))
    offEditMode()
  }, [dispatch, offEditMode])

  if (isLoading) {
    return <Loader />
  }

  // Watch mode
  if (!isEditMode) {
    return (
      <div className={classNames(cls.ProfileView, {}, [className, editModeCss])}>
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
                label={t('Ваша фамилия')}
                value={profileData?.firstname}
              />
              <ProfileField
                className={cls.lastname}
                label={t('Ваше имя')}
                value={profileData?.lastname}
              />
            </div>
          </>
        )
        }
        {
          !readonly && (
            <div className={cls.buttons}>
              <Button className={cls.editButton} onClick={onEditMode}>
                {t('Редактировать')}
              </Button>
            </div>
          )
        }
      </div>
    )
  }

  // Edit mode

  return (
    <div className={classNames(cls.ProfileView, {}, [className])}>
      {
        profileData
        && (
          <ProfileEditForm
            userId={profileData?.id}
            initialData={profileData}
            onCancel={onCancelHandler}
            onUpdate={onUpdateProfileHandler}
          />
        )
      }
    </div>
  )
}
