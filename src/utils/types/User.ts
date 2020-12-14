import { Document } from 'mongoose'

import { Return } from './common'
import { Created } from './Created'

export type User = Document & {
  name: string
  email: string
  avatar: string
  password: string
  created: Created
}

export type UserReturn = Return & {
  result?: User
  token?: string
}

export type UsersReturn = Return & {
  result?: User[]
}
