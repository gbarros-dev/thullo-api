import * as dotenv from 'dotenv'

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV || 'dev'}`,
})

export const mongoUser = process.env.MONGO_USER || ''
export const mongoPass = process.env.MONGO_PASS || ''
export const mongoUrl = process.env.MONGO_URL || 'localhost'
export const mongoPort = process.env.MONGO_PORT || '27017'
export const mongoName = process.env.MONGO_NAME || 'teste'

export const adminUserEmail = process.env.ADMIN_USER_EMAIL || 'admin'
export const adminUserPass = process.env.ADMIN_USER_PASS || 'admin'
