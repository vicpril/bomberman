import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserAuthData, userActions } from '@/entities/User'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { LoginModal } from '@/features/AuthByUsername'

interface NavbarUserProps {
  className?: string
}

export const NavbarUserInner = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const authData = useSelector(getUserAuthData)

  const { flag: isOpen, on: openModal, off: closeModal } = useFlag(false)

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <Button
        size={ButtonSize.M}
        theme={ButtonTheme.Clear}
        onClick={onLogout}
      >
        {t('Выйти')}
      </Button>
    )
  }

  return (
    <>
      <Button
        size={ButtonSize.M}
        theme={ButtonTheme.Clear}
        onClick={openModal}
      >
        {t('Войти')}
      </Button>
      <LoginModal
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>

  )
}

export const NavbarUser = (props: NavbarUserProps) => {
  const { className } = props
  return (
    <div className={classNames('NavbarUser', {}, [className])}>
      <NavbarUserInner />
    </div>
  )
}
