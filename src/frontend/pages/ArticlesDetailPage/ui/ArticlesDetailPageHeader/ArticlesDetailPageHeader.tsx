import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { RoutePaths } from '@/shared/const/router'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import cls from './ArticlesDetailPageHeader.module.scss'

interface ArticlesDetailPageHeaderProps {
  className?: string
}

const ArticlesDetailPageHeader = memo((props: ArticlesDetailPageHeaderProps) => {
  const { className } = props

  const { t } = useTranslation()

  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePaths.articles)
  }, [navigate])

  return (
    <div className={classNames(cls.ArticlesDetailPageHeader, {}, [className])}>
      <Button
        theme={ButtonTheme.Clear}
        size={ButtonSize.M}
        onClick={onBackToList}
      >
        {t('Назад к списку')}
      </Button>
    </div>

  )
})

export { ArticlesDetailPageHeader }
