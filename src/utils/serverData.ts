import * as dotenv from 'dotenv'

dotenv.config({
  path: `./env/.env.${process.env.NODE_ENV || 'dev'}`,
})

export const serverName = process.env.API_NAME || 'Api'
export const serverPort = process.env.PORT || 3050

export const tokenKey = process.env.TOKEN_KEY
export const tokenExpires = process.env.TOKEN_EXPIRES || '1h'
