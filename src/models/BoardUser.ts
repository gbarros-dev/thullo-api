import { model, Schema, Types } from 'mongoose'

import { BoardUser } from '../utils/types/BoardUser'

const BoardUserSchema = new Schema<BoardUser>({
  board: { type: Types.ObjectId, ref: 'Boards', required: true },
  user: { type: Types.ObjectId, ref: 'Users', required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<BoardUser>('BoardUsers', BoardUserSchema)
