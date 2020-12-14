import { model, Schema, Types } from 'mongoose'

import { Comment } from '../utils/types/Comment'

const CommentSchema = new Schema<Comment>({
  content: { type: String, required: true },
  task: { type: Types.ObjectId, ref: 'Tasks', required: true },
  user: { type: Types.ObjectId, ref: 'Users', required: true },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<Comment>('Comments', CommentSchema)
