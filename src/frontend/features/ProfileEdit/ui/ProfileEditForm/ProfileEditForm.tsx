import { useTranslation } from 'react-i18next'
import { memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Input } from '@/shared/ui/Input'
import { Profile } from '@/entities/Profile'
import { Loader, LoaderSize } from '@/shared/ui/Loader'
import { Text, TextTheme } from '@/shared/ui/Text'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { Currency, CurrencySelect } from '@/entities/Currency'
import { Country, CountrySelect } from '@/entities/Country'
import { HStack, VStack } from '@/shared/ui/Stack'
import { useErrorMessages } from '@/shared/lib/hooks/useErrorMessages/useErrorMessages'
import { getUpdateProfileValidateErrors } from '../../model/selectors/getUpdateProfileValidateErrors/getUpdateProfileValidateErrors'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { getProfileUpdateData } from '../../model/selectors/getUpdateProfileData/getProfileUpdateData'
import { profileUpdateActions, profileUpdateReducer } from '../../model/slices/updateProfile/updateProfile'
import { ProfileUpdateFormFields } from '../../model/types/ProfileUpdateSchema'
import cls from './ProfileEditForm.module.scss'

interface ProfileEditFormProps {
    className?: string
    userId: string
    initialData?: ProfileUpdateFormFields
    onUpdate?: (newData: Profile) => void
    onCancel?: () => void
}

const initialReducers: ReducersList = {
    profileUpdate: profileUpdateReducer,
}

export const ProfileEditForm = memo((props: ProfileEditFormProps) => {
    const { userId, className, initialData, onUpdate, onCancel } = props

    const { t } = useTranslation('profile')
    const { t: dt } = useTranslation()

    const { getErrorMessage } = useErrorMessages()

    const dispatch = useAppDispatch()

    const { isLoading, form } = useSelector(getProfileUpdateData)

    const errors = useSelector(getUpdateProfileValidateErrors)

    const onFirstnameChange = useCallback(
        (value: string) => {
            dispatch(profileUpdateActions.updateProfileForm({ firstname: value }))
        },
        [dispatch],
    )

    const onLastnameChange = useCallback(
        (value: string) => {
            dispatch(profileUpdateActions.updateProfileForm({ lastname: value }))
        },
        [dispatch],
    )

    const onAgeChange = useCallback(
        (value: string) => {
            dispatch(profileUpdateActions.updateProfileForm({ age: +value || 0 }))
        },
        [dispatch],
    )

    const onCurrencyChange = useCallback(
        (value: Currency) => {
            dispatch(profileUpdateActions.updateProfileForm({ currency: value }))
        },
        [dispatch],
    )

    const onCountryChange = useCallback(
        (value: Country) => {
            dispatch(profileUpdateActions.updateProfileForm({ country: value }))
        },
        [dispatch],
    )

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

    const errorsBlock = useMemo(
        () =>
            errors && (
                <VStack justify="center" max gap="16" data-testid="ProfileEditForm.errors">
                    {errors.map((error) => (
                        <Text key={error} theme={TextTheme.ERROR} text={getErrorMessage(error)} />
                    ))}
                </VStack>
            ),
        [errors, getErrorMessage],
    )

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <VStack gap="32" className={classNames(cls.ProfileEditForm, {}, [className])}>
                {errorsBlock}
                <VStack max gap="16">
                    <Input
                        placeholder={t('Имя')}
                        value={form.lastname ?? ''}
                        onChange={onLastnameChange}
                        data-testid="ProfileEditForm.lastname"
                    />
                    <Input
                        placeholder={t('Фамилия')}
                        value={form.firstname ?? ''}
                        onChange={onFirstnameChange}
                        data-testid="ProfileEditForm.firstname"
                    />
                    <Input placeholder={t('Возраст')} value={form.age ?? ''} onChange={onAgeChange} />
                    <CurrencySelect
                        className={cls.select}
                        value={form.currency}
                        onChange={onCurrencyChange}
                    />
                    <CountrySelect className={cls.select} value={form.country} onChange={onCountryChange} />
                </VStack>
                <HStack justify="between" gap="32" max>
                    <Button
                        onClick={onSubmitHandler}
                        size={ButtonSize.M}
                        data-testid="ProfileEditForm.submitBtn"
                    >
                        {dt('Сохранить')}
                    </Button>
                    <Button
                        onClick={onCancelHandler}
                        size={ButtonSize.M}
                        data-testid="ProfileEditForm.cancelBtn"
                    >
                        {dt('Отмена')}
                    </Button>
                </HStack>
                {isLoading && <Loader className={cls.loader} size={LoaderSize.S} />}
            </VStack>
        </DynamicModuleLoader>
    )
})
