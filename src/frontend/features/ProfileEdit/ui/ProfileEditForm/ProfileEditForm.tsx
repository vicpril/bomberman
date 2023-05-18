import { useTranslation } from 'react-i18next'
import { memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileEditForm.module.scss'
import { ProfileUpdateFormFields, ValidateProfileErrors } from '../../model/types/ProfileUpdateSchema'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
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
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { Currency, CurrencySelect } from '@/entities/Currency'
import { Country, CountrySelect } from '@/entities/Country'
import {
  getUpdateProfileValidateErrors,
} from '../../model/selectors/getUpdateProfileValidateErrors/getUpdateProfileValidateErrors'

interface ProfileEditFormProps {
  className?: string
  userId: number
  initialData?: ProfileUpdateFormFields
  onUpdate?: (newData: Profile) => void
  onCancel?: () => void
}

const initialReducers: ReducersList = {
  profileUpdate: profileUpdateReducer,
}

export const ProfileEditForm = memo((props: ProfileEditFormProps) => {
  const {
    userId, className, initialData, onUpdate, onCancel,
  } = props

  const { t } = useTranslation('profile')

  const valideteErrorsTranslations: Record<ValidateProfileErrors, string> = useMemo(() => ({
    [ValidateProfileErrors.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileErrors.INCORRECT_USER_AGE]: t('Некорректный возраст'),
    [ValidateProfileErrors.INCORRECT_USER_COUNTRY]: t('Некорректный регион'),
    [ValidateProfileErrors.INCORRECT_USER_DATA]: t('Имя и Фамилия обязательны'),
    [ValidateProfileErrors.SERVER_ERROR]: t('Ошибка сервера'),
  }), [t])

  const dispatch = useAppDispatch()

  const { isLoading, form } = useSelector(getProfileUpdateData)

  const errors = useSelector(getUpdateProfileValidateErrors)

  const onFirstnameChange = useCallback((value: string) => {
    dispatch(profileUpdateActions.updateProfileForm({ firstname: value }))
  }, [dispatch])

  const onLastnameChange = useCallback((value: string) => {
    dispatch(profileUpdateActions.updateProfileForm({ lastname: value }))
  }, [dispatch])

  const onAgeChange = useCallback((value: string) => {
    dispatch(profileUpdateActions.updateProfileForm({ age: +value || 0 }))
  }, [dispatch])

  const onCurrencyChange = useCallback((value: Currency) => {
    dispatch(profileUpdateActions.updateProfileForm({ currency: value }))
  }, [dispatch])

  const onCountryChange = useCallback((value: Country) => {
    dispatch(profileUpdateActions.updateProfileForm({ country: value }))
  }, [dispatch])

  useMountEffect(() => {
    dispatch(profileUpdateActions.updateProfileForm({ ...initialData }))
  })

  const onSubmitHandler = async () => {
    const result = await dispatch(updateProfileData({ id: userId, data: form }))
    if (result.meta.requestStatus === 'fulfilled') {
      onUpdate?.(result.payload as Profile)
    }
  }

  const onCancelHandler = onCancel

  const errorsBlock = useMemo(() => errors && (
    <div className={cls.errors}>
      {errors.map((error) => (
        (
          <Text
            key={error}
            className={cls.error}
            theme={TextTheme.ERROR}
            text={valideteErrorsTranslations[error]}
          />
        )
      ))}
    </div>
  ), [errors, valideteErrorsTranslations])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.ProfileEditForm, {}, [className])}>
        {errorsBlock}
        <div className={cls.inputs}>
          <Input
            placeholder={t('Фамилия')}
            value={form.firstname}
            onChange={onFirstnameChange}
          />
          <Input
            placeholder={t('Имя')}
            value={form.lastname}
            onChange={onLastnameChange}
          />
          <Input
            placeholder={t('Возраст')}
            value={form.age}
            onChange={onAgeChange}
          />
          <CurrencySelect
            value={form.currency}
            onChange={onCurrencyChange}
          />
          <CountrySelect
            value={form.country}
            onChange={onCountryChange}
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
})
