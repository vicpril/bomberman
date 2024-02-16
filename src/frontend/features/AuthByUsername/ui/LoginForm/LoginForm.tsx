import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ChangeEvent, useEffect, useRef,
} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { Text, TextTheme } from '@/shared/ui/Text/Text'
import { Input } from '@/shared/ui/Input/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { RoutePaths } from '@/shared/const/router'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { useUnmountEffect } from '@/shared/lib/hooks/useUnmountEffect/useUnmountEffect'

export interface LoginFormProps {
  className?: string
  onSuccess?: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
}

const LoginForm = (props: LoginFormProps) => {
  const { className, onSuccess } = props

  const { t } = useTranslation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState)

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
    const result = await dispatch(loginByUsername({
      username: usernameRef.current,
      password: passwordRef.current,
    }))
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess?.()
      navigate(RoutePaths.main)
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
    <DynamicModuleLoader
      reducers={initialReducers}
      removeAfterUnmount
    >
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text className={cls.title} title={t('Форма авторизации')} />

        {error
        && (
          <Text
            text={t('Выввели неверный логин или пароль')}
            theme={TextTheme.ERROR}
          />
        )}

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
          theme={ButtonTheme.OutlineInverted}
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
