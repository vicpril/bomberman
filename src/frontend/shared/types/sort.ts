import { SelectOption } from '../ui/Select/Select'

export type SortOrder = 'asc' | 'desc'

export const orderOptions: SelectOption<SortOrder>[] = [
    { value: 'asc', label: 'По возрастанию' },
    { value: 'desc', label: 'По убыванию' },
]
