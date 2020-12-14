import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type LabelTask = Document & {
  label: ObjectId
  task: ObjectId
  created: Created
}

export type LabelTaskReturn = Return & {
  result?: LabelTask
}

export type LabelTasksReturn = Return & {
  result?: LabelTask[]
}
