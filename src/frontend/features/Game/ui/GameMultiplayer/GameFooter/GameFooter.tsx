import './GameFooter.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { GameStatus } from '../../../lib/services/gameService'

type GameFooterProps = {
    gameStatus?: GameStatus
}

export const GameFooter: FC<GameFooterProps> = ({ gameStatus }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const backClickHandler = () => {
        navigate('/')
    }

    const playAgainClickHandler = () => {
        navigate(0)
    }

    return (
        <div className="game-footer">
            {(gameStatus === GameStatus.DEFEAT ||
                gameStatus === GameStatus.VICTORY ||
                gameStatus === GameStatus.FINISHED) && (
                <Button theme={ButtonTheme.Background} size={ButtonSize.L} onClick={playAgainClickHandler}>
                    {t('play_again')}
                </Button>
            )}

            <Button theme={ButtonTheme.Background} size={ButtonSize.L} onClick={backClickHandler}>
                {t('back')}
            </Button>
        </div>
    )
}
