import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import cls from './[FTName].module.scss'

interface [FTName]Props {
  className?: string
}

const [FTName] = memo((props: [FTName]Props) => {
  const { className } = props

  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  return ( 
    <div className={classNames(cls.[FTName], {}, [className])}>
       
    </div>

  )
})

export { [FTName] }
