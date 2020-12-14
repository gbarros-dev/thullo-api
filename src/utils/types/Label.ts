import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type Label = Document & {
  name: string
  color: string
  board: ObjectId
  created: Created
}

export type LabelReturn = Return & {
  result?: Label
}

export type LabelsReturn = Return & {
  result?: Label[]
}
