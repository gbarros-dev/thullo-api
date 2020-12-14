import { model, Schema, Types } from 'mongoose'

import { List } from '../utils/types/List'

const ListSchema = new Schema<List>({
  name: { type: String, required: true },
  board: { type: Types.ObjectId, ref: 'Boards', required: true },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<List>('Lists', ListSchema)
