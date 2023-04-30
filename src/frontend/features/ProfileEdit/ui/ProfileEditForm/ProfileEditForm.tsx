import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileEditForm.module.scss'
import { ProfileUpdateSchema } from '../../model/types/ProfileUpdateSchema'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  initialProfileUpdateState,
  profileUpdateActions,
  profileUpdateReducer,
} from '../../model/slices/updateProfile/updateProfile'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Input } from '@/shared/ui/Input/Input'
import { Profile } from '@/entities/Profile'
import { getProfileUpdateData } from '../../model/selectors/getUpdateProfileData/getProfileUpdateData'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader'
import { Text, TextTheme } from '@/shared/ui/Text/Text'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'

interface ProfileEditFormProps {
  className?: string
  userId: number
  initialData?: ProfileUpdateSchema
  onUpdate?: (newData: Profile) => void
  onCancel?: () => void
}

const initialReducers: ReducersList = {
  profileUpdate: profileUpdateReducer,
}

export const ProfileEditForm = (props: ProfileEditFormProps) => {
  const {
    userId, className, initialData, onUpdate, onCancel,
  } = props

  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const { isLoading, error, ...data } = useSelector(getProfileUpdateData)

  const onFirstnameChange = useCallback((value: string) => {
    dispatch(profileUpdateActions.setFirstname(value))
  }, [dispatch])

  const onLastnameChange = useCallback((value: string) => {
    dispatch(profileUpdateActions.setLastname(value))
  }, [dispatch])

  useEffect(() => {
    onFirstnameChange(initialData?.firstname ?? initialProfileUpdateState.firstname)
    onLastnameChange(initialData?.lastname ?? initialProfileUpdateState.lastname)
  }, [initialData, onFirstnameChange, onLastnameChange])

  const onSubmitHandler = async () => {
    const result = await dispatch(updateProfileData({ id: userId, data }))
    if (result.meta.requestStatus === 'fulfilled') {
      onUpdate?.(result.payload as Profile)
    }
  }

  const onCancelHandler = onCancel

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.ProfileEditForm, {}, [className])}>
        {error && (<Text className={cls.error} theme={TextTheme.ERROR} text={error} />)}
        <div className={cls.inputs}>
          <Input
            className={cls.firstname}
            placeholder={t('Ваша фамилия')}
            value={data.firstname}
            onChange={onFirstnameChange}
          />
          <Input
            className={cls.lastname}
            placeholder={t('Ваше имя')}
            value={data.lastname}
            onChange={onLastnameChange}
          />
        </div>
        <div className={cls.buttons}>
          <Button
            className={cls.saveButton}
            onClick={onSubmitHandler}
            size={ButtonSize.M}
          >
            {t('Сохранить')}
          </Button>
          <Button
            className={cls.cancelButton}
            onClick={onCancelHandler}
            size={ButtonSize.M}
          >
            {t('Отмена')}
          </Button>
        </div>
        {isLoading && (<Loader className={cls.loader} size={LoaderSize.S} />)}
      </div>

    </DynamicModuleLoader>

  )
}
