import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cls from './ProfilePage.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { RoutePaths } from '@/shared/config/routerConfig'
import {
  Profile, fetchProfileData, getProfileData, profileActions, profileReducer,
} from '@/entities/Profile'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from '@/entities/User'
import { Text, TextTheme } from '@/shared/ui/Text/Text'
import { ProfileView } from '@/widgets/ProfileCard'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { ProfileEditForm } from '@/features/ProfileEdit'

const initialReducers: ReducersList = {
  profile: profileReducer,
}

function ProfilePage() {
  const { t } = useTranslation('main')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const onBackClick = () => {
    navigate(RoutePaths.main)
  }

  const userId = useSelector(getUserAuthData)?.id

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      if (userId) dispatch(fetchProfileData(userId))
    }
  }, [userId, dispatch])

  const {
    flag: isEditMode, on: onEditMode, off: offEditMode,
  } = useFlag(false)

  const profileData = useSelector(getProfileData)

  const onCancelHandler = offEditMode

  const onUpdateProfileHandler = useCallback((data: Profile) => {
    dispatch(profileActions.updateData(data))
    offEditMode()
  }, [dispatch, offEditMode])

  if (!userId) {
    return (
      <Text
        title={t('Не авторизован')}
        theme={TextTheme.ERROR}
      />
    )
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={cls.ProfilePage}>
        {// watch mode
          !isEditMode && (
            <>
              <ProfileView />

              <Button
                className={cls.editButton}
                onClick={onEditMode}
              >
                {t('Редактировать')}
              </Button>

              <Button
                className={cls.backButton}
                theme={ButtonTheme.Clear}
                onClick={onBackClick}
              >
                {t('Назад')}
              </Button>
            </>
          )
        }

        {// edit mode
          isEditMode && (
            <ProfileEditForm
              userId={userId}
              initialData={profileData}
              onCancel={onCancelHandler}
              onUpdate={onUpdateProfileHandler}
            />
          )
        }

      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
