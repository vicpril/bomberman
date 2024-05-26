import { SelectOption } from '../ui/Select/Select'

export type SortOrder = 'asc' | 'desc'

export const orderOptions: SelectOption<SortOrder>[] = [
    { value: 'asc', label: 'по возрастанию' },
    { value: 'desc', label: 'по убыванию' },
]
