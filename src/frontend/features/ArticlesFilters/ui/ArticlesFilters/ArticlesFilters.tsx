import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ArticleView, articleTypeOptions, ArticleType } from '@/entities/Article'
import { Select } from '@/shared/ui/Select'
import { SortOrder, orderOptions } from '@/shared/types/sort'
import { Input } from '@/shared/ui/Input'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Tabs } from '@/shared/ui/Tabs'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { HStack } from '@/shared/ui/Stack'
import { ArticleSortProps } from '../../model/types/articlesFilters'
import { articleFiltersActions, articleFiltersReducer } from '../../model/slices/articlesFiltersSlice'
import {
    articlesPropsOptions,
    getArticlesFilterOrder,
    getArticlesFilterSearch,
    getArticlesFilterSort,
    getArticlesFilterType,
} from '../../model/selectors/articlesFiltersSelectors'
import cls from './ArticlesFilters.module.scss'
import { ArticlesViewSelector } from '../ArticlesViewSelector/ArticlesViewSelector'

interface ArticlesFiltersProps {
    className?: string
    view: ArticleView
    onViewChange?: (view: ArticleView) => void
    onChange?: () => void
}

const reducers: ReducersList = {
    articleFilters: articleFiltersReducer,
}

const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const { className, view, onViewChange, onChange } = props

    const search = useSelector(getArticlesFilterSearch)
    const order = useSelector(getArticlesFilterOrder)
    const sort = useSelector(getArticlesFilterSort)
    const type = useSelector(getArticlesFilterType)

    const { t } = useTranslation('articles')

    const dispatch = useAppDispatch()

    const tSortOptions = useMemo(() => articlesPropsOptions.map((o) => ({ ...o, label: t(o.label) })), [t])
    const tTypeOptions = useMemo(() => articleTypeOptions.map((o) => ({ ...o, label: t(o.label) })), [t])
    const tOrderOptions = useMemo(() => orderOptions.map((o) => ({ ...o, label: t(o.label) })), [t])

    const onOrderChange = useCallback(
        (value: SortOrder) => {
            dispatch(articleFiltersActions.setOrder(value))
            onChange?.()
        },
        [dispatch, onChange],
    )

    const onSortChange = useCallback(
        (value: ArticleSortProps) => {
            dispatch(articleFiltersActions.setSort(value))
            onChange?.()
        },
        [dispatch, onChange],
    )

    const fetchedOnChange = useDebounce(() => onChange?.(), 500)

    const onSearchChange = useCallback(
        (value: string) => {
            dispatch(articleFiltersActions.setSearch(value))
            fetchedOnChange()
        },
        [dispatch, fetchedOnChange],
    )

    const onTypeChange = useCallback(
        (value: ArticleType) => {
            dispatch(articleFiltersActions.setType(value))
            onChange?.()
        },
        [dispatch, onChange],
    )

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesFilters, {}, [className])}>
                <ArticlesViewSelector view={view} onViewChange={onViewChange} className={cls.view} />
                <HStack className={cls.sortWrapper} wrap="wrap" align="center" gap="8">
                    <span>{t('Сортировать по')}:</span>
                    <Select options={tSortOptions} value={sort} onChange={onSortChange} denyResponsive />
                    <Select options={tOrderOptions} value={order} onChange={onOrderChange} denyResponsive />
                </HStack>
                <div className={cls.search}>
                    <Input placeholder={t('Поиск')} value={search} onChange={onSearchChange} />
                </div>
                <Tabs options={tTypeOptions} value={type} onChange={onTypeChange} />
            </div>
        </DynamicModuleLoader>
    )
})

export { ArticlesFilters }
