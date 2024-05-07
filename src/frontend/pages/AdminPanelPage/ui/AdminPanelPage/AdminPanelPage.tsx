import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'
import { Page } from '@/widgets/Page'
import cls from './AdminPanelPage.module.scss'

interface AdminPanelPageProps {
    className?: string
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
    const { className } = props

    const { t } = useTranslation()

    return (
        <Page className={classNames(cls.AdminPanelPage, {}, [className])} data-testid="AdminPanelPage">
            <Text title={t('Административная панель')} />
        </Page>
    )
}

export default AdminPanelPage
