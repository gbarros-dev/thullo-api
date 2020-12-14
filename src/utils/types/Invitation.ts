import { Document } from 'mongoose'

import { ObjectId, Return } from './common'
import { Created } from './Created'

export type Invitation = Document & {
  token: string
  board: ObjectId
  user: ObjectId
  created: Created
}

export type InvitationReturn = Return & {
  result?: Invitation
}

export type InvitationsReturn = Return & {
  result?: Invitation[]
}
