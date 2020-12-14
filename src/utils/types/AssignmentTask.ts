import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type AssignmentTask = Document & {
  user: ObjectId
  task: ObjectId
  created: Created
}

export type AssignmentTaskReturn = Return & {
  result?: AssignmentTask
}

export type AssignmentTasksReturn = Return & {
  result?: AssignmentTask[]
}
