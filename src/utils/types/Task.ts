import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type Task = Document & {
  title: string
  description?: string
  position: number
  cover?: string
  user: ObjectId
  board: ObjectId
  list: ObjectId
  created: Created
}

export type TaskReturn = Return & {
  result?: Task
}

export type TasksReturn = Return & {
  result?: Task[]
}
