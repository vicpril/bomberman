/* eslint-disable i18next/no-literal-string */
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { Icon } from '@/shared/ui/Icon'
import Telegram from '@/shared/assets/icons/telegram.svg'
import Mail from '@/shared/assets/icons/google.svg'
import Github from '@/shared/assets/icons/github.svg'
import { AppLink } from '@/shared/ui/AppLink'
import cls from './Footer.module.scss'

interface FooterProps {
    className?: string
}

const mailSubject = `Клик на сайте ${__CLIENT_URL__}`
const mailBody = `Привет! Увидел твою почту на сайте ${__CLIENT_URL__}`

const Footer = memo((props: FooterProps) => {
    const { className } = props

    return (
        <div className={classNames(cls.Footer, {}, [className])}>
            <HStack max gap="32" wrap="wrap" className={cls.flex}>
                <AppLink to="https://github.com/vicpril/bomberman" target="_blank" underline={false}>
                    <Icon Svg={Github} width={32} height={32} className="mail" />
                </AppLink>
                <AppLink
                    to={`mailto:prilepinva@gmail.com&body=${mailBody}&subject=${mailSubject}`}
                    underline={false}
                >
                    <Icon Svg={Mail} width={32} height={32} className="mail" />
                </AppLink>
                <AppLink to="https://t.me/PrilepinVA" target="_blank" underline={false}>
                    <div className="telegram">
                        <HStack gap="8">
                            <Icon Svg={Telegram} width={32} height={32} />
                            <span className={cls.telegramTitle}>@PrilepinVA</span>
                        </HStack>
                    </div>
                </AppLink>
            </HStack>
        </div>
    )
})

export { Footer }
