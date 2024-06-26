import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/AddCommentFormSlice'
import cls from './AddCommentForm.module.scss'
import { getCommentFormText } from '../../model/selectors/getCommentFormText'

export interface AddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
}

const AddCommentForm = (props: AddCommentFormProps) => {
    const { className, onSendComment } = props

    const { t } = useTranslation()

    const dispatch = useAppDispatch()

    const onChangeHandler = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value))
        },
        [dispatch],
    )

    const text = useSelector(getCommentFormText)

    const onSubmitHandler = useCallback(() => {
        onSendComment(text || '')
        onChangeHandler('')
    }, [onChangeHandler, onSendComment, text])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.AddCommentForm, {}, [className])} data-testid="AddCommentForm">
                <Input
                    className={cls.input}
                    placeholder={t('Комментировать')}
                    value={text}
                    onChange={onChangeHandler}
                    data-testid="AddCommentForm.Input"
                />
                <Button onClick={onSubmitHandler} data-testid="AddCommentForm.Button">
                    {t('Отправить')}
                </Button>
            </div>
        </DynamicModuleLoader>
    )
}

export default AddCommentForm
