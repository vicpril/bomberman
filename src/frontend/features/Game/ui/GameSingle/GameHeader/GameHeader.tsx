import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './GameHeader.module.scss'

type GameHeaderProps = {
    score: number
    total: number
    timer: number
    bombs: number
}
export const GameHeader: FC<GameHeaderProps> = ({ score, timer, bombs, total }) => {
    const { t } = useTranslation()

    return (
        <div className={cls.gameHeader}>
            <span className="bombs-group">
                {t('bombs')}
                {': '}
                {bombs}
            </span>
            <span className="timer-group">
                {t('timer')}
                {': '}
                {timer}
            </span>
            <span className="timer-group">
                {t('score')}
                {': '}
                {score}/{total}
            </span>
        </div>
    )
}
