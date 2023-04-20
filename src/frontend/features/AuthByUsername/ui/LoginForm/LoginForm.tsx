import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
import { RoutePaths } from '@/shared/config/routerConfig'

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

  const onUsernameChange = (value: string) => {
    dispatch(loginActions.setLoginUsername(value))
  }

  const onPasswordChange = (value: string) => {
    dispatch(loginActions.setLoginPassword(value))
  }

  const onSubmitClick = async () => {
    const result = await dispatch(loginByUsername({ username, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess?.()
      navigate(RoutePaths.main)
    }
  }

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
          onChange={onUsernameChange}
        />

        <Input
          type="text"
          className={cls.input}
          placeholder={t('Введите пароль')}
          onChange={onPasswordChange}
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
