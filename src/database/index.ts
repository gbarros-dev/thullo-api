import * as mongoose from 'mongoose'

import { serverName } from '../utils/serverData'
import { mongoUrl, mongoName, mongoUser, mongoPass, mongoPort } from '../utils/mongoData'
import log from '../utils/logger'

const initMongo = async () => {
  ;(mongoose as any).Promise = global.Promise

  const connectString = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoUrl}/${mongoName}?retryWrites=true&w=majority`

  try {
    await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    mongoose.set('debug', true)

    log.info(`${serverName} - MongoDB connection initiated!`)
  } catch (err) {
    log.error(`${serverName} - error with MongoDB connection!`)
    if (err.name && err.message) {
      log.error(`${serverName} - ` + err.name + ' - ' + err.message)
    } else {
      console.error(err)
      console.error(err.message)
    }

    process.exit(1)

    return
  }
}

export { initMongo }
