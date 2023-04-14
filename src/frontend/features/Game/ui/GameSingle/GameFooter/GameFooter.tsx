import './GameFooter.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonTheme, ButtonSize } from '@/shared/ui/Button/Button'

export const GameFooter: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const backClickHandler = () => {
    navigate('/')
  }

  return (
    <div className="game-footer">
      <Button
        theme={ButtonTheme.Background}
        size={ButtonSize.L}
        onClick={backClickHandler}
      >
        {t('back')}
      </Button>
    </div>
  )
}
