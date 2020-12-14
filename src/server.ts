import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as helmet from 'helmet'

import { serverName, serverPort } from './utils/serverData'
import log from './utils/logger'

import { initMongo } from './database'

const app: express.Application = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())

app.listen(serverPort, () => {
  log.info(`${serverName} - server running at http://localhost:${serverPort}`)

  initMongo()
})
