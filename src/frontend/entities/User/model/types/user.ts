import { UserRoles } from '../consts'

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRoles[]
}

export interface UserSchema {
  authData?: User | null
}
