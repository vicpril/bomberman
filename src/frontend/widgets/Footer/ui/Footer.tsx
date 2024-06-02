/* eslint-disable i18next/no-literal-string */
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { Icon } from '@/shared/ui/Icon'
import Telegram from '@/shared/assets/icons/telegram.svg'
import Mail from '@/shared/assets/icons/google.svg'
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
            <HStack max gap="16" justify="between">
                <AppLink to="https://t.me/PrilepinVA" target="_blank">
                    <div className="telegram">
                        <HStack gap="8">
                            <Icon Svg={Telegram} width={32} height={32} />
                            <span>@PrilepinVA</span>
                        </HStack>
                    </div>
                </AppLink>
                <AppLink to={`mailto:prilepinva@gmail.com&body=${mailBody}&subject=${mailSubject}`}>
                    <div className="mail">
                        <HStack gap="8">
                            <Icon Svg={Mail} width={32} height={32} />
                            <span>mail</span>
                        </HStack>
                    </div>
                </AppLink>
            </HStack>
        </div>
    )
})

export { Footer }
