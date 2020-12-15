import * as mongoose from 'mongoose'

const stringToObjectId = (value: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(value)
}

export default stringToObjectId
