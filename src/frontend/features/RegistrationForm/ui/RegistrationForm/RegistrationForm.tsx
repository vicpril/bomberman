import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback, useMemo } from 'react'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack, VStack } from '@/shared/ui/Stack'
import { useSelector } from 'react-redux'
import { Text, TextTheme } from '@/shared/ui/Text'
import { Input } from '@/shared/ui/Input'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { Loader, LoaderSize } from '@/shared/ui/Loader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { LoginResponseData } from '@/entities/User'
import { registrationFormActions, registrationFormReducer } from '../../model/slices/RegistrationFormSlice'
import cls from './RegistrationForm.module.scss'
import { ValidateRegistrationErrors } from '../../model/consts'
import { getRegistrationErrors } from '../../model/selectors/getRegistrationErrors/getRegistrationErrors'
import { getRegistrationData } from '../../model/selectors/getRegistrationData/getRegistrationData'
import { registration } from '../../model/services/registration'

interface RegistrationFormProps {
    className?: string
    onUpdate?: (newData: LoginResponseData) => void
    onCancel?: () => void
}

const initialReducers: ReducersList = {
    registrationForm: registrationFormReducer,
}

export const RegistrationForm = memo((props: RegistrationFormProps) => {
    const { className, onCancel, onUpdate } = props
    const { t } = useTranslation('profile')

    const valideteErrorsTranslations: Record<ValidateRegistrationErrors, string> = useMemo(
        () => ({
            [ValidateRegistrationErrors.INCORRECT_USERNAME]: t('Имя пользователя обязательное поле'),
            [ValidateRegistrationErrors.SERVER_ERROR]: t('Ошибка сервера'),
            [ValidateRegistrationErrors.SERVER_ERROR_USERNAME_EXISTS]: t(
                'Пользователь с таким именем уже существует',
            ),
            [ValidateRegistrationErrors.SERVER_ERROR_PASSWORD_REQUIRED]: t('Пароль обязательное поле'),
            [ValidateRegistrationErrors.SERVER_ERROR_USERNAME_REQUIRED]: t(
                'Имя пользователя обязательное поле',
            ),
        }),
        [t],
    )

    const errors = useSelector(getRegistrationErrors)

    const errorsBlock = useMemo(
        () =>
            errors && (
                <VStack justify="center" max gap="16" data-testid="ProfileEditForm.errors">
                    {errors.map((error) => (
                        <Text key={error} theme={TextTheme.ERROR} text={valideteErrorsTranslations[error]} />
                    ))}
                </VStack>
            ),
        [errors, valideteErrorsTranslations],
    )

    const dispatch = useAppDispatch()

    const { isLoading, form } = useSelector(getRegistrationData)

    const onFirstnameChange = useCallback(
        (value: string) => {
            dispatch(registrationFormActions.updateRegistrationForm({ firstname: value }))
        },
        [dispatch],
    )

    const onUsernameChange = useCallback(
        (value: string) => {
            dispatch(registrationFormActions.updateRegistrationForm({ username: value }))
        },
        [dispatch],
    )

    const onPasswordChange = useCallback(
        (value: string) => {
            dispatch(registrationFormActions.updateRegistrationForm({ password: value }))
        },
        [dispatch],
    )

    const onLastnameChange = useCallback(
        (value: string) => {
            dispatch(registrationFormActions.updateRegistrationForm({ lastname: value }))
        },
        [dispatch],
    )

    const onSubmitHandler = async () => {
        const result = await dispatch(registration(form))
        if (result.meta.requestStatus === 'fulfilled') {
            onUpdate?.(result.payload as LoginResponseData)
        }
    }

    const onCancelHandler = onCancel

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <VStack gap="32" className={classNames(cls.RegistrationForm, {}, [className])}>
                {errorsBlock}
                <VStack max gap="16">
                    <Input
                        placeholder={t('Никнейм')}
                        value={form.username ?? ''}
                        onChange={onUsernameChange}
                        data-testid="RegistrationForm.username"
                    />
                    <Input
                        placeholder={t('Пароль')}
                        value={form.password ?? ''}
                        onChange={onPasswordChange}
                        data-testid="RegistrationForm.password"
                    />
                    <Input
                        placeholder={t('Имя')}
                        value={form.lastname ?? ''}
                        onChange={onLastnameChange}
                        data-testid="RegistrationForm.lastname"
                    />
                    <Input
                        placeholder={t('Фамилия')}
                        value={form.firstname ?? ''}
                        onChange={onFirstnameChange}
                        data-testid="RegistrationForm.firstname"
                    />
                </VStack>
                <HStack justify="between" gap="32" max>
                    <Button
                        onClick={onSubmitHandler}
                        size={ButtonSize.M}
                        data-testid="RegistrationForm.submitBtn"
                    >
                        {t('Сохранить')}
                    </Button>
                    <Button
                        onClick={onCancelHandler}
                        size={ButtonSize.M}
                        data-testid="RegistrationForm.cancelBtn"
                    >
                        {t('Назад')}
                    </Button>
                </HStack>
                {isLoading && <Loader className={cls.loader} size={LoaderSize.S} />}
            </VStack>
        </DynamicModuleLoader>
    )
})
