import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './GameHeader.module.scss'
import { gameService, GameStatus } from '../../lib/services/gameService'
import { useObservable } from '../../lib/SingleGameCore/hooks/useObservable'

type GameHeaderProps = {
    gameStatus: GameStatus
    score?: number | string
    timer?: number
    bombs?: number
}
export const GameHeader: FC<GameHeaderProps> = ({ gameStatus, score, timer, bombs }) => {
    const { t } = useTranslation()

    const startingTimer = useObservable(gameService.startingTimer)

    const bombsLabel = (
        <span className="bombsGroup">
            {t('bombs')}
            {': '}
            {bombs}
        </span>
    )
    const timerLabel = (
        <span className="timerGroup">
            {t('timer')}
            {': '}
            {timer}
        </span>
    )
    const scoreLabel = (
        <span className="timerGroup">
            {t('score')}
            {': '}
            {score}
        </span>
    )

    const headerComponent = useMemo(() => {
        switch (gameStatus) {
            default:
            case GameStatus.IN_PROGRESS:
                return (
                    <div className={cls.gameHeader}>
                        {bombsLabel}
                        {timerLabel}
                        {scoreLabel}
                    </div>
                )

            case GameStatus.VICTORY:
                return (
                    <div className={cls.gameHeader}>
                        {bombsLabel}
                        <span className={classNames(cls.status, {}, [cls.victory])}>{t('victory')}</span>
                        {scoreLabel}
                    </div>
                )

            case GameStatus.DEFEAT:
                return (
                    <div className={cls.gameHeader}>
                        {bombsLabel}
                        <span className={classNames(cls.status, {}, [cls.defeat])}>{t('defeat')}</span>
                        {bombsLabel}
                    </div>
                )

            case GameStatus.WAITING_PLAYER:
                return (
                    <div className={cls.gameHeader}>
                        <span className="bombsGroup">
                            {t('waiting-an-opponent')}
                            ...
                        </span>
                    </div>
                )
            case GameStatus.NOT_STARTED:
                return (
                    <div className={cls.gameHeader}>
                        <span className="bombsGroup">
                            {t('game-starts-in')}: {startingTimer?.toString()}
                        </span>
                    </div>
                )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStatus, startingTimer, timer, bombs, score, t])

    return headerComponent
}
