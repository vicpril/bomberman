import { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover as HPopover } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'

import { DropdownDirection } from '@/shared/types/ui'
import { mapDirectionClass } from '../../consts'

interface PopoverProps {
  className?: string
  direction?: DropdownDirection
  trigger: ReactNode
  children: ReactNode
}

const Popover = memo((props: PopoverProps) => {
  const {
    className,
    trigger,
    children,
    direction = 'bottom right',
  } = props

  const menuClasses = [mapDirectionClass[direction]]

  return (
    <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
      <HPopover.Button className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>

  )
})

export { Popover }
