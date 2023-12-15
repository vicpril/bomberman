import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { SelectOption } from '@/shared/ui/Select/Select'
import { Country } from '../../model/consts/country'
import { ListBox } from '@/shared/ui/ListBox/ListBox'

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

const options: SelectOption<Country>[] = [
  { value: Country.Armenia, label: Country.Armenia },
  { value: Country.Russia, label: Country.Russia },
  { value: Country.Belarus, label: Country.Belarus },
  { value: Country.Kazakhstan, label: Country.Kazakhstan },
  { value: Country.Ukraine, label: Country.Ukraine },
]

export const CountrySelect = (props: CountrySelectProps) => {
  const {
    className, value, onChange, readonly,
  } = props

  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <ListBox
      className={classNames('', {}, [className])}
      label={t('Страна')}
      defaultValue={t('Выберите страну')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
}
