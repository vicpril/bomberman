import './Canvas.css'
import React, { FC, useEffect, useRef } from 'react'
import { Game } from '../../../lib/SingleGameCore/classes/Game'

export const Canvas: FC = React.memo(() => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const game = new Game(canvasRef)
        game.start()

        return () => {
            game.end()
        }
    }, [])

    // eslint-disable-next-line react/jsx-max-props-per-line
    return <canvas ref={canvasRef} className="canvas-container" width="960" height="704" id="game" />
})
