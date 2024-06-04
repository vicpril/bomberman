import React, { FC, useCallback, useEffect, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'

import {
    GameHeader,
    MultiplayerGameContent,
    GameFooter,
    SingleGameContent,
    useObservable,
    GameMode,
    gameService,
    GameStatus,
    GameRateModal,
} from '@/features/Game'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import cls from './GamePage.module.scss'

const GamePage: FC = () => {
    const stage = useObservable(gameService.stage)
    const status = useObservable(gameService.status)
    const score = useObservable(gameService.score)
    const total = useObservable(gameService.total)
    const timer = useObservable(gameService.timer)
    const bombs = useObservable(gameService.bombs)

    const isGameFinished = useMemo(
        () => [GameStatus.FINISHED, GameStatus.DEFEAT, GameStatus.VICTORY].includes(status),
        [status],
    )

    const { t } = useTranslation('game')

    const resetGame = () => {
        gameService.destroyMultiplayerGame()
        gameService.exitGame()
    }

    // TODO switch
    useMountEffect(() => resetGame)
    // useEffect(resetGame, [])

    const startSingleGameHandler = () => {
        gameService.setMode(GameMode.SINGLE_PLAYER)
        gameService.startGame({})
    }

    const startMultiplayerGameHandler = () => {
        gameService.setMode(GameMode.MULTI_PLAYER)
        gameService.initMultiplayerGame()
    }

    const startScreen = (
        <div className={cls.buttons}>
            <Button onClick={() => startSingleGameHandler()}>{t('Одиночная игра')}</Button>
            <Button onClick={() => startMultiplayerGameHandler()}>{t('Мультиплеер')}</Button>
        </div>
    )

    const onToMultiple = useCallback(() => {
        gameService.exitGame()
        startMultiplayerGameHandler()
    }, [])

    const singleScore = useMemo(() => `${score}/${total}`, [score, total])

    const onPlayAgain = useCallback(
        (mode: GameMode) => () => {
            resetGame()
            if (mode === GameMode.MULTI_PLAYER) startMultiplayerGameHandler()
            else startSingleGameHandler()
        },
        [],
    )

    const { flag: isRateModalOpen, on: openRateModal, off: closeRateModal } = useFlag(false)

    useEffect(() => {
        if (gameService.mode.get() === GameMode.MULTI_PLAYER && isGameFinished) {
            openRateModal()
        }
    }, [isGameFinished, openRateModal])

    const mainScreen =
        gameService.mode.get() === GameMode.SINGLE_PLAYER ? (
            <>
                <GameHeader gameStatus={status} score={singleScore} timer={timer} bombs={bombs} />
                <SingleGameContent gameStatus={status} stage={stage} toMultiple={onToMultiple} />
                <GameFooter
                    gameStatus={status}
                    onBackClick={resetGame}
                    onPlayAgainClick={onPlayAgain(GameMode.SINGLE_PLAYER)}
                />
            </>
        ) : (
            <>
                <GameHeader gameStatus={status} score={score} timer={timer} bombs={bombs} />
                <MultiplayerGameContent gameStatus={status} />
                <GameFooter
                    gameStatus={status}
                    onBackClick={resetGame}
                    onPlayAgainClick={onPlayAgain(GameMode.MULTI_PLAYER)}
                />
            </>
        )

    return (
        <>
            <Page className={classNames(cls.GamePage, {}, [])} data-testid="GamePage">
                {status === GameStatus.START_SCREEN && startScreen}
                {status !== GameStatus.START_SCREEN && mainScreen}
            </Page>
            <GameRateModal
                isOpen={isRateModalOpen}
                onClose={closeRateModal}
                win={status === GameStatus.VICTORY}
            />
        </>
    )
}

export default GamePage
