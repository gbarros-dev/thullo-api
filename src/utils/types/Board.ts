import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type Board = Document & {
  name: string
  cover?: string
  description?: string
  user: ObjectId
  visibility: 'private' | 'public'
  created?: Created
}

export type BoardReturn = Return & {
  result?: Board
}

export type BoardsReturn = Return & {
  result?: Board[]
}
