import * as jwt from 'jsonwebtoken'

import stringToObjectId from './stringToObjectId'
import { tokenKey, tokenExpires } from '../serverData'

const generateToken = (userId: string) => {
  const token = jwt.sign({ payload: stringToObjectId(userId) }, tokenKey, {
    expiresIn: tokenExpires,
  })
  return token
}

export default generateToken
