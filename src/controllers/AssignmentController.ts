import { Response } from 'express'
import * as httpStatus from 'http-status'

import { Request } from '../utils/types/common'
import stringToObjectId from '../utils/functions/stringToObjectId'

import AssignmentTaskModel from '../models/AssignmentTask'

export const insertAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskid, userid } = req.params
    const assignmentTask = await AssignmentTaskModel.create({ task: stringToObjectId(taskid), user: stringToObjectId(userid) })

    res.status(httpStatus.OK).send({
      message: 'Assignment task inserted!',
      result: assignmentTask,
    })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server erro on user login!',
      error: err.error ?? err,
    })
  }
}

export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskid, userid } = req.params

    await AssignmentTaskModel.findOneAndDelete({ task: stringToObjectId(taskid), user: stringToObjectId(userid) })

    res.status(httpStatus.OK).send({
      message: 'Assignment task deleted!',
    })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server erro on user login!',
      error: err.error ?? err,
    })
  }
}
