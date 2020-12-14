import { model, Schema, Types } from 'mongoose'

import { AttachmentTask } from '../utils/types/AttachmentTask'

const AttachmentTaskSchema = new Schema<AttachmentTask>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  format: { type: String },
  publicId: { type: String, required: true },
  task: { type: Types.ObjectId, ref: 'Tasks', required: true },
  user: { type: Types.ObjectId, ref: 'Users', required: true },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<AttachmentTask>('AttachmentTasks', AttachmentTaskSchema)
