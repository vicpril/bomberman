import React, { FC } from 'react'
import { Button, ButtonSize } from '@/shared/ui/Button'

type GameContentInsideProps = {
  text?: string,
  buttonText?: string,
  onButtonClick?: () => void
}
export const GameContentInside:
  FC<GameContentInsideProps> = ({ text, buttonText, onButtonClick }) => {
    const p = text ? <p>{ text }</p> : ''
    const button = buttonText ? (
      <Button
        size={ButtonSize.M}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    ) : ''

    return (
      <>
        {p}
        {button}
      </>
    )
  }
