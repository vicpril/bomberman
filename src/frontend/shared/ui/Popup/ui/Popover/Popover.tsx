import { ReactNode, memo } from 'react'
import { Popover as HPopover } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'
import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'

import { mapDirectionClass } from '../../consts'

interface PopoverProps {
    className?: string
    direction?: DropdownDirection
    trigger: ReactNode
    children: ReactNode
}

const Popover = memo((props: PopoverProps) => {
    const { className, trigger, children, direction = 'bottom right' } = props

    const menuClasses = [mapDirectionClass[direction]]

    return (
        <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
            <HPopover.Button as="div" className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>{children}</HPopover.Panel>
        </HPopover>
    )
})

export { Popover }
