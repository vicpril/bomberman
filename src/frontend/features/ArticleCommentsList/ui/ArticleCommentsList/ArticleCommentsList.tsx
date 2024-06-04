import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text'
import { CommentList } from '@/entities/Comment'
// eslint-disable-next-line fsd-project/layer-imports
import { AddCommentForm } from '@/widgets/AddCommentForm'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { addCommentsByArticleId } from '../../model/services/addCommentsByArticleId/addCommentsByArticleId'
import { articleCommentsListReducer, getArticleComments } from '../../model/slices/ArticleCommentsListSlice'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import cls from './ArticleCommentsList.module.scss'

interface ArticleCommentsListProps {
    className?: string
    articleId: string
}

const reducers: ReducersList = {
    articleCommentsList: articleCommentsListReducer,
}

export const ArticleCommentsList = memo((props: ArticleCommentsListProps) => {
    const { className, articleId } = props
    const { t } = useTranslation('articles')

    const dispatch = useAppDispatch()

    useMountEffect(() => {
        dispatch(fetchCommentsByArticleId(articleId))
    })

    const comments = useSelector(getArticleComments.selectAll)
    const isCommentsLoading = useSelector(getArticleCommentsIsLoading)

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentsByArticleId(text))
        },
        [dispatch],
    )

    if (!articleId) {
        return null
    }

    return (
        <div className={classNames(cls.ArticleCommentsList, {}, [className])}>
            <DynamicModuleLoader reducers={reducers}>
                <Text className={cls.commentTitle} size={TextSize.M} title={t('Комментарии')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList comments={comments} isLoading={isCommentsLoading} />
            </DynamicModuleLoader>
        </div>
    )
})
