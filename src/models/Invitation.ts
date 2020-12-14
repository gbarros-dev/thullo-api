import { model, Schema, Types } from 'mongoose'

import { Invitation } from '../utils/types/Invitation'

const InvitationSchema = new Schema<Invitation>({
  token: { type: String, required: true },
  board: { type: Types.ObjectId, ref: 'Boards', required: true },
  user: { type: Types.ObjectId, ref: 'Users', required: true },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

export default model<Invitation>('Invitations', InvitationSchema)
