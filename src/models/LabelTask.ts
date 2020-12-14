import { model, Schema, Types } from 'mongoose'

import { LabelTask } from '../utils/types/LabelTask'

const LabelTaskSchema = new Schema<LabelTask>({
  label: { type: Types.ObjectId, ref: 'Labels', required: true },
  task: { type: Types.ObjectId, ref: 'Tasks', required: true },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<LabelTask>('LabelTasks', LabelTaskSchema)
