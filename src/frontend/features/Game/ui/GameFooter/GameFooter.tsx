import './GameFooter.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { GameStatus } from '../../lib/services/gameService'

type GameFooterProps = {
    gameStatus?: GameStatus
    onBackClick?: () => void
    onPlayAgainClick?: () => void
}

export const GameFooter: FC<GameFooterProps> = ({ gameStatus, onBackClick, onPlayAgainClick }) => {
    const { t } = useTranslation()

    return (
        <div className="game-footer">
            {(gameStatus === GameStatus.DEFEAT ||
                gameStatus === GameStatus.VICTORY ||
                gameStatus === GameStatus.FINISHED) && (
                <Button theme={ButtonTheme.Background} size={ButtonSize.L} onClick={onPlayAgainClick}>
                    {t('play_again')}
                </Button>
            )}

            <Button theme={ButtonTheme.Background} size={ButtonSize.L} onClick={onBackClick}>
                {t('back')}
            </Button>
        </div>
    )
}
