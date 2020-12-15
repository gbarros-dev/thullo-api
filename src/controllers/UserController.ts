import { Response } from 'express'
import * as httpStatus from 'http-status'

import { Request } from '../utils/types/common'

import log from '../utils/logger'
import stringToObjectId from '../utils/functions/stringToObjectId'

import UserModel from '../models/User'

const update = async (req: Request, res: Response): Promise<void> => {
  UserModel.findOneAndUpdate(
    { _id: stringToObjectId(req.params.userid) },
    {
      $set: { ...req.body },
    },
    { new: true }
  )
    .then((user) => {
      res.status(httpStatus.OK).send({
        message: 'User updated successfully!',
        result: user,
      })
    })
    .catch((err) => {
      log.error(err)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Internal error on update user!',
        error: err,
      })
    })
}

export { update }
