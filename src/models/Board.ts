import { model, Schema, Types } from 'mongoose'

import { Board } from '../utils/types/Board'

const BoardSchema = new Schema<Board>({
  name: { type: String, required: true },
  cover: { type: String },
  description: { type: String },
  user: { type: Types.ObjectId, ref: 'Users', required: true },
  visibility: { type: String, enum: ['private', 'public'], default: 'private' },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<Board>('Boards', BoardSchema)
