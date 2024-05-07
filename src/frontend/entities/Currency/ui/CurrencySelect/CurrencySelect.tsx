import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { SelectOption } from '@/shared/ui/Select'
import { ListBox } from '@/shared/ui/Popup'
import { Currency } from '../../model/consts/currency'

interface CurrencySelectProps {
    className?: string
    value?: Currency
    onChange?: (value: Currency) => void
    readonly?: boolean
}

const options: SelectOption<Currency>[] = [
    { value: Currency.RUB, label: Currency.RUB },
    { value: Currency.EUR, label: Currency.EUR },
    { value: Currency.USD, label: Currency.USD },
]

export const CurrencySelect = (props: CurrencySelectProps) => {
    const { className, value, onChange, readonly } = props

    const { t } = useTranslation('profile')

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency)
        },
        [onChange],
    )

    return (
        <ListBox
            className={classNames('', {}, [className])}
            label={t('Валюта')}
            defaultValue={t('Выберите валюту')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    )
}
