import { model, Schema, Types } from 'mongoose'

import { AssignmentTask } from '../utils/types/AssignmentTask'

const AssignmentTaskSchema = new Schema<AssignmentTask>({
  user: { type: Types.ObjectId, ref: 'Users', required: true },
  task: { type: Types.ObjectId, ref: 'Tasks', required: true },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<AssignmentTask>('AssignmentTasks', AssignmentTaskSchema)
