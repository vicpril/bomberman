import React, { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
import cls from './GameContent.module.scss'
// import { FullScreenHandle } from 'react-full-screen'
import { GameStatus, gameService, GameMode } from '../../../lib/services/gameService'
import { Canvas as CanvasComponent } from '../Canvas/Canvas'

type GameContentProps = {
    gameStatus: GameStatus
    stage: number
    toMultiple: () => void
    // fullScreenHandle: FullScreenHandle
}
export const GameContent: FC<GameContentProps> = ({ gameStatus, stage, toMultiple }) => {
    const { t } = useTranslation()

    const startGameHandler = (multi = false) => {
        const options = multi ? { mode: GameMode.MULTI_PLAYER } : {}
        gameService.startGame(options)
    }

    const nextStageGameHandler = () => {
        gameService.startGame({ reset: false })
    }

    const onPlayAgain = useCallback(() => startGameHandler(false), [])

    const stageText = `${t('stage')}: ${stage}`

    const content = useMemo(() => {
        switch (gameStatus) {
            default:
            case GameStatus.SHOW_STAGE:
                return <Text text={stageText} />

            case GameStatus.IN_PROGRESS:
                return <CanvasComponent key={Date.now()} />

            case GameStatus.VICTORY:
            case GameStatus.STAGE_COMPLETED:
                return (
                    <VStack gap="32">
                        <Text text={stageText} />
                        <Button size={ButtonSize.M} onClick={nextStageGameHandler}>
                            {t('continue')}
                        </Button>
                        <Button size={ButtonSize.M} onClick={toMultiple}>
                            {t('continue-multy')}
                        </Button>
                    </VStack>
                )

            case GameStatus.DEFEAT:
            case GameStatus.FINISHED:
                return (
                    <VStack gap="32">
                        <Text text={t('game_over')} />
                        <Button size={ButtonSize.M} onClick={onPlayAgain}>
                            {t('play_again')}
                        </Button>
                    </VStack>
                )
        }
        // 't' в useMemo влияет на правильную работу ssr
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStatus, stageText])
    // }, [gameStatus, stageText, fullScreenHandle.active])

    return (
        <div className={cls.gameContent}>
            <div className={cls.contentWrapper}>{content}</div>
        </div>
    )
}
