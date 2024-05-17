import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import { RegistrationForm } from '@/features/RegistrationForm'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetRoutePaths } from '@/shared/const/router'
import { Profile } from '@/entities/Profile'
import { userActions } from '@/entities/User'
import cls from './RegistrationPage.module.scss'

interface RegistrationPageProps {
    className?: string
}

const RegistrationPage = (props: RegistrationPageProps) => {
    const { className } = props

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const onCancelHandler = useCallback(() => {
        navigate(GetRoutePaths.main())
    }, [navigate])

    const onRegistrationHandler = useCallback(
        (data: Profile) => {
            dispatch(userActions.setAuthData(data))
        },
        [dispatch],
    )

    return (
        <Page className={classNames(cls.RegistrationPage, {}, [className])} data-testid="RegistrationPage">
            <VStack gap="16">
                <RegistrationForm onCancel={onCancelHandler} onUpdate={onRegistrationHandler} />
            </VStack>
        </Page>
    )
}

export default RegistrationPage
