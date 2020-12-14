import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type Comment = Document & {
  content: string
  task: ObjectId
  user: ObjectId
  created: Created
}

export type CommentReturn = Return & {
  result?: Comment
}

export type CommentsReturn = Return & {
  result?: Comment[]
}
