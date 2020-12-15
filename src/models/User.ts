import * as bcrypt from 'bcryptjs'
import { model, Schema, Types } from 'mongoose'

import { User } from '../utils/types/User'

const UserSchema = new Schema<User>({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  password: { type: String, select: false },
  created: {
    CreatedBy: { type: Types.ObjectId, ref: 'Users' },
    CreatedAt: { type: Date, default: new Date() },
  },
})

UserSchema.pre('save', async function (this: User, next: Function) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

export default model<User>('Users', UserSchema)
