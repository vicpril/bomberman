import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import cls from './ProfilePage.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { RoutePaths } from '@/shared/config/routerConfig'

function ProfilePage() {
  const { t } = useTranslation('main')

  const navigate = useNavigate()

  const onBackClick = () => {
    navigate(RoutePaths.main)
  }
  return (
    <div className={cls.ProfilePage}>
      <div>Профиль</div>
      <Button
        theme={ButtonTheme.Clear}
        onClick={onBackClick}
      >
        Назад
      </Button>
    </div>
  )
}

export default ProfilePage
