import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import cls from './RegistrationPage.module.scss'

interface RegistrationPageProps {
    className?: string
}

const RegistrationPage = (props: RegistrationPageProps) => {
    const { className } = props

    const { t } = useTranslation()

    return (
        // <DynamicModuleLoader>
        <Page className={classNames(cls.RegistrationPage, {}, [className])} data-testid="RegistrationPage">
            <VStack gap="16">
                <div>Registration</div>
            </VStack>
        </Page>
        // </DynamicModuleLoader>
    )
}

export default RegistrationPage
