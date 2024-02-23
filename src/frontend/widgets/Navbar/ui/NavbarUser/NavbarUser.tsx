import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { LoginModal } from '@/features/AuthByUsername'
import { Dropdown, DropdownItem } from '@/shared/ui/Popup'
import { Avatar } from '@/shared/ui/Avatar'
import { RoutePaths } from '@/shared/const/router'
import cls from './NavbarUser.module.scss'
import { NotificationButton } from '@/features/NotificationButton'
import { HStack } from '@/shared/ui/Stack'

interface NavbarUserProps {
  className?: string
}

export const NavbarUserInner = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const authData = useSelector(getUserAuthData)
  const isManager = useSelector(isUserManager)
  const isAdmin = useSelector(isUserAdmin)
  const showAdmin = useMemo(() => isManager || isAdmin, [isManager, isAdmin])

  const { flag: isOpen, on: openModal, off: closeModal } = useFlag(false)

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    const items: DropdownItem[] = [
      ...(showAdmin ? [{
        content: <Button size={ButtonSize.M} theme={ButtonTheme.Clear}>{t('Админка')}</Button>,
        href: `${RoutePaths.adminPanel}`,
      }] : []),
      {
        content: <Button size={ButtonSize.M} theme={ButtonTheme.Clear}>{t('Профиль')}</Button>,
        href: `${RoutePaths.profile}/${authData.id}`,
      },
      {
        content: <Button size={ButtonSize.M} theme={ButtonTheme.Clear}>{t('Выйти')}</Button>,
        onClick: onLogout,
      },
    ]

    const avatar = (
      <div className={cls.avatarWrapper}>
        <Avatar size={32} src={authData.avatar} />
      </div>
    )

    return (
      <HStack gap="32">
        <NotificationButton />
        <Dropdown
          trigger={avatar}
          items={items}
          direction="bottom right"
        />
      </HStack>
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
