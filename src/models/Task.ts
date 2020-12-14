import { model, Schema, Types } from 'mongoose'

import { Task } from '../utils/types/Task'

const TaskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String },
  position: { type: Number, required: true },
  cover: { type: String },
  user: { type: Types.ObjectId, ref: 'Users', required: true },
  board: { type: Types.ObjectId, ref: 'Boards', required: true },
  list: { type: Types.ObjectId, ref: 'Lists', required: true },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<Task>('Tasks', TaskSchema)
