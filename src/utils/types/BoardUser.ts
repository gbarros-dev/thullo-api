import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type BoardUser = Document & {
  board: ObjectId
  user: ObjectId
  role: 'admin' | 'user'
  created?: Created
}

export type BoardUserReturn = Return & {
  result?: BoardUser
}

export type BoardsUserReturn = Return & {
  result?: BoardUser[]
}
