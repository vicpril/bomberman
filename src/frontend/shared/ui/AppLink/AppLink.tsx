import { AnchorHTMLAttributes, FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import bombImage from '@/shared/assets/icons/bomb.png'
import cls from './AppLink.module.scss'

type AppLinkTheme = 'primary' | 'inverted'

type AppLinkSize = 's' | 'm' | 'l'

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
    size?: AppLinkSize
    bombed?: boolean
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const { className, to, children, theme = 'primary', size = 's', bombed, target, ...otherProps } = props

    return (
        <div className={classNames(cls.AppLink, { [cls._bombed]: bombed }, [cls[`_size_${size}`]])}>
            <Link
                to={to}
                target={target}
                className={classNames(cls.link, {}, [className, cls[theme]])}
                {...otherProps}
            >
                {children}
            </Link>

            {bombed && (
                <>
                    <img className={classNames(cls.bomb, {}, [])} src={bombImage} alt="bomb" />
                    <img className={classNames(cls.bomb, {}, [])} src={bombImage} alt="bomb" />
                </>
            )}
        </div>
    )
}
