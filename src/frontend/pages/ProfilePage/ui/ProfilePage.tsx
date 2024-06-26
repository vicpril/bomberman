import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Profile, fetchProfileData, getProfileData, profileActions, profileReducer } from '@/entities/Profile'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from '@/entities/User'
import { Text, TextTheme } from '@/shared/ui/Text'
import { ProfileView } from '@/widgets/ProfileCard'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { ProfileEditForm } from '@/features/ProfileEdit'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import cls from './ProfilePage.module.scss'

const initialReducers: ReducersList = {
    profile: profileReducer,
}

function ProfilePage() {
    const { t } = useTranslation('profile')
    const { t: dt } = useTranslation()

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const onBackClick = () => {
        navigate(-1)
        // navigate(GetRoutePaths.main())
    }

    const currentUserId = useSelector(getUserAuthData)?.id
    const { id: userId } = useParams()

    const canEdit = useMemo(() => currentUserId?.toString() === userId?.toString(), [currentUserId, userId])

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'tests') {
            if (userId) dispatch(fetchProfileData(userId))
        }
    }, [userId, dispatch])

    const { flag: isEditMode, on: onEditMode, off: offEditMode } = useFlag(false)

    const profileData = useSelector(getProfileData)

    const onCancelHandler = offEditMode

    const onUpdateProfileHandler = useCallback(
        (data: Profile) => {
            dispatch(profileActions.updateData(data))
            offEditMode()
        },
        [dispatch, offEditMode],
    )

    if (!userId) {
        return <Text title={t('Не авторизован')} theme={TextTheme.ERROR} />
    }

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Page className={cls.ProfilePage} data-testid="ProfilePage">
                <VStack gap="32">
                    {!profileData && <Text title={t('Пользователь не найден')} />}
                    {
                        // watch mode
                        !isEditMode && (
                            <>
                                <ProfileView />
                                {canEdit && (
                                    <Button
                                        className="editButton"
                                        onClick={onEditMode}
                                        data-testid="ProfilePage.editBtn"
                                    >
                                        {t('Редактировать')}
                                    </Button>
                                )}

                                <Button
                                    className="backButton"
                                    theme={ButtonTheme.Clear}
                                    onClick={onBackClick}
                                >
                                    {dt('Назад')}
                                </Button>
                            </>
                        )
                    }

                    {
                        // edit mode
                        isEditMode && canEdit && (
                            <ProfileEditForm
                                userId={userId}
                                initialData={profileData}
                                onCancel={onCancelHandler}
                                onUpdate={onUpdateProfileHandler}
                            />
                        )
                    }
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default ProfilePage
