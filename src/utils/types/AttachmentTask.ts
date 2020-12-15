import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type AttachmentTask = Document & {
  name: string
  url: string
  format?: string
  publicId: string
  task: ObjectId
  user: ObjectId
  created?: Created
}

export type AttachmentTaskReturn = Return & {
  result?: AttachmentTask
}

export type AttachmentTasksReturn = Return & {
  result?: AttachmentTask[]
}
