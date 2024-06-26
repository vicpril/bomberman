import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useEffect, useRef } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text, TextTheme } from '@/shared/ui/Text'
import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { GetRoutePaths } from '@/shared/const/router'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { useUnmountEffect } from '@/shared/lib/hooks/useUnmountEffect/useUnmountEffect'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import cls from './LoginForm.module.scss'

export interface LoginFormProps {
    className?: string
    onSuccess?: () => void
    invertedColor?: boolean
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

const LoginForm = (props: LoginFormProps) => {
    const { className, onSuccess, invertedColor } = props

    const { t } = useTranslation()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { username, password, error, isLoading } = useSelector(getLoginState)

    const usernameRef = useRef('')
    const passwordRef = useRef('')

    useEffect(() => {
        usernameRef.current = username
        passwordRef.current = password
    }, [username, password])

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setLoginUsername(e.target.value))
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setLoginPassword(e.target.value))
    }

    const onSubmitClick = async () => {
        const result = await dispatch(
            loginByUsername({
                username: usernameRef.current,
                password: passwordRef.current,
            }),
        )
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.()
            navigate(GetRoutePaths.main())
        }
    }

    const onEnterPress = (e: KeyboardEvent) => {
        if (e.code === 'Enter') onSubmitClick()
    }

    useMountEffect(() => {
        document.addEventListener('keypress', onEnterPress)
    })

    useUnmountEffect(() => {
        document.removeEventListener('keypress', onEnterPress)
    })

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text
                    className={cls.title}
                    title={t('Форма авторизации')}
                    theme={invertedColor ? TextTheme.SECONDARY : TextTheme.PRIMARY}
                />

                {error && <Text text={t('Выввели неверный логин или пароль')} theme={TextTheme.ERROR} />}

                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите username')}
                    onInput={onUsernameChange}
                />

                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите пароль')}
                    onInput={onPasswordChange}
                />

                <Button
                    className={cls.loginBtn}
                    theme={invertedColor ? ButtonTheme.Outline : ButtonTheme.OutlineInverted}
                    onClick={onSubmitClick}
                    disabled={isLoading}
                >
                    {t('login')}
                </Button>
            </div>
        </DynamicModuleLoader>
    )
}

export default LoginForm
