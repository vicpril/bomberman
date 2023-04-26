import React, { FC } from 'react'

// import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useTranslation } from 'react-i18next'
import cls from './GamePage.module.scss'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { Button } from '@/shared/ui/Button/Button'
// import { useBoundAction } from 'hooks/useBoundAction'
// import { addLeaderAsync } from 'store/leaderboard/leaderboardActions'
// import { SCORE_FIELD_NAME } from 'api/types'
// import { getUserState } from 'store/user/userSlice'
// import { useSelector } from 'react-redux'
import {
  MultiplayerGameHeader,
  MultiplayerGameContent,
  MultiplayerGameFooter,
  SingleGameHeader,
  SingleGameContent,
  SingleGameFooter,
  useObservable,
  GameMode,
  gameService,
  GameStatus,
} from '@/features/Game'
import { classNames } from '@/shared/lib/classNames/classNames'

const GamePage: FC = () => {
  const stage = useObservable(gameService.stage)
  const status = useObservable(gameService.status)
  const score = useObservable(gameService.score)
  const timer = useObservable(gameService.timer)
  const bombs = useObservable(gameService.bombs)
  // const fullScreenHandle = useFullScreenHandle()
  const { t } = useTranslation('game')
  // const addLeaderAsyncBounded = useBoundAction(addLeaderAsync)
  // const { isAuth, userInfo } = useSelector(getUserState)

  useMountEffect(() => () => {
    gameService.destroyMultiplayerGame()
    gameService.exitGame()
  })

  const startSingleGameHandler = () => {
    gameService.setMode(GameMode.SINGLE_PLAYER)
    gameService.startGame({})
  }

  const startMultiplayerGameHandler = () => {
    gameService.setMode(GameMode.MULTI_PLAYER)
    gameService.initMultiplayerGame()
  }

  // useEffect(() => {
  //   // if (!isAuth) {
  //   //   return
  //   // }

  //   // const isVictory = status === GameStatus.VICTORY
  //   // const isDefeat = status === GameStatus.DEFEAT
  //   // const isFinished = status === GameStatus.FINISHED

  //   // if (isVictory || isDefeat || isFinished) {
  //   //   const requestData = {
  //   //     data: {
  //   //       displayName: `${userInfo.first_name} ${userInfo.second_name}`,
  //   //       scoreFieldGD: score,
  //   //     },
  //   //     ratingFieldName: SCORE_FIELD_NAME,
  //   //   }

  //   //   addLeaderAsyncBounded(requestData)
  //   // }
  // }, [status, userInfo, isAuth, score, addLeaderAsyncBounded])

  const startScreen = (

    <div className={cls.buttons}>
      <Button onClick={() => startSingleGameHandler()}>{t('Одиночная игра')}</Button>
      <Button onClick={() => startMultiplayerGameHandler()}>{t('Мультиплеер')}</Button>
      {/* {fullScreenHandle.active
          ? <Button onClick={fullScreenHandle.exit}>{t('exit_fullscreen_mode')}</Button>
          : <Button onClick={fullScreenHandle.enter}>{t('enter_fullscreen_mode')}</Button>} */}
    </div>

  )

  const mainScreen = gameService.mode.get() === GameMode.SINGLE_PLAYER
    ? (
      <>
        <SingleGameHeader score={score} timer={timer} bombs={bombs} />
        {/* <SingleGameContent gameStatus={status} stage={stage} fullScreenHandle={fullScreenHandle} /> */}
        <SingleGameContent gameStatus={status} stage={stage} />
        <SingleGameFooter />
      </>
    )
    : (
      <>
        <MultiplayerGameHeader gameStatus={status} score={score} timer={timer} bombs={bombs} />
        <MultiplayerGameContent gameStatus={status} />
        <MultiplayerGameFooter gameStatus={status} />
      </>
    )

  return (
    // <FullScreen handle={fullScreenHandle}>
    <div className={classNames(cls.GamePage, {}, [])}>
      { status === GameStatus.START_SCREEN && startScreen }
      { status !== GameStatus.START_SCREEN && mainScreen}
    </div>
    // </FullScreen>
  )
}

export default GamePage
