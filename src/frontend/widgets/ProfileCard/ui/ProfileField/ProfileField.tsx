import { classNames } from '@/shared/lib/classNames/classNames'
import { Profile } from '@/entities/Profile'
import { ValueOf } from '@/shared/lib/types'
import { HStack } from '@/shared/ui/Stack'
import cls from './ProfileField.module.scss'

interface FieldProps {
  className?: string
  label: string,
  value: ValueOf<Profile>
}

const ProfileField = ({ label, value, className }: FieldProps) => (

  <HStack max justify="between" className={classNames(cls.ProfileField, {}, [className])}>
    <div className={cls.label}>
      {label}
      :
    </div>
    <div className={cls.value}>{value || '-'}</div>

  </HStack>
)

export default ProfileField
