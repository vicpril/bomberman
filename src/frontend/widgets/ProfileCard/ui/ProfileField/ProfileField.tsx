import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileField.module.scss'
import { Profile } from '@/entities/Profile'
import { ValueOf } from '@/shared/lib/types'

interface FieldProps {
  className?: string
  label: string,
  value: ValueOf<Profile>
}

const ProfileField = ({ label, value, className }: FieldProps) => (

  <div className={classNames(cls.ProfileField, {}, [className])}>
    <div className={cls.label}>
      {label}
      :
    </div>
    <div className={cls.value}>{value || '-'}</div>

  </div>
)

export default ProfileField
