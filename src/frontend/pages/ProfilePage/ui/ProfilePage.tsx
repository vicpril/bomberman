import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import cls from './ProfilePage.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { RoutePaths } from '@/shared/config/routerConfig'
import { ProfileCard, fetchProfileData, profileReducer } from '@/entities/Profile'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from '@/entities/User'
import { Text, TextTheme } from '@/shared/ui/Text/Text'

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
    if (userId) dispatch(fetchProfileData(userId))
  }, [userId, dispatch])

  if (!userId) {
    return (
      <Text
        title={t('Не авторизован')}
        theme={TextTheme.ERROR}
      />
    )
  }

  return (
    <div className={cls.ProfilePage}>
      <DynamicModuleLoader reducers={initialReducers}>
        <ProfileCard />
      </DynamicModuleLoader>

      <Button
        className={cls.backButton}
        theme={ButtonTheme.Clear}
        onClick={onBackClick}
      >
        {t('Назад')}
      </Button>
    </div>
  )
}

export default ProfilePage
