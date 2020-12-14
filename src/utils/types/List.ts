import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type List = Document & {
  name: string
  board: ObjectId
  created: Created
}

export type ListReturn = Return & {
  result?: List
}

export type ListsReturn = Return & {
  result?: List[]
}
