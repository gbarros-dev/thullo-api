import { Request as RequestExpress } from 'express'
import * as mongoose from 'mongoose'

export type ObjectId = mongoose.Types.ObjectId

export type Return = {
  error?: any
  message: string
  status: number
}

export type Request = RequestExpress & {
  userId?: string
  userType?: string
}

export type Response = {
  method: string
  url: string
  request: string
  message: string
  serverMessage: string
  error: any | null
  result: object | string | [] | null
  token?: string
}
