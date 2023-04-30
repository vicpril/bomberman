import { Country, Currency } from '@/shared/const/common'

export interface Profile {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  age?: number,
  currency?: Currency,
  country?: Country;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
