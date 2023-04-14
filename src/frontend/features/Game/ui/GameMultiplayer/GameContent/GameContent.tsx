import './GameContent.scss'
import React, {
  FC, useMemo, useRef,
} from 'react'
// import { FullScreenHandle } from 'react-full-screen'
import { MapRenderer } from '@game/index'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { gameService, GameStatus } from '../../../lib/services/gameService'
import { CanvasLayer, CanvasHandle } from '../CanvasLayer/CanvasLayer'

type GameContentProps = {
  gameStatus: GameStatus,
  // stage: number,
  // fullScreenHandle: FullScreenHandle
}
export const GameContent: FC<GameContentProps> = ({ gameStatus }) => {
  const canvasBF = useRef<CanvasHandle>(null)
  const canvasWalls = useRef<CanvasHandle>(null)
  const canvasBombs = useRef<CanvasHandle>(null)
  const canvasExplosions = useRef<CanvasHandle>(null)
  const canvasPlayer1 = useRef<CanvasHandle>(null)
  const canvasPlayer2 = useRef<CanvasHandle>(null)

  const gatherCanvasLayers = () => {
    if (canvasWalls.current
      && canvasBombs.current
      && canvasExplosions.current
      && canvasPlayer1.current
      && canvasPlayer2.current) {
      return {
        ctxWalls: canvasWalls.current.context!,
        ctxBombs: canvasBombs.current.context!,
        ctxExplosions: canvasExplosions.current.context!,
        ctxPlayer1: canvasPlayer1.current.context!,
        ctxPlayer2: canvasPlayer2.current.context!,
      }
    }

    return null
  }

  useMountEffect(() => {
    gameService.setCanvasLayersContext(gatherCanvasLayers())
    if (canvasBF.current?.context) {
      MapRenderer(canvasBF.current?.context).render()
    }
  })

  const content = useMemo(() => {
    switch (gameStatus) {
      default:
      case GameStatus.IN_PROGRESS:
      case GameStatus.WAITING_PLAYER:
        return (
          <>
            <CanvasLayer ref={canvasBF} />
            <CanvasLayer ref={canvasWalls} />
            <CanvasLayer ref={canvasBombs} />
            <CanvasLayer ref={canvasExplosions} />
            <CanvasLayer ref={canvasPlayer1} />
            <CanvasLayer ref={canvasPlayer2} />
          </>
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [gameStatus, fullScreenHandle.active])
  }, [gameStatus])

  return (
    <div className="game-content">
      <div className="content-wrapper">
        {content}
      </div>
    </div>
  )
}
