import { model, Schema, Types } from 'mongoose'

import { Label } from '../utils/types/Label'

const LabelSchema = new Schema<Label>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  board: { type: Types.ObjectId, ref: 'Boards', required: true },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<Label>('Labels', LabelSchema)
