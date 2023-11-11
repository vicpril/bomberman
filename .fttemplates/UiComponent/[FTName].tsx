import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import cls from './[FTName].module.scss'

interface [FTName]Props {
  className?: string
}

export const [FTName] = (props: [FTName]Props) => {
  const { className } = props

  const { t } = useTranslation()

  return ( 
    <div className={classNames(cls.[FTName], {}, [className])}>
       
    </div>

  )
}
