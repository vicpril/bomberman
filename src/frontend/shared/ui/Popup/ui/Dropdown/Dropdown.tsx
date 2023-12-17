import { Fragment, ReactNode, memo } from 'react'
import { Menu } from '@headlessui/react'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Dropdown.module.scss'
import popupCls from '../../styles/popup.module.scss'
import { DropdownDirection } from '@/shared/types/ui'
import { mapDirectionClass } from '../../consts'

export interface DropdownItem {
  content: ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
}

interface DropdownProps {
  className?: string
  trigger: ReactNode,
  items: DropdownItem[]
  direction?: DropdownDirection
}

const Dropdown = memo((props: DropdownProps) => {
  const {
    className,
    trigger,
    items,
    direction = 'bottom left',
  } = props

  const itemsClasses = [mapDirectionClass[direction]]

  return (
    <Menu as="div" className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
      <Menu.Button className={popupCls.trigger}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, itemsClasses)}>
        {
          items.map((item, index) => {
            const content = ({ active }: {active: boolean}) => {
              if (item.href) {
                return (
                  <div className={classNames(cls.item, { [popupCls.active]: active }, [])}>
                    <AppLink
                      to={item.href}
                    >
                      {item.content}
                    </AppLink>
                  </div>
                )
              }

              return (
                <div
                  className={classNames(cls.item, { [popupCls.active]: active }, [])}
                  onClick={item.onClick}
                >
                  {item.content}
                </div>
              )
            }

            return (
              <Menu.Item as={Fragment} disabled={item.disabled} key={index}>
                {content}
              </Menu.Item>
            )
          })
        }

      </Menu.Items>
    </Menu>

  )
})

export { Dropdown }
